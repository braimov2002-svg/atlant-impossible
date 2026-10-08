import Foundation

// The keyboard cannot use the microphone, so it works as a remote control of
// the app: it writes a command into the App Group and rings a Darwin
// notification; the app (kept alive in the background by its running audio
// session) records, transcribes and writes the result back the same way.

/// What the keyboard asks the app to do.
struct KeyboardCommand: Codable, Equatable {
    enum Action: String, Codable {
        /// Start recording for job `id`.
        case start
        /// Stop recording and transcribe job `id`.
        case stop
        /// Drop job `id` (recording or transcription).
        case cancel
        /// Turn the ready microphone off.
        case endSession
    }

    var id: UUID
    var action: Action
    var output: OutputLanguage
    var spoken: SpokenLanguage
    var at = Date()
}

/// The app's side: is the microphone ready, and what happened to the last job.
struct SessionState: Codable, Equatable {
    enum Phase: String, Codable {
        case idle, recording, processing
    }

    /// The microphone session is running (the app is alive and can record).
    var alive = false
    /// Updated every couple of seconds while alive; a stale heartbeat means the app was killed.
    var heartbeat = Date.distantPast
    /// When the ready microphone turns itself off (nil = until stopped).
    var endsAt: Date?
    var phase: Phase = .idle
    var jobId: UUID?
    /// Input level 0...1 while recording, for the keyboard's meter.
    var level: Float = 0
    var recordingStartedAt: Date?
    var result: JobResult?

    /// Whether a tap on the keyboard's mic can record without opening the app.
    func isWarm(now: Date = Date()) -> Bool {
        alive && now.timeIntervalSince(heartbeat) < SessionState.heartbeatTimeout
    }

    static let heartbeatInterval: TimeInterval = 1.5
    static let heartbeatTimeout: TimeInterval = 5
}

/// Outcome of one job, echoed with the job id and output so the keyboard never
/// inserts a stale result or one made for another language.
struct JobResult: Codable, Equatable {
    var jobId: UUID
    var output: OutputLanguage
    var ok: Bool
    var text: String = ""
    /// False: the text is not in `output` (e.g. the translation failed); ask before inserting.
    var languageOk = true
    var warning: String?
    var code: String?
    var message: String?
    var finishedAt = Date()
}

/// The keyboard reports in when it runs, so the app can tell whether it is
/// enabled and has Full Access (the app has no API to ask).
struct KeyboardReport: Codable, Equatable {
    var fullAccess: Bool
    var seenAt = Date()
}

/// Cross-process "doorbell": Darwin notifications carry no data, the data is
/// in the App Group files.
final class DarwinNotifier {
    enum Name: String {
        case command = "uz.ovozyoz.command"
        case state = "uz.ovozyoz.state"
    }

    static func post(_ name: Name) {
        CFNotificationCenterPostNotification(
            CFNotificationCenterGetDarwinNotifyCenter(),
            CFNotificationName(name.rawValue as CFString),
            nil, nil, true
        )
    }

    private var handlers: [String: () -> Void] = [:]

    /// The handler runs on the main queue.
    func observe(_ name: Name, handler: @escaping () -> Void) {
        let key = name.rawValue
        if handlers[key] == nil {
            CFNotificationCenterAddObserver(
                CFNotificationCenterGetDarwinNotifyCenter(),
                Unmanaged.passUnretained(self).toOpaque(),
                { _, observer, name, _, _ in
                    guard let observer, let name else { return }
                    let notifier = Unmanaged<DarwinNotifier>.fromOpaque(observer).takeUnretainedValue()
                    let key = name.rawValue as String
                    DispatchQueue.main.async { notifier.handlers[key]?() }
                },
                key as CFString,
                nil,
                .deliverImmediately
            )
        }
        handlers[key] = handler
    }

    func stopObserving() {
        CFNotificationCenterRemoveEveryObserver(CFNotificationCenterGetDarwinNotifyCenter(), Unmanaged.passUnretained(self).toOpaque())
        handlers.removeAll()
    }

    deinit { stopObserving() }
}

extension SharedStore {
    var command: KeyboardCommand? { read(KeyboardCommand.self, from: .command) }

    func send(_ command: KeyboardCommand) {
        write(command, to: .command)
        DarwinNotifier.post(.command)
    }

    var sessionState: SessionState { read(SessionState.self, from: .state) ?? SessionState() }

    func publish(_ state: SessionState) {
        write(state, to: .state)
        DarwinNotifier.post(.state)
    }

    var keyboardReport: KeyboardReport? { read(KeyboardReport.self, from: .keyboard) }
}

/// URLs the keyboard opens to bring the app forward.
enum AppLink {
    static let scheme = "ovozyoz"

    /// Opened by the keyboard's mic when the microphone is not ready: the app
    /// turns it on, then the user goes back and the keyboard starts the job.
    static func start(job: UUID) -> URL {
        URL(string: "\(scheme)://start?job=\(job.uuidString)")!
    }

    static let settings = URL(string: "\(scheme)://settings")!

    /// The job id of a start link, if `url` is one.
    static func startJob(in url: URL) -> UUID? {
        guard url.scheme == scheme, url.host == "start",
              let item = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.first(where: { $0.name == "job" }),
              let value = item.value else { return nil }
        return UUID(uuidString: value)
    }
}
