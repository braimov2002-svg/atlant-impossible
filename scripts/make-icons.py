"""Generates every app icon from code so they stay consistent.

Run: python3 scripts/make-icons.py   (needs Pillow)
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
S = 1024  # master size
TOP = (14, 165, 233)  # sky-500 — the blue of the flag
BOTTOM = (16, 185, 129)  # emerald-500 — the green of the flag


def gradient(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = min(1.0, max(0.0, (x * 0.35 + y * 0.65) / size))
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM))
    return img


def mic_glyph(size: int, color, stroke_scale: float = 1.0) -> Image.Image:
    """Microphone with two sound waves, drawn on a transparent square."""
    g = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(g)
    u = size / 1024
    w = round(44 * u * stroke_scale)
    # capsule
    d.rounded_rectangle([412 * u, 210 * u, 612 * u, 560 * u], radius=100 * u, fill=color)
    # holder arc
    d.arc([332 * u, 330 * u, 692 * u, 690 * u], start=0, end=180, fill=color, width=w)
    # stem and base
    d.line([512 * u, 690 * u, 512 * u, 790 * u], fill=color, width=w)
    d.line([412 * u, 812 * u, 612 * u, 812 * u], fill=color, width=w)
    d.ellipse([412 * u - w / 2, 812 * u - w / 2, 412 * u + w / 2, 812 * u + w / 2], fill=color)
    d.ellipse([612 * u - w / 2, 812 * u - w / 2, 612 * u + w / 2, 812 * u + w / 2], fill=color)
    # sound waves
    for r, a in ((300, 255), (390, 150)):
        alpha = color if len(color) == 3 else (*color[:3], round(color[3] * a / 255))
        box = [512 * u - r * u, 400 * u - r * u, 512 * u + r * u, 400 * u + r * u]
        d.arc(box, start=-40, end=40, fill=alpha, width=round(w * 0.8))
        d.arc(box, start=140, end=220, fill=alpha, width=round(w * 0.8))
    return g


def rounded_mask(size: int, radius_ratio: float) -> Image.Image:
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=round(size * radius_ratio), fill=255)
    return m


def app_icon(full_bleed: bool) -> Image.Image:
    """full_bleed=True for maskable/apple icons (OS applies its own mask)."""
    big = S * 2
    bg = gradient(big).convert("RGBA")
    art = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    shadow = mic_glyph(big, (0, 60, 80, 90)).filter(ImageFilter.GaussianBlur(big / 90))
    art.alpha_composite(shadow, (0, round(big * 0.012)))
    art.alpha_composite(mic_glyph(big, (255, 255, 255, 255)))
    if full_bleed:
        # keep the waves inside the maskable-icon safe zone (inner 80% circle)
        small = round(big * 0.78)
        art = art.resize((small, small), Image.LANCZOS)
        offset = (big - small) // 2
        bg.alpha_composite(art, (offset, offset + round(big * 0.03)))
    else:
        bg.alpha_composite(art)
    if not full_bleed:
        # macOS-style: content inset 10% with rounded corners and transparent margin
        inner = round(big * 0.80)
        tile = bg.resize((inner, inner), Image.LANCZOS)
        tile.putalpha(rounded_mask(inner, 0.225))
        canvas = Image.new("RGBA", (big, big), (0, 0, 0, 0))
        canvas.alpha_composite(tile, ((big - inner) // 2, (big - inner) // 2))
        bg = canvas
    return bg.resize((S, S), Image.LANCZOS)


def save(img: Image.Image, rel: str, size: int | None = None) -> None:
    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    (img if size is None else img.resize((size, size), Image.LANCZOS)).save(out, optimize=True)
    print("wrote", rel)


def main() -> None:
    rounded = app_icon(full_bleed=False)
    bleed = app_icon(full_bleed=True)

    # Desktop (electron-builder turns build/icon.png into .icns / .ico)
    save(rounded, "apps/desktop/build/icon.png")
    save(rounded, "apps/desktop/assets/icon.png", 256)

    # Tray: macOS template images are black + alpha, Windows gets the colour icon
    for px, name in ((16, "trayTemplate.png"), (32, "trayTemplate@2x.png")):
        glyph = mic_glyph(S, (0, 0, 0, 255), stroke_scale=1.5)
        save(glyph, f"apps/desktop/assets/{name}", px)
    save(rounded, "apps/desktop/assets/tray-color.png", 32)

    # Web / PWA
    save(rounded, "apps/web/app/icon.png", 512)
    save(bleed, "apps/web/app/apple-icon.png", 180)
    save(rounded, "apps/web/public/icons/icon-192.png", 192)
    save(rounded, "apps/web/public/icons/icon-512.png", 512)
    save(bleed, "apps/web/public/icons/maskable-512.png", 512)


if __name__ == "__main__":
    main()
