import Foundation

/// The App Group container shared by the app and the keyboard. The keyboard
/// can only reach it when the user turned on "Allow Full Access".
enum AppGroup {
    /// Set per build in Config.xcconfig (OY_APP_GROUP) and copied into both Info.plists.
    static var identifier: String {
        (Bundle.main.object(forInfoDictionaryKey: "OYAppGroup") as? String).flatMap { $0.isEmpty ? nil : $0 }
            ?? "group.uz.ovozyoz"
    }

    static var container: URL? {
        FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: identifier)
    }
}

/// Output language and script of the final text (same ids as packages/core).
enum OutputLanguage: String, Codable, CaseIterable, Identifiable {
    case uzLatn = "uz-latn"
    case uzCyrl = "uz-cyrl"
    case ru
    case en

    var id: String { rawValue }

    /// Two-letter badge, as in the web app.
    var short: String {
        switch self {
        case .uzLatn: return "UZ"
        case .uzCyrl: return "ЎЗ"
        case .ru: return "RU"
        case .en: return "EN"
        }
    }

    var label: String {
        switch self {
        case .uzLatn: return "O'zbekcha (lotin)"
        case .uzCyrl: return "Ўзбекча (кирилл)"
        case .ru: return "Ruscha — Русский"
        case .en: return "Inglizcha — English"
        }
    }

    /// The keyboard layout that fits this output.
    var usesCyrillic: Bool { self == .uzCyrl || self == .ru }
}

/// Language the user speaks.
enum SpokenLanguage: String, Codable, CaseIterable, Identifiable {
    case auto, uz, ru, en

    var id: String { rawValue }

    var label: String {
        switch self {
        case .auto: return "Avtomatik aniqlash"
        case .uz: return "O'zbekcha"
        case .ru: return "Ruscha"
        case .en: return "Inglizcha"
        }
    }
}

/// How the official Uzbek apostrophe is written (same ids as packages/core).
enum ApostropheStyle: String, Codable, CaseIterable, Identifiable {
    case ascii, official, keep
    var id: String { rawValue }
}

/// Settings shared by the app and the keyboard (settings.json in the App Group).
struct OYSettings: Codable, Equatable {
    var spoken: SpokenLanguage = .uz
    var output: OutputLanguage = .uzLatn
    var apostrophes: ApostropheStyle = .ascii
    /// Gemini model override; empty = the core's default.
    var geminiModel: String = ""
    /// Minutes the microphone stays ready after the last use; 0 = until stopped.
    var micMinutes: Int = 30
    /// The user accepted that audio and text are sent to Google Gemini.
    var consentGiven: Bool = false
    var onboardingDone: Bool = false

    init() {}

    // Unknown or missing fields fall back to the defaults instead of failing.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        let d = OYSettings()
        spoken = (try? c.decode(SpokenLanguage.self, forKey: .spoken)) ?? d.spoken
        output = (try? c.decode(OutputLanguage.self, forKey: .output)) ?? d.output
        apostrophes = (try? c.decode(ApostropheStyle.self, forKey: .apostrophes)) ?? d.apostrophes
        geminiModel = (try? c.decode(String.self, forKey: .geminiModel)) ?? d.geminiModel
        micMinutes = (try? c.decode(Int.self, forKey: .micMinutes)) ?? d.micMinutes
        consentGiven = (try? c.decode(Bool.self, forKey: .consentGiven)) ?? d.consentGiven
        onboardingDone = (try? c.decode(Bool.self, forKey: .onboardingDone)) ?? d.onboardingDone
    }
}

/// One finished dictation or translation, newest first in history.json.
struct HistoryItem: Codable, Identifiable, Equatable {
    var id = UUID()
    var text: String
    var output: OutputLanguage
    var at = Date()
}

/// Small JSON files in the App Group. Every write is atomic, so the other
/// process never reads half a file.
final class SharedStore {
    static let shared = SharedStore()

    /// nil when the container is unreachable (keyboard without Full Access).
    let directory: URL?

    init(directory: URL? = AppGroup.container) {
        self.directory = directory
        if let directory {
            try? FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        }
    }

    var isAvailable: Bool { directory != nil }

    // MARK: files

    enum File: String {
        case settings = "settings.json"
        case secrets = "secrets.json"
        case command = "command.json"
        case state = "state.json"
        case history = "history.json"
        case keyboard = "keyboard.json"
    }

    func url(_ file: File) -> URL? { directory?.appendingPathComponent(file.rawValue) }

    func read<T: Decodable>(_ type: T.Type, from file: File) -> T? {
        guard let url = url(file), let data = try? Data(contentsOf: url) else { return nil }
        return try? Self.decoder.decode(T.self, from: data)
    }

    @discardableResult
    func write<T: Encodable>(_ value: T, to file: File) -> Bool {
        guard let url = url(file), let data = try? Self.encoder.encode(value) else { return false }
        do {
            // Readable after the first unlock, so the keyboard works on a locked-then-unlocked phone.
            try data.write(to: url, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
            return true
        } catch {
            return false
        }
    }

    func remove(_ file: File) {
        guard let url = url(file) else { return }
        try? FileManager.default.removeItem(at: url)
    }

    static let encoder: JSONEncoder = {
        let e = JSONEncoder()
        e.dateEncodingStrategy = .millisecondsSince1970
        return e
    }()

    static let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.dateDecodingStrategy = .millisecondsSince1970
        return d
    }()

    // MARK: settings

    var settings: OYSettings {
        get { read(OYSettings.self, from: .settings) ?? OYSettings() }
        set { write(newValue, to: .settings) }
    }

    // MARK: API key

    private struct Secrets: Codable { var geminiKey: String }

    /// The user's Google Gemini API key ("" when not set).
    var apiKey: String {
        get { read(Secrets.self, from: .secrets)?.geminiKey ?? "" }
        set {
            let key = newValue.trimmingCharacters(in: .whitespacesAndNewlines)
            if key.isEmpty { remove(.secrets) } else { write(Secrets(geminiKey: key), to: .secrets) }
        }
    }

    // MARK: history

    static let historyLimit = 30

    var history: [HistoryItem] {
        read([HistoryItem].self, from: .history) ?? []
    }

    func addHistory(_ text: String, output: OutputLanguage) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        var items = history
        items.insert(HistoryItem(text: trimmed, output: output), at: 0)
        write(Array(items.prefix(Self.historyLimit)), to: .history)
    }

    func clearHistory() { remove(.history) }
}

/// Masks a key for display: "AIzaSy…3f9c".
func maskedKey(_ key: String) -> String {
    guard key.count > 10 else { return String(repeating: "•", count: key.count) }
    return "\(key.prefix(6))…\(key.suffix(4))"
}
