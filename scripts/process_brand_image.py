#!/usr/bin/env python3
"""
Turns a square source logo/icon (e.g. a fresh export from an image
generator) into the full set of sizes GainPath references from <head>
and the app chrome: a display-size logo, two favicon sizes, and an
apple-touch-icon.

Many logo generators export square art on a solid near-black canvas
behind a rounded-square badge. This flood-fills that canvas color to
transparent (stopping at the badge edge), then for the apple-touch-icon
(which must NOT have alpha, or iOS renders transparency as black)
re-flattens onto an opaque brand background color.

Run from the project root:
    python3 scripts/process_brand_image.py Logo.png \
        --out-dir images/branding

Requires: Pillow (see scripts/requirements.txt)
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw

SIZES = {
    'logo.png': 256,
    'favicon-32.png': 32,
    'favicon-16.png': 16,
}
APPLE_TOUCH_ICON_SIZE = 180


def strip_canvas_to_transparent(im: Image.Image, canvas_rgb: tuple, thresh: int) -> Image.Image:
    """Flood-fill the four corners from canvas_rgb to transparent, stopping at the badge edge."""
    im = im.convert('RGBA')
    w, h = im.size
    corners = [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3)]
    for x, y in corners:
        if im.getpixel((x, y))[:3] == canvas_rgb or _close(im.getpixel((x, y))[:3], canvas_rgb, thresh):
            ImageDraw.floodfill(im, (x, y), (0, 0, 0, 0), thresh=thresh)
    return im


def _close(a, b, thresh):
    return sum(abs(x - y) for x, y in zip(a, b)) <= thresh * 3


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('source', help='Path to the square source image')
    ap.add_argument('--out-dir', default='images/branding', help='Output directory (default: images/branding)')
    ap.add_argument('--canvas-rgb', default='0,0,0', help='Canvas color to strip, as R,G,B (default: 0,0,0 / black)')
    ap.add_argument('--brand-bg', default='254,249,242', help='Opaque brand background for apple-touch-icon, as R,G,B (default: brand cream)')
    ap.add_argument('--thresh', type=int, default=40, help='Flood-fill color tolerance (default: 40)')
    args = ap.parse_args()

    canvas_rgb = tuple(int(v) for v in args.canvas_rgb.split(','))
    brand_bg = tuple(int(v) for v in args.brand_bg.split(','))
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    src = Image.open(args.source)
    transparent = strip_canvas_to_transparent(src, canvas_rgb, args.thresh)

    for filename, size in SIZES.items():
        transparent.resize((size, size), Image.LANCZOS).save(out_dir / filename)
        print(f'wrote {out_dir / filename} ({size}x{size}, transparent corners)')

    flat = Image.new('RGBA', transparent.size, brand_bg + (255,))
    flat.alpha_composite(transparent)
    apple_path = out_dir / 'apple-touch-icon.png'
    flat.convert('RGB').resize((APPLE_TOUCH_ICON_SIZE, APPLE_TOUCH_ICON_SIZE), Image.LANCZOS).save(apple_path)
    print(f'wrote {apple_path} ({APPLE_TOUCH_ICON_SIZE}x{APPLE_TOUCH_ICON_SIZE}, opaque, no alpha)')


if __name__ == '__main__':
    main()
