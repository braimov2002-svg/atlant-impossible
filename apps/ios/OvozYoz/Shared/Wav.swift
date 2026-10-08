import Foundation

/// 16-bit PCM mono WAV, the format the shared core sends to Gemini.
enum Wav {
    static let sampleRate = 16_000

    static func encode(_ samples: [Float], sampleRate: Int = Wav.sampleRate) -> Data {
        let dataBytes = samples.count * 2
        var data = Data(capacity: 44 + dataBytes)
        func u32(_ v: UInt32) { withUnsafeBytes(of: v.littleEndian) { data.append(contentsOf: $0) } }
        func u16(_ v: UInt16) { withUnsafeBytes(of: v.littleEndian) { data.append(contentsOf: $0) } }
        data.append(contentsOf: Array("RIFF".utf8))
        u32(UInt32(36 + dataBytes))
        data.append(contentsOf: Array("WAVEfmt ".utf8))
        u32(16) // fmt chunk size
        u16(1) // PCM
        u16(1) // mono
        u32(UInt32(sampleRate))
        u32(UInt32(sampleRate * 2)) // byte rate
        u16(2) // block align
        u16(16) // bits per sample
        data.append(contentsOf: Array("data".utf8))
        u32(UInt32(dataBytes))
        var pcm = [Int16](repeating: 0, count: samples.count)
        for (i, s) in samples.enumerated() {
            let clamped = max(-1, min(1, s.isFinite ? s : 0))
            pcm[i] = Int16(clamped < 0 ? clamped * 32768 : clamped * 32767)
        }
        // Every iPhone is little-endian, like WAV.
        pcm.withUnsafeBytes { data.append(contentsOf: $0) }
        return data
    }

    static func duration(sampleCount: Int, sampleRate: Int = Wav.sampleRate) -> TimeInterval {
        Double(sampleCount) / Double(sampleRate)
    }
}

/// RMS level of a chunk mapped to 0...1 for a meter (same curve idea as the web app).
func meterLevel(_ samples: UnsafeBufferPointer<Float>) -> Float {
    guard !samples.isEmpty else { return 0 }
    var sum: Float = 0
    for s in samples { sum += s * s }
    let rms = (sum / Float(samples.count)).squareRoot()
    let db = 20 * log10(max(rms, 1e-6))
    return max(0, min(1, (db + 55) / 45))
}
