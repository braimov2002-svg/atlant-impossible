import XCTest
@testable import OvozYoz

/// Plays Gemini for the bridge tests: answers each request with `respond`.
final class StubProtocol: URLProtocol {
    struct Answer {
        var status = 200
        var json: Any?
        var hang = false
        var networkError = false
    }

    static var respond: (URLRequest, [String: Any]) -> Answer = { _, _ in Answer() }
    static var requests: [[String: Any]] = []
    private static let lock = NSLock()

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        var body: [String: Any] = [:]
        if let data = request.httpBody ?? request.httpBodyStream.map(Self.read),
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
            body = json
        }
        Self.lock.lock()
        Self.requests.append(body)
        Self.lock.unlock()
        let answer = Self.respond(request, body)
        if answer.hang { return }
        if answer.networkError {
            client?.urlProtocol(self, didFailWithError: URLError(.notConnectedToInternet))
            return
        }
        let response = HTTPURLResponse(url: request.url!, statusCode: answer.status, httpVersion: "HTTP/1.1", headerFields: ["Content-Type": "application/json"])!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: (try? JSONSerialization.data(withJSONObject: answer.json ?? [:])) ?? Data())
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}

    private static func read(_ stream: InputStream) -> Data {
        stream.open()
        defer { stream.close() }
        var data = Data()
        var buffer = [UInt8](repeating: 0, count: 65_536)
        while stream.hasBytesAvailable {
            let n = stream.read(&buffer, maxLength: buffer.count)
            if n <= 0 { break }
            data.append(buffer, count: n)
        }
        return data
    }
}

final class CoreBridgeTests: XCTestCase {
    private let uz = "Salom, qalaysan? Bugun havo juda yaxshi."
    private let ru = "Привет, как дела? Сегодня очень хорошая погода."

    private func gemini(_ text: String) -> StubProtocol.Answer {
        StubProtocol.Answer(json: ["candidates": [["content": ["parts": [["text": text]]], "finishReason": "STOP"]]])
    }

    private func makeBridge() -> CoreBridge {
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = [StubProtocol.self]
        return CoreBridge(session: URLSession(configuration: config))
    }

    private func options(_ output: OutputLanguage, spoken: SpokenLanguage = .uz, timeoutMs: Double? = nil) -> CoreOptions {
        var settings = OYSettings()
        settings.spoken = spoken
        return CoreOptions(settings: settings, apiKey: "AIza-TEST", output: output, timeoutMs: timeoutMs)
    }

    private func tone(seconds: Double) -> Data {
        let n = Int(seconds * Double(Wav.sampleRate))
        return Wav.encode((0..<n).map { sin(Float($0) / 8) * 0.25 })
    }

    private static func isAudio(_ body: [String: Any]) -> Bool {
        let parts = ((body["contents"] as? [[String: Any]])?.first?["parts"] as? [[String: Any]]) ?? []
        return parts.contains { $0["inlineData"] != nil }
    }

    private static func system(_ body: [String: Any]) -> String {
        (((body["systemInstruction"] as? [String: Any])?["parts"] as? [[String: Any]])?.first?["text"] as? String) ?? ""
    }

    override func setUp() {
        super.setUp()
        StubProtocol.requests = []
    }

    func testBundleLoads() {
        XCTAssertTrue(makeBridge().isReady, "ovozyoz-core.js must be in the app bundle")
        XCTAssertTrue(makeBridge().message(for: "no-api-key").contains("kalit"))
    }

    func testUzbekSpeechToRussianInTwoSteps() async {
        let ru = self.ru, uz = self.uz
        StubProtocol.respond = { _, body in
            if CoreBridgeTests.isAudio(body) { return self.gemini(uz) }
            return self.gemini(CoreBridgeTests.system(body).contains("Target language: Russian") ? ru : uz)
        }
        let result = await makeBridge().transcribe(wav: tone(seconds: 1.2), options: options(.ru))
        XCTAssertTrue(result.ok, result.message ?? "")
        XCTAssertEqual(result.text, ru)
        XCTAssertEqual(result.languageOk, true)
        XCTAssertEqual(StubProtocol.requests.count, 2)
        XCTAssertTrue(Self.isAudio(StubProtocol.requests[0]))
    }

    func testTypedRussianToUzbek() async {
        let uz = self.uz
        StubProtocol.respond = { _, _ in self.gemini(uz) }
        let result = await makeBridge().translate(text: ru, options: options(.uzLatn))
        XCTAssertTrue(result.ok, result.message ?? "")
        XCTAssertEqual(result.text, uz)
        XCTAssertEqual(StubProtocol.requests.count, 1)
    }

