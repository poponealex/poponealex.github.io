import AppKit
import Foundation

// Convert the site's OKLCH design tokens to sRGB so the card cannot drift from global.css.
func oklch(_ L: Double, _ C: Double, _ H: Double) -> NSColor {
    let h = H * .pi / 180
    let a = C * cos(h), b = C * sin(h)

    let l_ = L + 0.3963377774 * a + 0.2158037573 * b
    let m_ = L - 0.1055613458 * a - 0.0638541728 * b
    let s_ = L - 0.0894841775 * a - 1.2914855480 * b
    let l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_

    let lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    let lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    let lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    func encode(_ x: Double) -> CGFloat {
        let c = max(0, min(1, x))
        return CGFloat(c <= 0.0031308 ? 12.92 * c : 1.055 * pow(c, 1 / 2.4) - 0.055)
    }
    return NSColor(srgbRed: encode(lr), green: encode(lg), blue: encode(lb), alpha: 1)
}

// Dark theme tokens — a dark card holds up better in social feeds.
let paper = oklch(0.17, 0.008, 240)
let ink = oklch(0.94, 0.004, 240)
let inkMuted = oklch(0.68, 0.009, 240)
let inkFaint = oklch(0.56, 0.008, 240)
let accent = oklch(0.76, 0.1, 190)
let line = oklch(0.3, 0.01, 240)

let W = 1200.0, H = 630.0, PAD = 88.0

func font(_ size: Double, _ weight: NSFont.Weight) -> NSFont {
    NSFont.systemFont(ofSize: size, weight: weight)
}
func mono(_ size: Double) -> NSFont {
    NSFont.monospacedSystemFont(ofSize: size, weight: .medium)
}

func draw(_ text: String, _ f: NSFont, _ color: NSColor, at p: CGPoint, kern: Double = 0) {
    NSAttributedString(string: text, attributes: [
        .font: f, .foregroundColor: color, .kern: kern,
    ]).draw(at: p)
}

/// Draws the site mark by mapping `public/favicon.svg`'s 64-unit viewBox onto `size`,
/// so the two cannot drift: the literals below are the SVG's own coordinates.
///
/// The mark's fill is `paper`, which is also this card's background, so only the
/// hairline gives it an edge — the same reason the nav rings it.
func drawMark(at origin: CGPoint, size: Double) {
    let u = size / 64

    let tile = NSBezierPath(
        roundedRect: NSRect(x: origin.x, y: origin.y, width: size, height: size),
        xRadius: 12 * u, yRadius: 12 * u)
    paper.setFill()
    tile.fill()
    line.setStroke()
    tile.lineWidth = 1.5
    tile.stroke()

    // <text x="21" y="42" text-anchor="middle" font-size="30" font-weight="700">a</text>
    let glyphFont = NSFont.monospacedSystemFont(ofSize: 30 * u, weight: .bold)
    let glyph = NSAttributedString(string: "a", attributes: [
        .font: glyphFont, .foregroundColor: ink,
    ])
    // SVG y is a baseline measured from the top; AppKit draws from the box's bottom edge.
    glyph.draw(at: CGPoint(
        x: origin.x + 21 * u - glyph.size().width / 2,
        y: origin.y + (64 - 42) * u + glyphFont.descender))

    // <rect x="36" y="22" width="10" height="21" />
    accent.setFill()
    NSRect(
        x: origin.x + 36 * u, y: origin.y + (64 - 22 - 21) * u,
        width: 10 * u, height: 21 * u
    ).fill()
}

guard
    let rep = NSBitmapImageRep(
        bitmapDataPlanes: nil, pixelsWide: Int(W), pixelsHigh: Int(H),
        bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
        colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)
else { exit(1) }

NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)

paper.setFill()
NSRect(x: 0, y: 0, width: W, height: H).fill()

// Accent hairline down the left edge, echoing the site's rules.
accent.setFill()
NSRect(x: 0, y: 0, width: 10, height: H).fill()

// Origin is bottom-left in AppKit, so these y values read upwards.
// Mark and wordmark share a row, the same lockup the site header uses.
let eyebrowFont = mono(21)
let eyebrowY = H - PAD - 22
let eyebrowHeight = NSAttributedString(string: "PERLMUTTER.TECH", attributes: [.font: eyebrowFont])
    .size().height
let markSize = 46.0

drawMark(
    at: CGPoint(x: PAD, y: eyebrowY + eyebrowHeight / 2 - markSize / 2), size: markSize)
draw(
    "PERLMUTTER.TECH", eyebrowFont, inkFaint,
    at: CGPoint(x: PAD + markSize + 20, y: eyebrowY), kern: 3.2)

draw("Alexandre", font(84, .semibold), ink, at: CGPoint(x: PAD - 4, y: 348))
draw("Perlmutter", font(84, .semibold), ink, at: CGPoint(x: PAD - 4, y: 252))

accent.setFill()
NSRect(x: PAD, y: 214, width: 72, height: 4).fill()

// Must match `site.role` in src/data/site.ts — this card is the hero in image form.
draw(
    "Cloud & Platform Engineer", font(35, .regular), inkMuted,
    at: CGPoint(x: PAD, y: 146))

draw(
    "LUXEMBOURG · AWS DEVOPS PRO · CKA · TERRAFORM PRO", mono(19), inkFaint,
    at: CGPoint(x: PAD, y: PAD - 18), kern: 2.4)

// Call to action, sharing the baseline row with the credentials line above.
// Sized from the measured label rather than hand-placed, so the pill keeps its
// padding if the wording ever changes — and so a label long enough to collide
// with the credentials fails loudly instead of silently overlapping.
let ctaLabel = "SEE THE WORK →"
let ctaAttrs: [NSAttributedString.Key: Any] = [
    .font: mono(19), .foregroundColor: paper, .kern: 2.4,
]
let ctaText = NSAttributedString(string: ctaLabel, attributes: ctaAttrs)
let ctaPadX = 26.0, ctaPadY = 14.0
let pill = NSRect(
    x: W - PAD - (ctaText.size().width + ctaPadX * 2),
    y: PAD - 26,
    width: ctaText.size().width + ctaPadX * 2,
    height: ctaText.size().height + ctaPadY * 2)

// `paper` is the dark theme's --accent-ink, so the label reads on the accent fill.
accent.setFill()
NSBezierPath(roundedRect: pill, xRadius: pill.height / 2, yRadius: pill.height / 2).fill()
ctaText.draw(at: CGPoint(x: pill.minX + ctaPadX, y: pill.minY + ctaPadY))

NSGraphicsContext.restoreGraphicsState()

guard let png = rep.representation(using: .png, properties: [:]) else { exit(1) }
try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
print("wrote \(png.count) bytes")
