#!/usr/bin/env python3
"""Generate an exercise tutorial image via the Gemini image API.

Replaces the manual paste-into-ChatGPT workflow (see the v2.2.0 batch's
exercise-image-prompts .txt for why). Two things make this better than a
fresh chat session: approved images are passed as reference inputs, which
holds the locked character/style, and the 2K output is cropped+resized to
the library's exact 1774x887 canvas.

Usage:
  python3 scripts/gen_exercise_image.py <slug> <brief-file> [refs...]

  <slug>        output name, e.g. dead-bug -> scripts/.gen/dead-bug.png
  <brief-file>  text file: the brief plus any corrective instructions
  [refs...]     approved images/exercises/*.png to copy style from
                (default: barbell-back-squat.png + weighted-sit-up.png)

Env: GEMINI_API_KEY_FILE overrides the key path. Costs ~$0.14 per call;
every generation is appended to scripts/.gen/spend.tsv.
Requires Pillow (pip3 install -r scripts/requirements.txt).
"""
import base64, json, os, subprocess, sys, time
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTDIR = os.path.join(ROOT, 'scripts', '.gen')
KEYFILE = os.environ.get('GEMINI_API_KEY_FILE',
    '/Volumes/EngrJed SSD/03 Projects/YouTube Shorts/secrets/gemini-api-key.txt')
MODEL = os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-3-pro-image')
RATE = 120.0 / 1_000_000  # $/image-output token; verify against Cloud billing

STYLE = """STYLE + CHARACTER LOCK: the attached images are already-approved illustrations from this
exact library. Copy their art style and their character EXACTLY — flat-color 2D vector illustration,
bold clean dark outlines, flat cel-shading only (no gradients, no glossy highlights, no photorealism,
no 3D render), warm light-to-medium tan / olive-beige skin rendered flatly, short cropped dark-brown
hair with no facial hair, lean athletic "everyman" build, calm neutral minimal face, late 20s to
early 30s, fitted heather-gray crew-neck tank top, solid dark navy mid-thigh shorts, solid dark navy
low-top sneakers with white soles. Same artist, same set. Do NOT copy the POSES — style and
character only.

LAYOUT: three equal-width panels side by side, separated by thin gray vertical dividers, showing one
repetition. Plain light-gray background. No text, numbers, labels, logos or watermarks anywhere.

ANATOMY: every arm has exactly one elbow bending in a physically normal direction; hands grip at
normal wrist angles; no joint past its natural range; a visible neck between head and shoulders;
correct finger counts."""


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    slug, brieffile = sys.argv[1], sys.argv[2]
    refs = sys.argv[3:] or ['images/exercises/barbell-back-squat.png',
                            'images/exercises/weighted-sit-up.png']
    os.makedirs(OUTDIR, exist_ok=True)
    key = open(KEYFILE).read().strip()

    parts = [{"text": f"Generate ONE exercise-tutorial illustration for a fitness app.\n\n"
                      f"{STYLE}\n\n{open(brieffile).read().strip()}"}]
    for r in refs:
        path = r if os.path.isabs(r) else os.path.join(ROOT, r)
        parts.append({"inline_data": {"mime_type": "image/png",
                     "data": base64.b64encode(open(path, 'rb').read()).decode()}})

    body = {"contents": [{"parts": parts}],
            "generationConfig": {"responseModalities": ["IMAGE"],
                                 "imageConfig": {"aspectRatio": "16:9", "imageSize": "2K"}}}
    req = os.path.join(OUTDIR, f'.req-{slug}.json')
    with open(req, 'w') as f:
        json.dump(body, f)
    proc = subprocess.run(['curl', '-s', '--max-time', '300', '-X', 'POST',
        f'https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent',
        '-H', f'x-goog-api-key: {key}', '-H', 'Content-Type: application/json',
        '-d', '@' + req], capture_output=True, text=True)
    os.unlink(req)

    d = json.loads(proc.stdout)
    if 'error' in d:
        sys.exit('API ERROR: ' + str(d['error'].get('message'))[:300])
    raw = next((base64.b64decode(p['inlineData']['data'])
                for c in d.get('candidates', [])
                for p in c.get('content', {}).get('parts', []) if 'inlineData' in p), None)
    if raw is None:
        sys.exit('no image returned (failed generations are not billed)')

    tmp = os.path.join(OUTDIR, f'{slug}.raw.png')
    with open(tmp, 'wb') as f:
        f.write(raw)
    im = Image.open(tmp).convert('RGB')
    w, h = im.size
    th = int(round(w / 2.0))
    top = (h - th) // 2
    out = os.path.join(OUTDIR, f'{slug}.png')
    im.crop((0, top, w, top + th)).resize((1774, 887), Image.LANCZOS).save(out)

    um = d.get('usageMetadata', {})
    imgtok = sum(x['tokenCount'] for x in um.get('candidatesTokensDetails', [])
                 if x['modality'] == 'IMAGE')
    cost = imgtok * RATE
    log = os.path.join(OUTDIR, 'spend.tsv')
    if not os.path.exists(log):
        with open(log, 'w') as f:
            f.write('when\tmodel\tslug\timg_out_tok\test_usd\traw_px\n')
    with open(log, 'a') as f:
        f.write(f'{time.strftime("%Y-%m-%d %H:%M")}\t{MODEL}\t{slug}\t{imgtok}\t{cost:.4f}\t{w}x{h}\n')
    print(f'{out}\n  raw {w}x{h} -> 1774x887, {imgtok} img tokens, est ${cost:.4f}')


if __name__ == '__main__':
    main()
