#!/usr/bin/env python3
"""
Scans the GainPath project root for newly dropped exercise images, matches
each filename against the exercise list in image-checklist.md, and on a
confident match renames + moves the file into images/exercises/ and checks
it off the checklist.

Run from the project root:
    python3 scripts/match_exercise_images.py

Ambiguous or low-confidence files are left untouched in the root and
reported so a human can clarify rather than being guessed at.
"""
import difflib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHECKLIST = ROOT / "image-checklist.md"
DEST_DIR = ROOT / "images" / "exercises"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}

# Confidence thresholds for difflib.SequenceMatcher ratio on normalized strings.
CONFIDENT_MATCH = 0.86
AMBIGUOUS_GAP = 0.06  # if top two scores are within this gap, treat as ambiguous


def normalize(name: str) -> str:
    """Lowercase, collapse separators (-, _, spaces) to single spaces, strip punctuation noise."""
    name = name.lower()
    name = re.sub(r"[_\-]+", " ", name)
    name = re.sub(r"[^a-z0-9\s]", "", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name


def slugify(name: str) -> str:
    """Exact exercise name -> lowercase-hyphenated slug, per the spec (spaces -> hyphens)."""
    return re.sub(r"\s+", "-", name.strip().lower())


def load_checklist():
    """Returns (lines, [(exercise_name, slug, checked_bool, line_index)])"""
    lines = CHECKLIST.read_text().splitlines()
    entries = []
    pattern = re.compile(r"^- \[( |x)\] (.+?) \(`([a-z0-9-]+)`\)$")
    for i, line in enumerate(lines):
        m = pattern.match(line)
        if m:
            checked = m.group(1) == "x"
            exercise_name = m.group(2)
            slug = m.group(3)
            entries.append((exercise_name, slug, checked, i))
    return lines, entries


def save_checklist(lines):
    CHECKLIST.write_text("\n".join(lines) + "\n")


def find_candidate_images():
    skip_dirs = {DEST_DIR.resolve(), (ROOT / "images").resolve()}
    candidates = []
    for p in ROOT.iterdir():
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS:
            candidates.append(p)
    return candidates


def best_matches(filename_stem: str, entries):
    """Return sorted list of (score, exercise_name, slug, checked, line_idx) best first."""
    norm_file = normalize(filename_stem)
    scored = []
    for exercise_name, slug, checked, line_idx in entries:
        norm_ex = normalize(exercise_name)
        score = difflib.SequenceMatcher(None, norm_file, norm_ex).ratio()
        # Boost exact substring containment (handles cases like "hack squat machine" -> "hack squat")
        if norm_ex in norm_file or norm_file in norm_ex:
            score = max(score, 0.9)
        scored.append((score, exercise_name, slug, checked, line_idx))
    scored.sort(key=lambda t: t[0], reverse=True)
    return scored


def main():
    if not CHECKLIST.exists():
        print(f"ERROR: {CHECKLIST} not found. Run the checklist generator first.")
        sys.exit(1)

    DEST_DIR.mkdir(parents=True, exist_ok=True)
    lines, entries = load_checklist()

    candidates = find_candidate_images()
    if not candidates:
        print("No new image files found in the project root.")
    else:
        for img_path in candidates:
            stem = img_path.stem
            ranked = best_matches(stem, entries)
            top = ranked[0]
            second = ranked[1] if len(ranked) > 1 else None

            top_score, exercise_name, slug, checked, line_idx = top
            exact_match = normalize(stem) == normalize(exercise_name)
            ambiguous = not exact_match and (
                top_score < CONFIDENT_MATCH
                or (second is not None and (top_score - second[0]) < AMBIGUOUS_GAP and second[0] >= CONFIDENT_MATCH - 0.1)
            )

            if ambiguous:
                alt = f" (also close: \"{second[1]}\")" if second and second[0] >= CONFIDENT_MATCH - 0.15 else ""
                print(f"AMBIGUOUS: \"{img_path.name}\" -> best guess \"{exercise_name}\" "
                      f"(confidence {top_score:.2f}){alt}. Left in place — please clarify.")
                continue

            if checked:
                print(f"SKIPPED: \"{img_path.name}\" matches \"{exercise_name}\", which already has an image. "
                      f"Left in place — please check manually if you meant to replace it.")
                continue

            dest_path = DEST_DIR / f"{slug}{img_path.suffix.lower()}"
            if dest_path.exists():
                print(f"SKIPPED: \"{img_path.name}\" matches \"{exercise_name}\", but {dest_path.name} "
                      f"already exists in images/exercises/. Left in place — please clarify.")
                continue

            img_path.rename(dest_path)
            lines[line_idx] = lines[line_idx].replace("- [ ]", "- [x]", 1)
            print(f"MATCHED: \"{img_path.name}\" -> \"{exercise_name}\" (confidence {top_score:.2f}) "
                  f"-> images/exercises/{dest_path.name}")

        save_checklist(lines)

    _, entries = load_checklist()
    total = len(entries)
    done = sum(1 for _, _, checked, _ in entries if checked)
    print(f"\n{done} of {total} exercises now have images.")


if __name__ == "__main__":
    main()
