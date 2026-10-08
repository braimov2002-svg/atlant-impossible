import Foundation
import JavaScriptCore

/// What a call into the shared core returns (see apps/ios/core/entry.ts).
struct CoreResult: Decodable, Equatable {
    var ok: Bool
    var text: String?
    /// False when the text is not in the requested language: show it, ask before inserting.
    var languageOk: Bool?
    var model: String?
    /// "Ruschaga o'girib bo'lmadi." when languageOk is false.
    var warning: String?
    var code: String?
    var message: String?

    static func failure(_ code: String, _ message: String) -> CoreResult {
        CoreResult(ok: false, code: code, message: message)
    }

    var isCancelled: Bool { code == "cancelled" }
}

/// Options sent with every call, as JSON.
struct CoreOptions: Encodable {
    var apiKey: String
    var spoken: SpokenLanguage
    var output: OutputLanguage
    var apostrophes: ApostropheStyle
    var model: String?
    var timeoutMs: Double?

    init(settings: OYSettings, apiKey: String, output: OutputLanguage? = nil, timeoutMs: Double? = nil) {
        self.apiKey = apiKey
        spoken = settings.spoken
        self.output = output ?? settings.output
        apostrophes = settings.apostrophes
        model = settings.geminiModel.isEmpty ? nil : settings.geminiModel
        self.timeoutMs = timeoutMs
    }

    var json: String {
        (try? JSONEncoder().encode(self)).flatMap { String(data: $0, encoding: .utf8) } ?? "{}"
    }
}

/// Runs the shared TypeScript language pipeline (ovozyoz-core.js, built from
/// packages/core) in JavaScriptCore, so the iPhone gives exactly the same
/// results as the web and desktop apps. JavaScriptCore has no web APIs: this
/// class provides timers and network requests (URLSession) to the bundle.
/// Every touch of the JSContext happens on one serial queue.
final class CoreBridge {
    static let shared = CoreBridge()

    private let queue = DispatchQueue(label: "uz.ovozyoz.core", qos: .userInitiated)
    private let session: URLSession
    private let scriptURL: URL?
    private var context: JSContext?
    private var api: JSValue?
    private var runtime: JSValue?
    private var tasks: [Int: URLSessionDataTask] = [:]
    private var timers: [Int: DispatchWorkItem] = [:]
    private var waiting: [Int: (CoreResult) -> Void] = [:]
    private var nextCall = 1
    private var lastException: String?

    init(session: URLSession? = nil, scriptURL: URL? = nil) {
        if let session {
            self.session = session
        } else {
            let config = URLSessionConfiguration.ephemeral
            config.timeoutIntervalForRequest = 120
            config.waitsForConnectivity = false
            self.session = URLSession(configuration: config)
        }
        self.scriptURL = scriptURL ?? Bundle(for: CoreBridge.self).url(forResource: "ovozyoz-core", withExtension: "js")
    }

    // MARK: public calls

    /// Speech (16 kHz mono WAV) → text in `options.output`.
    func transcribe(wav: Data, options: CoreOptions) async -> CoreResult {
        let audio = wav.base64EncodedString()
        let json = options.json
        return await call { api, id in
            api.invokeMethod("transcribe", withArguments: [id, audio, json])
        }
    }

    /// Typed text → `options.output` (e.g. Russian → Uzbek).
    func translate(text: String, options: CoreOptions) async -> CoreResult {
        let json = options.json
        return await call { api, id in
            api.invokeMethod("translate", withArguments: [id, text, json])
        }
    }

    /// The Uzbek message for an error code (e.g. "no-api-key").
    func message(for code: String) -> String {
        queue.sync {
            guard load(), let text = api?.invokeMethod("message", withArguments: [code]), text.isString else {
                return "Xatolik yuz berdi."
            }
            return text.toString()
        }
    }

    /// Whether the bundle loaded (false means a broken build).
    var isReady: Bool { queue.sync { load() } }

    // MARK: calls

    private final class CallBox: @unchecked Sendable {
        var id: Int?
        var cancelled = false
    }

    private func call(_ start: @escaping (JSValue, Int) -> Void) async -> CoreResult {
        let box = CallBox()
        return await withTaskCancellationHandler {
            await withCheckedContinuation { (continuation: CheckedContinuation<CoreResult, Never>) in
                queue.async {
                    guard self.load(), let api = self.api, let context = self.context else {
                        continuation.resume(returning: .failure("provider", "Ilova ichki xatosi: til moduli yuklanmadi."))
                        return
                    }
                    let id = self.nextCall
                    self.nextCall += 1
                    box.id = id
                    self.waiting[id] = { continuation.resume(returning: $0) }
                    context.exception = nil
                    start(api, id)
                    // A synchronous JS exception means done() never comes: answer now.
                    if let exception = context.exception, let resume = self.waiting.removeValue(forKey: id) {
                        context.exception = nil
                        resume(.failure("provider", "Ilova ichki xatosi: \(exception.toString() ?? "JS")"))
                        return
                    }
                    if box.cancelled { api.invokeMethod("cancel", withArguments: [id]) }
                }
            }
        } onCancel: {
            queue.async {
                if let id = box.id { self.api?.invokeMethod("cancel", withArguments: [id]) } else { box.cancelled = true }
            }
        }
    }

