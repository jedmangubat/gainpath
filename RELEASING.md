# Releasing GainPath

Go through this list for every version bump, in order. GainPath has real users
whose only copy of their data is on their own phone, so a release that breaks
startup or storage can't be rolled back for them.

## 1. Decide what kind of release it is

- **Feature release**: has user-facing news. Bump `APP_VERSION` **and**
  `WHATS_NEW_VERSION`, and write a new "What's new" section.
- **Bug-fix-only release**: bump `APP_VERSION` only. Leave
  `WHATS_NEW_VERSION` and `WHATS_NEW_ITEMS` alone, or upgraders will see the
  previous release's announcement under the new version number (this shipped
  broken in v2.0.2).
- **Tooling/docs only** (nothing in `index.html`, `sw.js`, `manifest.json`,
  `images/` or `fonts/` changed): no version bump. Log it under
  `## [Unreleased]` in `CHANGELOG.md` and stop here.

## 2. Version strings

| Where | What | When |
|---|---|---|
| `index.html`: `const APP_VERSION=` | `'X.Y.Z'` | every release |
| `index.html`: `const WHATS_NEW_VERSION=` | `'X.Y.Z'` | feature releases only |
| `index.html`: `WHATS_NEW_ITEMS` + `whatsnew_item*` strings | rewrite in **all three languages** | feature releases only |
| `sw.js`: `const CACHE_NAME=` | `'gainpath-vN'` → `N+1` | whenever anything precached changed (in practice, every release) |
| commit message | ends with `(vX.Y.Z)` | every release |

`manifest.json` has no version field. Don't add one.

## 3. Cached shell (`sw.js`)

- [ ] `CACHE_NAME` bumped. Without the bump, installed users keep the old
      shell.
- [ ] Added or removed an exercise image? Update `EX_IMAGE_URLS` to match
      `images/exercises/`.
- [ ] Added an icon? Re-subset `fonts/tabler-icons-subset.woff2` and add the
      rule to `fonts/tabler-icons.css`. A missing glyph shows up as an empty
      box.
- [ ] Added any new file the app loads? Add it to `SHELL_URLS`.

## 4. Manifest check

- [ ] `manifest.json` `name`/`short_name` still accurate. No "AI" wording
      anywhere.
- [ ] Icons referenced there still exist, and `theme_color`/`background_color`
      still match the dark Kinetic palette
      (`#0C1512`, same as `<meta name="theme-color">` in `index.html`).

## 5. Docs

- [ ] `CHANGELOG.md`: new `## [X.Y.Z] - YYYY-MM-DD` section (move anything
      sitting under `[Unreleased]` into it). Say what changed and why.
- [ ] `README.md`:
  - **Feature release**: fold the previous "What's new" bullets into
    `## Features`, then write a fresh `## ✨ What's new in vX.Y.Z`. Only one
    "What's new" section at a time.
  - **Bug-fix-only release**: no new section and no list of fixes. At most a
    general "bug fixes" line.
- [ ] The UI changed visually? Regenerate README screenshots
      (`images/screenshots/`).
- [ ] Any screen shown in the tutorial changed? Run `npm run capture:tutorial`.
      It re-measures the spotlights too. Never swap a screenshot by hand.
- [ ] `CLAUDE.md` updated if a standing convention changed.

## 6. Checks

- [ ] `npm run precheck` passes. It runs lint → test:units → test:data →
      visual-check and stops loudly at the first failure.
- [ ] Changed storage, Settings, or day editing? Also run `npm run simulate`.
- [ ] Changed storage, backup or restore? Also run `ENGINE=webkit npm run test:data`
      (WebKit is the iPhone engine; its IndexedDB behaves differently).
- [ ] Changed a screen, sheet, or touch target? Also run `npm run chaos`.
- [ ] Changed the workout set row? Check visual-check's overflow results
      specifically.
- [ ] Look at the screenshots in `scripts/.visual-check/` yourself. A passing
      run only means nothing threw an error.

## 7. Commit, push, tag, release

1. Commit with a descriptive message ending in `(vX.Y.Z)`.
2. **Ask before pushing**, every time. An approval for an earlier commit
   doesn't carry over.
3. Once the push is approved, do all of this in the same step:
   ```sh
   git push origin main
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "<this version's CHANGELOG section>"
   ```
4. Confirm the GitHub Releases page shows vX.Y.Z as latest. It once fell
   behind from v1.1.1 to v1.2.6 because tags were skipped.

## 8. After release

- [ ] Open the live app on a phone that already has it installed. Confirm the
      new version loads (Settings shows `APP_VERSION`) and existing data is
      intact.