    func testWrongLanguageIsFlagged() async {
        let uz = self.uz
        StubProtocol.respond = { _, _ in self.gemini(uz) }
        let result = await makeBridge().transcribe(wav: tone(seconds: 1), options: options(.ru))
        XCTAssertTrue(result.ok)
        XCTAssertEqual(result.languageOk, false)
        XCTAssertEqual(result.warning, "Ruschaga o'girib bo'lmadi.")
    }

    func testBadKeyGivesUzbekMessage() async {
        StubProtocol.respond = { _, _ in
            StubProtocol.Answer(status: 400, json: ["error": ["code": 400, "message": "API key not valid. Please pass a valid API key."]])
        }
        let result = await makeBridge().translate(text: ru, options: options(.uzLatn))
        XCTAssertFalse(result.ok)
        XCTAssertEqual(result.code, "invalid-api-key")
    }

    func testOffline() async {
        StubProtocol.respond = { _, _ in StubProtocol.Answer(networkError: true) }
        let result = await makeBridge().translate(text: ru, options: options(.uzLatn))
        XCTAssertEqual(result.code, "network")
    }

    func testDeadline() async {
        StubProtocol.respond = { _, _ in StubProtocol.Answer(hang: true) }
        let result = await makeBridge().transcribe(wav: tone(seconds: 1), options: options(.ru, timeoutMs: 300))
        XCTAssertEqual(result.code, "timeout")
    }

    func testSwiftTaskCancellationCancelsTheCall() async {
        StubProtocol.respond = { _, _ in StubProtocol.Answer(hang: true) }
        let bridge = makeBridge()
        let wav = tone(seconds: 1)
        let opts = options(.ru)
        let task = Task { await bridge.transcribe(wav: wav, options: opts) }
        try? await Task.sleep(nanoseconds: 200_000_000)
        task.cancel()
        let result = await task.value
        XCTAssertEqual(result.code, "cancelled")
    }

    func testTooShortNeedsNoRequest() async {
        let result = await makeBridge().transcribe(wav: tone(seconds: 0.1), options: options(.uzLatn))
        XCTAssertEqual(result.code, "too-short")
        XCTAssertTrue(StubProtocol.requests.isEmpty)
    }

    func testMissingKey() async {
        var opts = options(.ru)
        opts.apiKey = ""
        let result = await makeBridge().translate(text: ru, options: opts)
        XCTAssertEqual(result.code, "no-api-key")
    }
}

final class SharedTests: XCTestCase {
    func testWavHeader() {
        let data = Wav.encode([0, 0.5, -0.5, 1, -1])
        XCTAssertEqual(data.count, 44 + 10)
        XCTAssertEqual(String(data: data.prefix(4), encoding: .ascii), "RIFF")
        XCTAssertEqual(data[22], 1) // mono
        let rate = data[24..<28].enumerated().reduce(0) { $0 | (Int($1.element) << (8 * $1.offset)) }
        XCTAssertEqual(rate, 16_000)
    }

    func testStoreRoundTrip() throws {
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        let store = SharedStore(directory: dir)
        var settings = store.settings
        XCTAssertEqual(settings, OYSettings())
        settings.output = .ru
        settings.micMinutes = 10
        store.settings = settings
        XCTAssertEqual(store.settings.output, .ru)
        store.apiKey = "  AIzaSyTEST123456  "
        XCTAssertEqual(store.apiKey, "AIzaSyTEST123456")
        store.apiKey = ""
        XCTAssertEqual(store.apiKey, "")
        store.addHistory("Привет", output: .ru)
        XCTAssertEqual(store.history.first?.text, "Привет")
        let job = UUID()
        store.publish(SessionState(alive: true, heartbeat: Date(), phase: .recording, jobId: job))
        XCTAssertTrue(store.sessionState.isWarm())
        XCTAssertEqual(store.sessionState.jobId, job)
        try? FileManager.default.removeItem(at: dir)
    }

    func testSettingsSurviveUnknownValues() throws {
        let json = #"{"output":"de","spoken":"ru","micMinutes":"x"}"#.data(using: .utf8)!
        let settings = try SharedStore.decoder.decode(OYSettings.self, from: json)
        XCTAssertEqual(settings.output, .uzLatn)
        XCTAssertEqual(settings.spoken, .ru)
        XCTAssertEqual(settings.micMinutes, 30)
    }

    func testStartLink() {
        let job = UUID()
        XCTAssertEqual(AppLink.startJob(in: AppLink.start(job: job)), job)
        XCTAssertNil(AppLink.startJob(in: URL(string: "https://example.com")!))
    }

    func testStaleHeartbeatIsNotWarm() {
        let state = SessionState(alive: true, heartbeat: Date().addingTimeInterval(-60))
        XCTAssertFalse(state.isWarm())
    }
}