    // MARK: JavaScript runtime (queue only)

    private func load() -> Bool {
        if api != nil { return true }
        guard let url = scriptURL, let script = try? String(contentsOf: url, encoding: .utf8),
              let context = JSContext() else { return false }
        context.name = "OvozYoz core"
        context.exceptionHandler = { [weak self] context, exception in
            context?.exception = exception
            self?.lastException = exception?.toString()
        }

        let native = JSValue(newObjectIn: context)!
        let setTimeout: @convention(block) (Int, Double) -> Void = { [weak self] id, ms in self?.schedule(timer: id, ms: ms) }
        let clearTimeout: @convention(block) (Int) -> Void = { [weak self] id in self?.timers.removeValue(forKey: id)?.cancel() }
        let fetch: @convention(block) (Int, String, String, String, String) -> Void = { [weak self] id, url, method, headers, body in
            self?.fetch(id: id, url: url, method: method, headersJson: headers, body: body)
        }
        let abortFetch: @convention(block) (Int) -> Void = { [weak self] id in self?.tasks.removeValue(forKey: id)?.cancel() }
        let done: @convention(block) (Int, String) -> Void = { [weak self] id, json in self?.finish(call: id, json: json) }
        let log: @convention(block) (String) -> Void = { message in
            #if DEBUG
            print("[core] \(message)")
            #endif
        }
        native.setObject(unsafeBitCast(setTimeout, to: AnyObject.self), forKeyedSubscript: "setTimeout" as NSString)
        native.setObject(unsafeBitCast(clearTimeout, to: AnyObject.self), forKeyedSubscript: "clearTimeout" as NSString)
        native.setObject(unsafeBitCast(fetch, to: AnyObject.self), forKeyedSubscript: "fetch" as NSString)
        native.setObject(unsafeBitCast(abortFetch, to: AnyObject.self), forKeyedSubscript: "abortFetch" as NSString)
        native.setObject(unsafeBitCast(done, to: AnyObject.self), forKeyedSubscript: "done" as NSString)
        native.setObject(unsafeBitCast(log, to: AnyObject.self), forKeyedSubscript: "log" as NSString)
        context.setObject(native, forKeyedSubscript: "__oy" as NSString)

        context.evaluateScript(script, withSourceURL: url)
        guard let api = context.objectForKeyedSubscript("OvozYoz"), api.isObject,
              let runtime = context.objectForKeyedSubscript("OvozYozRuntime"), runtime.isObject else { return false }
        self.context = context
        self.api = api
        self.runtime = runtime
        return true
    }

    private func schedule(timer id: Int, ms: Double) {
        let item = DispatchWorkItem { [weak self] in
            guard let self, self.timers.removeValue(forKey: id) != nil else { return }
            self.runtime?.invokeMethod("fireTimer", withArguments: [id])
        }
        timers[id] = item
        queue.asyncAfter(deadline: .now() + max(0, ms) / 1000, execute: item)
    }

    private func fetch(id: Int, url: String, method: String, headersJson: String, body: String) {
        guard let target = URL(string: url) else {
            runtime?.invokeMethod("fetchDone", withArguments: [id, 0, "", "", "Bad URL"])
            return
        }
        var request = URLRequest(url: target)
        request.httpMethod = method
        if let data = headersJson.data(using: .utf8),
           let headers = try? JSONSerialization.jsonObject(with: data) as? [String: String] {
            for (name, value) in headers { request.setValue(value, forHTTPHeaderField: name) }
        }
        if !body.isEmpty { request.httpBody = body.data(using: .utf8) }
        let task = session.dataTask(with: request) { [weak self] data, response, error in
            guard let self else { return }
            self.queue.async {
                // Not in the table: aborted from JS, which already rejected it.
                guard self.tasks.removeValue(forKey: id) != nil else { return }
                if let error {
                    self.runtime?.invokeMethod("fetchDone", withArguments: [id, 0, "", "", error.localizedDescription])
                    return
                }
                let http = response as? HTTPURLResponse
                let status = http?.statusCode ?? 0
                let text = data.flatMap { String(data: $0, encoding: .utf8) } ?? ""
                let reason = HTTPURLResponse.localizedString(forStatusCode: status)
                self.runtime?.invokeMethod("fetchDone", withArguments: [id, status, reason, text, NSNull()])
            }
        }
        tasks[id] = task
        task.resume()
    }

    private func finish(call id: Int, json: String) {
        guard let resume = waiting.removeValue(forKey: id) else { return }
        let result = json.data(using: .utf8).flatMap { try? JSONDecoder().decode(CoreResult.self, from: $0) }
        resume(result ?? .failure("provider", "Ilova ichki xatosi: javobni o'qib bo'lmadi."))
    }
}
