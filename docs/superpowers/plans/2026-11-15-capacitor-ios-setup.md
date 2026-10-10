# Capacitor iOS Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wrap GainPath's existing `index.html` in a native Capacitor iOS shell that boots in the Simulator, works fully offline, and clears App Store Guideline 4.2 ("minimum functionality") via real native touches — without adding a build step to the shipped web app or forking its source.

**Architecture:** Capacitor 8 (Swift Package Manager, no CocoaPods) wraps a *generated* `mobile-www/` bundle — a gitignored copy of `index.html` + the runtime assets it needs, produced by a small Node copy script. `index.html` itself gains a handful of guarded, native-only code paths (checked via `window.Capacitor?.isNativePlatform?.()`) that are no-ops on the web version, so the PWA at the existing hosted URL is unaffected. Three CDN-loaded libraries are self-hosted for the mobile bundle only, since a WKWebView with no network on first launch can't reach `cdnjs.cloudflare.com`/`cdn.jsdelivr.net` the way a browser+service-worker combo can.

**Tech Stack:** Capacitor 8 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`), Capacitor plugins (`@capacitor/local-notifications`, `@capacitor/haptics`, `@capacitor/share`, `@capacitor/filesystem`, `@capacitor/splash-screen`, `@capacitor/assets` dev-only), Xcode 16+/iOS Simulator, no bundler (plugins are called via the global `window.Capacitor.Plugins.*` object, matching GainPath's no-build-step convention).

**Spec:** No separate spec doc — this plan is scoped directly from a 2026-09-22 research conversation (App Store technical/legal requirements for converting GainPath to iOS) and the architecture decisions the user made in that conversation (Capacitor path, individual Apple Developer account, bundle ID `me.jedmangubat.gainpath`). The "Context" notes inline in each task carry the reasoning a separate spec doc would otherwise hold.

**Target start date:** 2026-11-15. Tasks 1-11 need no Apple Developer Program membership (Simulator builds run on a free Apple ID) — only Task 12 (device signing) requires the paid account, so enrollment can happen any time before then without blocking earlier tasks.

## Global Constraints

- The shipped web app (`index.html` at repo root, loaded from its existing hosted URL) keeps zero build steps — Capacitor packaging lives entirely in new, additive files (`ios/`, `capacitor.config.json`, `scripts/build_mobile_www.mjs`, `vendor/`) plus a handful of `window.Capacitor?.isNativePlatform?.()`-guarded branches in `index.html` that are no-ops on web.
- Bundle identifier is fixed: `me.jedmangubat.gainpath` — do not change once `npx cap init` runs.
- Visual identity is dark-only "Kinetic": base `#0C1512`, accent `#C6F24E`, on-accent text `--accent-ink`. Every generated icon/splash/status-bar asset must use these, not the stale `#EDEBE3` currently in `manifest.json`.
- No third-party CDN may be load-bearing in the native build — self-host Chart.js/jsPDF/EmailJS for `mobile-www/` only, leave the web app's CDN `<script>` tags untouched.
- Match the existing dense, semicolon-chained inline-script style in any `index.html` edit — do not reformat surrounding code.
- Every task that changes `index.html` gets a `CHANGELOG.md` entry dated the day the work is actually done (not backdated).
- Commits go straight to `main` (no feature branches, matching the project's existing workflow) with descriptive messages and the `Co-Authored-By`/session trailers already in use.
- This plan does not add IAP, accounts, or any paid flow — GainPath stays free, so no Paid Apps Agreement or tax forms are needed for anything in this plan.
- `npm run lint` / `npm run test:units` must still pass after any `index.html` edit (they already run against the real inline script).

---

### Task 1: Verify the Xcode toolchain

**Context:** This machine currently has only Command Line Tools installed (`xcodebuild -version` fails, `xcrun simctl` is missing) — full Xcode.app is not present. Xcode itself must live on the internal APFS drive (`/`, 43Gi free as of 2026-09-22), not the exFAT `EngrJed SSD` (which is at 94% capacity, 64Gi free) — exFAT can't reliably host Xcode's app bundle or DerivedData. The GainPath repo itself stays on the SSD; only Xcode.app and its Simulator runtimes go on the internal drive.

**Files:** None — this is toolchain setup, no repo changes.

- [ ] **Step 1: Check internal-drive free space before downloading**

Run: `df -h /`
Expected: at least 20Gi free (Xcode + one Simulator runtime is roughly 15-18Gi). If short, clear space on the internal drive first — do not attempt to install Xcode onto the SSD.

- [ ] **Step 2: Install Xcode**

Install the current Xcode release from the App Store (search "Xcode") or `developer.apple.com/download`. This does not require a paid Apple Developer account — a free Apple ID is enough to download and run Xcode/Simulator.

- [ ] **Step 3: Point the command-line tools at the full Xcode install**

Run: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
Then: `sudo xcodebuild -license accept`

- [ ] **Step 4: Verify the toolchain**

Run: `xcodebuild -version`
Expected: prints an Xcode version line (16.x or later), not the "requires Xcode" error seen before this task.

Run: `xcrun simctl list devices available | grep iPhone`
Expected: at least one iPhone simulator listed. If none, open Xcode → Settings → Platforms and download an iOS Simulator runtime.

- [ ] **Step 5: No commit needed**

This task changes no repo files — move to Task 2 once verification passes.

---

### Task 2: Add Capacitor and initialize the project

**Context:** Capacitor 8 defaults new iOS projects to Swift Package Manager instead of CocoaPods, which matters here specifically: CocoaPods isn't installed on this machine (`pod` command not found), and CocoaPods has known friction with case-insensitive/exFAT-hosted project directories — SPM sidesteps both.

**Files:**
- Modify: `package.json` (new dependencies)
- Create: `capacitor.config.json`

**Interfaces:**
- Produces: `capacitor.config.json` with `webDir: "mobile-www"` — Task 3's build script must output into that exact folder name.

- [ ] **Step 1: Install Capacitor core packages**

Run:
```bash
cd "/Volumes/EngrJed SSD/03 Projects/GainPath"
npm install @capacitor/core@latest @capacitor/ios@latest
npm install --save-dev @capacitor/cli@latest
```

- [ ] **Step 2: Verify the installed version supports SPM by default**

Run: `npx cap --version`
Expected: `8.x.x` or higher. If it prints `7.x` or lower, re-run Step 1 explicitly pinning `@capacitor/cli@8`.

- [ ] **Step 3: Initialize Capacitor (non-interactive, so the config is exact — no placeholder values)**

Run:
```bash
npx cap init "GainPath" "me.jedmangubat.gainpath" --web-dir=mobile-www
```

- [ ] **Step 4: Verify the generated config**

Run: `cat capacitor.config.json`
Expected: contains `"appId": "me.jedmangubat.gainpath"`, `"appName": "GainPath"`, `"webDir": "mobile-www"`.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json capacitor.config.json
git commit -m "$(cat <<'EOF'
Add Capacitor core packages and initialize iOS project config

First step of the Capacitor iOS wrapper: installs @capacitor/core and
@capacitor/ios, and generates capacitor.config.json pointing at the
mobile-www/ build output (added in the next commit). No native project
or app-facing changes yet.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 3: Self-host the CDN libraries and build the `mobile-www` asset pipeline

**Context:** `index.html` currently loads Chart.js, jsPDF, and EmailJS from `cdnjs.cloudflare.com`/`cdn.jsdelivr.net` (lines 19-21 as of 2026-09-22). The web PWA's service worker precaches these for offline use, but Capacitor's WKWebView has no service worker in play (Task 4 disables it for native) and no network guarantee on first native launch — an offline-on-first-run native app failing to render charts/PDF export is exactly the "not app-like" gap Guideline 4.2 punishes. Self-hosting these three files for the mobile bundle only (not touching the web app's CDN tags) keeps this change scoped and matches the project's own stated principle of preferring self-hosting for anything load-bearing.

**Files:**
- Create: `vendor/chart.umd.min.js`, `vendor/jspdf.umd.min.js`, `vendor/email.min.js`
- Create: `scripts/build_mobile_www.mjs`
- Modify: `package.json` (new `build:mobile` script)
- Modify: `.gitignore` (ignore `mobile-www/`)

**Interfaces:**
- Produces: `mobile-www/index.html`, `mobile-www/fonts/*`, `mobile-www/images/{branding,exercises,tutorial}/*`, `mobile-www/vendor/*.js` — Task 5 (`npx cap sync`) reads this directory via `webDir` from Task 2.

- [ ] **Step 1: Download the exact pinned versions already in use, so behavior is unchanged**

```bash
cd "/Volumes/EngrJed SSD/03 Projects/GainPath"
mkdir -p vendor
curl -sL "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" -o vendor/chart.umd.min.js
curl -sL "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" -o vendor/jspdf.umd.min.js
curl -sL "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js" -o vendor/email.min.js
```

- [ ] **Step 2: Verify the downloads against the SRI hashes already trusted for these exact versions in `index.html`**

Run:
```bash
openssl dgst -sha384 -binary vendor/chart.umd.min.js | openssl base64 -A
```
Expected: matches the hash portion of `integrity="sha384-bs/nf9FbdNouRbMiFcrcZfLXYPKiPaGVGplVbv7dLGECccEXDW+S3zjqSKR5ZEaD"` from `index.html:19`. Repeat for `jspdf.umd.min.js` against `index.html:20`'s hash and `email.min.js` against `index.html:21`'s hash. If any mismatch, the CDN served something other than the pinned version — stop and investigate before continuing.

- [ ] **Step 3: Write the build script**

Create `scripts/build_mobile_www.mjs`:
```js
import { mkdirSync, rmSync, readdirSync, copyFileSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'mobile-www');

function copyDir(srcRel, destRel) {
  const src = join(ROOT, srcRel);
  const dest = join(OUT, destRel);
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    if (statSync(s).isFile()) copyFileSync(s, join(dest, entry));
  }
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

copyDir('fonts', 'fonts');
copyDir('images/branding', 'images/branding');
copyDir('images/exercises', 'images/exercises');
copyDir('images/tutorial', 'images/tutorial');
copyDir('vendor', 'vendor');
// images/screenshots is README-only, never loaded by the app itself — excluded.

let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

const CDN_SWAPS = [
  [
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" integrity="sha384-bs/nf9FbdNouRbMiFcrcZfLXYPKiPaGVGplVbv7dLGECccEXDW+S3zjqSKR5ZEaD" crossorigin="anonymous"></script>',
    '<script src="./vendor/chart.umd.min.js"></script>'
  ],
  [
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" integrity="sha384-JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk" crossorigin="anonymous"></script>',
    '<script src="./vendor/jspdf.umd.min.js"></script>'
  ],
  [
    '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js" integrity="sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS" crossorigin="anonymous"></script>',
    '<script src="./vendor/email.min.js"></script>'
  ]
];

for (const [from, to] of CDN_SWAPS) {
  if (!html.includes(from)) {
    throw new Error(`CDN swap failed to match — index.html changed since this script was written: ${from.slice(0, 60)}...`);
  }
  html = html.replace(from, to);
}

writeFileSync(join(OUT, 'index.html'), html);
console.log('mobile-www built:', OUT);
```

- [ ] **Step 4: Add the npm script**

In `package.json`, add to `"scripts"`:
```json
"build:mobile": "node scripts/build_mobile_www.mjs"
```

- [ ] **Step 5: Ignore the build output**

Add to `.gitignore`:
```
mobile-www/
```

- [ ] **Step 6: Run and verify**

Run: `npm run build:mobile`
Expected: prints `mobile-www built: .../mobile-www`, no thrown error.

Run: `grep -c "cdnjs.cloudflare.com\|cdn.jsdelivr.net" mobile-www/index.html`
Expected: `0` — no CDN references left in the mobile copy.

Run: `ls mobile-www/vendor mobile-www/fonts mobile-www/images/exercises | head`
Expected: files present in each.

- [ ] **Step 7: Commit**

```bash
git add vendor scripts/build_mobile_www.mjs package.json .gitignore
git commit -m "$(cat <<'EOF'
Self-host Chart.js/jsPDF/EmailJS for the mobile build, add mobile-www pipeline

The native Capacitor shell has no service worker and no offline
guarantee on first launch, so the three CDN-loaded libraries the web
app relies on need to be bundled locally for mobile — the web app's
own CDN tags are untouched. scripts/build_mobile_www.mjs copies
index.html (with just those three <script> tags swapped to local
vendor/ paths) plus the fonts/images the app actually loads at
runtime into a gitignored mobile-www/, which capacitor.config.json's
webDir points at.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 4: Guard service-worker registration for the native platform

**Context:** `index.html:16739` unconditionally registers `sw.js` on load. Inside Capacitor's WKWebView this is pointless (Capacitor already serves the bundled `mobile-www/` files locally — there's no live caching job left for a service worker to do) and has caused real cross-platform bugs elsewhere when a service worker meant for a hosted origin runs inside a wrapped-app context. Guard it so it's skipped on native and unchanged on web (`window.Capacitor` is simply undefined in a browser, so this guard is a no-op there).

**Files:**
- Modify: `index.html:16739`

- [ ] **Step 1: Make the edit**

Find (as of 2026-09-22, `index.html:16739`):
```js
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}
```

Replace with:
```js
if('serviceWorker' in navigator&&!window.Capacitor?.isNativePlatform?.()){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}
```

- [ ] **Step 2: Verify no regression on web**

Run: `npm run visual-check`
Expected: passes, same as before the edit (this project's visual-check runs in headless Chromium where `window.Capacitor` is undefined, so the added clause is always `false` there and the branch behaves exactly as before).

Run: `npm run lint`
Expected: passes — no new undefined-variable warnings (`window.Capacitor?.isNativePlatform?.()` is safe optional chaining, not a bare undefined reference).

- [ ] **Step 3: Update CHANGELOG.md**

Add an entry under today's date (the date this task is actually executed):
```markdown
### Fixed
- Service worker registration now skips itself inside the native iOS wrapper (Capacitor), where it has no caching job to do — web PWA behavior is unchanged.
```

- [ ] **Step 4: Commit**

```bash
git add index.html CHANGELOG.md
git commit -m "$(cat <<'EOF'
Skip service-worker registration inside the Capacitor native wrapper

navigator.serviceWorker.register('sw.js') ran unconditionally,
including inside the native iOS WKWebView being added in this
project, where there's no live origin for it to cache against —
Capacitor already serves mobile-www/ locally. Guarded behind
!window.Capacitor?.isNativePlatform?.(), which is always false on
web (window.Capacitor is undefined there), so PWA behavior is
unchanged.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 5: Add the iOS platform and get a blank shell booting in Simulator

**Files:**
- Create: `ios/` (entire Capacitor-generated Xcode project)

**Interfaces:**
- Consumes: `capacitor.config.json` (Task 2), `mobile-www/` (Task 3)

- [ ] **Step 1: Build the mobile bundle fresh**

Run: `npm run build:mobile`

- [ ] **Step 2: Add the iOS platform**

Run: `npx cap add ios`
Expected: creates `ios/App/App.xcodeproj`, `ios/App/App/`, and (since Capacitor 8 defaults to SPM) `ios/App/App.xcworkspace` referencing an SPM package graph, not a `Podfile`.

Run: `ls ios/App | grep -i podfile`
Expected: no output — confirms SPM mode, no CocoaPods involved.

- [ ] **Step 3: Sync the web assets into the native project**

Run: `npx cap sync ios`
Expected: completes without error, prints "Sync finished".

- [ ] **Step 4: Boot it in Simulator**

Run: `npx cap run ios`
When prompted, pick any available iPhone simulator from Task 1.
Expected: Simulator launches, the app installs, and GainPath's actual onboarding/home screen renders (not a blank white screen) — this is `mobile-www/index.html` running natively.

- [ ] **Step 5: Confirm the app works with the Simulator's network disabled (this is the whole point of Task 3)**

In Simulator: Settings app → set Airplane Mode on (or use `xcrun simctl` network link conditioner if preferred).
Relaunch the GainPath app from the Home Screen.
Expected: app still loads fully — onboarding renders, no blank screen, no visible "failed to load script" behavior. This confirms the self-hosted vendor libs are actually being read from the bundle, not silently falling back to a cached network request.

- [ ] **Step 6: Commit**

```bash
git add ios capacitor.config.json
git commit -m "$(cat <<'EOF'
Add iOS platform via Capacitor, verify offline boot in Simulator

npx cap add ios generates the Xcode project (SPM-based, no Podfile —
Capacitor 8 defaults to Swift Package Manager, which avoids the
CocoaPods-on-exFAT friction this drive would otherwise hit).
Verified the app boots to the real onboarding screen with the
Simulator's network fully disabled, confirming the self-hosted
vendor libs from the previous commit are actually load-bearing.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 6: Fix the stale theme colors in `manifest.json`

**Context:** `manifest.json`'s `background_color`/`theme_color` are still `#EDEBE3` (the pre-"Kinetic" light theme), even though the app has been dark-only since v2.0.1 (`#0C1512` base). This was never a visible bug on web (these values only matter for the brief flash before CSS loads on "Add to Home Screen"), but Task 7 uses these exact values as the reference for the native splash screen — worth fixing at the source rather than hardcoding the correct color twice.

**Files:**
- Modify: `manifest.json`

- [ ] **Step 1: Make the edit**

Find:
```json
  "background_color": "#EDEBE3",
  "theme_color": "#EDEBE3",
```

Replace with:
```json
  "background_color": "#0C1512",
  "theme_color": "#0C1512",
```

- [ ] **Step 2: Verify**

Run: `cat manifest.json`
Expected: both fields now read `#0C1512`.

- [ ] **Step 3: Update CHANGELOG.md**

```markdown
### Fixed
- manifest.json's background/theme colors were still the pre-Kinetic light cream (#EDEBE3) — updated to match the actual dark-only theme (#0C1512).
```

- [ ] **Step 4: Commit**

```bash
git add manifest.json CHANGELOG.md
git commit -m "$(cat <<'EOF'
Fix stale light-theme colors in manifest.json

background_color/theme_color were still #EDEBE3 from before the
Kinetic dark-only reskin (v2.0.1) — harmless on web (only affects
the pre-CSS flash on Add to Home Screen) but is also the reference
color the native splash screen generation in the next commit uses,
so worth correcting at the source.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 7: Generate the iOS app icon and splash screen

**Context:** `images/branding/logo.png` is 256×256 — the App Store requires a 1024×1024 master icon (no alpha channel), and Capacitor's icon/splash generator wants a high-resolution source to downscale from, not upscale. This is a real gap: a new high-resolution master icon needs to exist before automated generation can run. `scripts/process_brand_image.py` (existing tooling) processes a *source* logo into the various web sizes — it does not create a higher-resolution one, so this task's first step is producing that source, not just re-running existing tooling.

**Files:**
- Create: `images/branding/logo-1024.png` (new 1024×1024 master, no alpha)
- Create: `images/branding/splash-1024.png` (dark `#0C1512` background, centered mark)
- Modify: `ios/App/App/Assets.xcassets/*` (generated, do not hand-edit)
- Modify: `capacitor.config.json` (splash screen config)

- [ ] **Step 1: Produce the 1024×1024 master icon**

Regenerate the logo at 1024×1024 using whatever produced the original `logo.png` (the Gemini-based generation pipeline already in use for exercise images, per `scripts/gen_exercise_image.py` conventions — reuse the same approved-reference-image technique to keep the mark visually identical, just higher resolution), or upscale losslessly via a vector source if one exists. Save as `images/branding/logo-1024.png`. This step has a real cost if it goes through the paid Gemini image API — treat it as a single one-off spend, not a batch.

Verify: `sips -g pixelWidth -g pixelHeight images/branding/logo-1024.png`
Expected: `pixelWidth: 1024`, `pixelHeight: 1024`, and no alpha channel (App Store icons must be fully opaque) — check with `sips -g hasAlpha images/branding/logo-1024.png`, expected `hasAlpha: no`. If it reports `yes`, flatten onto `#0C1512` first (same alpha-flattening step `process_brand_image.py` already does for `apple-touch-icon.png`).

- [ ] **Step 2: Produce a splash-screen source**

Create `images/branding/splash-1024.png`: the `logo-1024.png` mark centered on a plain `#0C1512` canvas (2732×2732, Apple's recommended splash master size) — a solid-color background with the mark centered avoids any device-size cropping surprises.

- [ ] **Step 3: Install the asset generator**

```bash
npm install --save-dev @capacitor/assets@latest
```

- [ ] **Step 4: Generate the iOS asset catalog**

```bash
npx capacitor-assets generate --ios --iconBackgroundColor '#0C1512' --iconBackgroundColorDark '#0C1512' --splashBackgroundColor '#0C1512' --splashBackgroundColorDark '#0C1512'
```
(Point it at `images/branding/logo-1024.png` / `splash-1024.png` if it doesn't auto-discover them — check the command's own `--help` output for the exact source-path flags in the installed version, since this changes between major versions.)

Expected: populates `ios/App/App/Assets.xcassets/AppIcon.appiconset/` and the splash screen storyboard/assets with every required size.

- [ ] **Step 5: Verify in Simulator**

Run: `npx cap sync ios && npx cap run ios`
Expected: Home Screen icon is the GainPath mark on a dark background (not a white square, not the default Capacitor placeholder), and the launch splash shows the dark `#0C1512` background before the app renders — not a flash of white.

- [ ] **Step 6: Commit**

```bash
git add images/branding/logo-1024.png images/branding/splash-1024.png ios/App/App/Assets.xcassets package.json package-lock.json
git commit -m "$(cat <<'EOF'
Generate iOS app icon and splash screen from a new 1024x1024 master

logo.png (256x256) was too low-resolution for the App Store's
1024x1024 icon requirement. Added a proper master icon and a
dark-background (#0C1512, matching the Kinetic theme) splash source,
then generated the full iOS asset catalog via @capacitor/assets.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 8: Native touch #1 — scheduled Local Notifications for the rest timer

**Context:** This is both a Guideline 4.2 native-functionality touch and a genuine fix: the project's own memory notes a past workaround ("iOS rest timer workaround: visibilitychange reconciliation for suspended PWA timers") because a backgrounded web timer can't reliably fire an alert — `navigator.vibrate` is also a no-op in WKWebView. Scheduling a real local notification *in advance* (at `startRest()` time, for the exact moment `ST.restEnd` is reached) fixes this properly on native instead of reconciling after the fact.

**Files:**
- Modify: `index.html` (`startRest()` around line 16245, `endRest()` around line 16595, `finalRestAlert()`/`notifyRestDone()` around lines 14576-14589, and the permission-request site at line 15864)

**Interfaces:**
- Consumes: `window.Capacitor.Plugins.LocalNotifications` (global, available once the plugin's native side is synced in Step 1 — no import needed, matches the no-bundler convention)

- [ ] **Step 1: Install the plugin**

```bash
npm install @capacitor/local-notifications@latest
npx cap sync ios
```

- [ ] **Step 2: Request permission alongside the existing web Notification permission request**

Find (`index.html:15864`):
```js
  if(CFG.restSound&&'Notification' in window&&Notification.permission==='default'){try{Notification.requestPermission();}catch(e){}}
```

Replace with:
```js
  if(CFG.restSound&&'Notification' in window&&Notification.permission==='default'){try{Notification.requestPermission();}catch(e){}}
  if(CFG.restSound&&window.Capacitor?.isNativePlatform?.()){window.Capacitor.Plugins.LocalNotifications.requestPermissions().catch(()=>{});}
```

- [ ] **Step 3: Schedule the notification when rest starts**

Find (`index.html:16245`, inside `startRest`):
```js
function startRest(ex,si,done,next,ssReturn){
```
A few lines below, find where `ST.restEnd` is set:
```js
  ST.restEnd=Date.now()+ST.rs*1000;ST.restInfo={si,done,next,isLastSet,ssReturn:ssReturn!=null?ssReturn:null};
```

Replace with:
```js
  ST.restEnd=Date.now()+ST.rs*1000;ST.restInfo={si,done,next,isLastSet,ssReturn:ssReturn!=null?ssReturn:null};
  if(CFG.restSound&&window.Capacitor?.isNativePlatform?.()){window.Capacitor.Plugins.LocalNotifications.schedule({notifications:[{id:1001,title:'Rest over — back to work! 💪',body:'Your rest timer is done.',schedule:{at:new Date(ST.restEnd)}}]}).catch(()=>{});}
```

- [ ] **Step 4: Cancel the pending notification if rest ends early (skip / adjust past zero / workout paused)**

Find (`index.html:16595`, start of `endRest`):
```js
function endRest(){disarmRestAudioKick();
```

Replace with:
```js
function endRest(){disarmRestAudioKick();if(window.Capacitor?.isNativePlatform?.()){window.Capacitor.Plugins.LocalNotifications.cancel({notifications:[{id:1001}]}).catch(()=>{});}
```
(Keep the rest of the existing `endRest()` line unchanged after this — this only prepends the cancel call.)

- [ ] **Step 5: Verify in Simulator**

Run: `npm run build:mobile && npx cap sync ios && npx cap run ios`
Start a workout, log a set to trigger a rest period, background the app (Simulator: Device → Home Screen or `Cmd+Shift+H`), wait for the rest duration to elapse.
Expected: a native notification banner appears while the app is backgrounded, reading "Rest over — back to work! 💪". Foreground the app before rest ends on a separate run and confirm no notification fires (cancel worked).

- [ ] **Step 6: Verify web is unaffected**

Run: `npm run test:units && npm run lint`
Expected: both pass — `window.Capacitor` is undefined on web, so every new branch above is skipped there and existing rest-timer behavior (including the beep/vibrate/web-Notification path) runs exactly as before.

- [ ] **Step 7: Update CHANGELOG.md**

```markdown
### Added
- iOS app: rest timer now schedules a real native notification in advance, so it fires reliably even when the app is backgrounded — replaces the old reconcile-on-foreground workaround for the native build.
```

- [ ] **Step 8: Commit**

```bash
git add index.html CHANGELOG.md package.json package-lock.json
git commit -m "$(cat <<'EOF'
Schedule native local notifications for the rest timer on iOS

Backgrounded web timers can't reliably fire an alert (navigator.vibrate
is also a no-op in WKWebView) — this project already carries a
visibilitychange-reconciliation workaround for that on web. On native,
scheduling a real LocalNotification for ST.restEnd at startRest() time
(and canceling it in endRest() if rest ends early) fixes this properly
instead of reconciling after the fact, and doubles as one of the native
touches Guideline 4.2 review looks for. Fully guarded behind
window.Capacitor?.isNativePlatform?.() — no change to web behavior.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 9: Native touch #2 — Haptics on set logging and PRs

**Context:** `vib()` (`index.html:14569`) already wraps `navigator.vibrate` behind `CFG.restSound`, but `navigator.vibrate` is a documented no-op in WKWebView — so on native, every existing call site (rest-countdown tick, final rest alert) is currently silent. Extending `vib()` itself to also drive native Haptics fixes every existing call site at once, plus this task adds one new call in `dset()` specifically for the "new PR" moment, which currently has no haptic feedback at all even on web.

**Files:**
- Modify: `index.html` (`vib()` at line 14569, `dset()` around line 16170-16177)

**Interfaces:**
- Consumes: `window.Capacitor.Plugins.Haptics`

- [ ] **Step 1: Install the plugin**

```bash
npm install @capacitor/haptics@latest
npx cap sync ios
```

- [ ] **Step 2: Extend `vib()` to also fire native haptics**

Find (`index.html:14569`):
```js
function vib(pattern){if(CFG.restSound&&navigator.vibrate){try{navigator.vibrate(pattern);}catch(e){}}}
```

Replace with:
```js
function vib(pattern){if(!CFG.restSound)return;if(window.Capacitor?.isNativePlatform?.()){window.Capacitor.Plugins.Haptics.impact({style:'Light'}).catch(()=>{});return;}if(navigator.vibrate){try{navigator.vibrate(pattern);}catch(e){}}}
```

- [ ] **Step 3: Add a stronger haptic specifically for PRs in `dset()`**

Find (`index.html:16174`):
```js
  if(s.t!=='w'&&chkPR(ex.name,s.w,s.r,ex.holdSecs))showPR(ex.name,s.w,s.r,isBW,ex.holdSecs);
```

Replace with:
```js
  if(s.t!=='w'&&chkPR(ex.name,s.w,s.r,ex.holdSecs)){showPR(ex.name,s.w,s.r,isBW,ex.holdSecs);if(CFG.restSound&&window.Capacitor?.isNativePlatform?.()){window.Capacitor.Plugins.Haptics.notification({type:'Success'}).catch(()=>{});}}
```

- [ ] **Step 4: Verify in Simulator**

Run: `npm run build:mobile && npx cap sync ios && npx cap run ios`
Note: the iOS Simulator does not physically vibrate, but `npx cap run ios --livereload` console logs (or a temporary `console.log` in the plugin call, removed before commit) confirm the Haptics call fires without throwing. Real haptic feedback needs a physical device pass later (Task 12) — this step only confirms no runtime error.

- [ ] **Step 5: Verify web is unaffected**

Run: `npm run test:units && npm run lint`
Expected: both pass. `vib()`'s existing web behavior (`navigator.vibrate` path) is now the `else` branch, reached only when `window.Capacitor` is undefined — unchanged.

- [ ] **Step 6: Update CHANGELOG.md**

```markdown
### Added
- iOS app: rest-timer ticks and PR moments now trigger native haptic feedback (navigator.vibrate is a no-op inside the native wrapper, so this was previously silent on iOS).
```

- [ ] **Step 7: Commit**

```bash
git add index.html CHANGELOG.md package.json package-lock.json
git commit -m "$(cat <<'EOF'
Add native Haptics feedback for vib() and PR moments on iOS

navigator.vibrate() is a documented no-op in WKWebView, so every
existing vib() call site (rest-countdown tick, final rest alert) was
silently doing nothing on the native build. Extending vib() itself to
route through Capacitor's Haptics plugin on native fixes all of those
at once; dset() also gets a distinct success haptic on a new PR, which
had no haptic feedback at all before (web or native). Guarded behind
window.Capacitor?.isNativePlatform?.() — web keeps its existing
navigator.vibrate() path unchanged.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 10: Native touch #3 — native Share sheet for the backup export

**Context:** `exportData()` (`index.html:16597`) currently builds a `Blob` and triggers a `<a download>` click — inside a native WKWebView this either silently fails or dumps into an inaccessible sandboxed download location, since there's no browser download manager to catch it. Writing the file via the Filesystem plugin and handing it to the native Share sheet gives the user a real way to save/AirDrop/email their backup — this is also the third native-API touch for Guideline 4.2.

**Files:**
- Modify: `index.html` (`exportData()` at line 16597)

**Interfaces:**
- Consumes: `window.Capacitor.Plugins.Filesystem`, `window.Capacitor.Plugins.Share`

- [ ] **Step 1: Install the plugins**

```bash
npm install @capacitor/filesystem@latest @capacitor/share@latest
npx cap sync ios
```

- [ ] **Step 2: Make the edit**

Find (`index.html:16597`):
```js
function exportData(){const data={cfg:CFG,history:ST.history,prs:ST.prs,mw:ST.mw,bw:ST.bw,exported:new Date().toISOString(),version:'2.0'};localStorage.setItem('gp_last_export',data.exported);const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='gainpath-backup.json';a.click();URL.revokeObjectURL(url);CFG.exportedAtHistoryLen=ST.history.length;saveCFG();gid('ex-st').textContent='Backup downloaded!';setTimeout(()=>{gid('ex-st').textContent='';},4000);renderHomeBanners();track('data_exported');}
```

Replace with:
```js
function exportData(){const data={cfg:CFG,history:ST.history,prs:ST.prs,mw:ST.mw,bw:ST.bw,exported:new Date().toISOString(),version:'2.0'};localStorage.setItem('gp_last_export',data.exported);const json=JSON.stringify(data,null,2);
  if(window.Capacitor?.isNativePlatform?.()){nativeExportBackup(json);return;}
  const blob=new Blob([json],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='gainpath-backup.json';a.click();URL.revokeObjectURL(url);CFG.exportedAtHistoryLen=ST.history.length;saveCFG();gid('ex-st').textContent='Backup downloaded!';setTimeout(()=>{gid('ex-st').textContent='';},4000);renderHomeBanners();track('data_exported');}
async function nativeExportBackup(json){const fileName='gainpath-backup-'+new Date().toISOString().slice(0,10)+'.json';try{const res=await window.Capacitor.Plugins.Filesystem.writeFile({path:fileName,data:json,directory:'CACHE',encoding:'utf8'});await window.Capacitor.Plugins.Share.share({title:'GainPath backup',text:'GainPath data export',url:res.uri,dialogTitle:'Save your backup'});CFG.exportedAtHistoryLen=ST.history.length;saveCFG();gid('ex-st').textContent='Backup ready to save!';setTimeout(()=>{gid('ex-st').textContent='';},4000);renderHomeBanners();track('data_exported');}catch(e){gid('ex-st').textContent='Export failed — try again.';setTimeout(()=>{gid('ex-st').textContent='';},4000);}}
```

- [ ] **Step 3: Verify in Simulator**

Run: `npm run build:mobile && npx cap sync ios && npx cap run ios`
Go to Settings → Reports & backup → export/download backup.
Expected: the native iOS Share sheet appears (not a silent no-op), offering Save to Files / AirDrop / Mail etc., with a `gainpath-backup-YYYY-MM-DD.json` file attached.

- [ ] **Step 4: Verify web is unaffected**

Run: `npm run test:units && npm run lint`
Expected: both pass — the native branch returns early only when `window.Capacitor?.isNativePlatform?.()` is truthy, so the existing Blob/`<a download>` path is unchanged on web.

- [ ] **Step 5: Update CHANGELOG.md**

```markdown
### Added
- iOS app: backup export now uses the native Share sheet (Save to Files/AirDrop/Mail) instead of a browser-style download link, which doesn't work inside the native wrapper.
```

- [ ] **Step 6: Commit**

```bash
git add index.html CHANGELOG.md package.json package-lock.json
git commit -m "$(cat <<'EOF'
Use native Share sheet for backup export inside the iOS app

exportData()'s Blob + <a download> click has no browser download
manager to land in inside a native WKWebView. On native, the backup
JSON is now written via the Filesystem plugin and handed to the
native Share sheet (Save to Files/AirDrop/Mail/etc.) instead. Web
keeps its existing Blob-download path unchanged, gated behind
window.Capacitor?.isNativePlatform?.().

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 11: Privacy manifest and Info.plist configuration

**Context:** Apple has required `PrivacyInfo.xcprivacy` for every App Store submission since May 2024 — App Store Connect rejects the binary at upload (not just at review) if a "Required Reason API" your app or its native dependencies touch isn't declared. Capacitor's own bridge and the Filesystem/Preferences-adjacent native code touch `UserDefaults` and file timestamps, so both need declaring even though GainPath's own JS never calls those APIs directly.

**Files:**
- Create: `ios/App/App/PrivacyInfo.xcprivacy`
- Modify: `ios/App/App/Info.plist` (display name, orientation lock, status bar style)

- [ ] **Step 1: Write the privacy manifest**

Create `ios/App/App/PrivacyInfo.xcprivacy`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSPrivacyTracking</key>
	<false/>
	<key>NSPrivacyTrackingDomains</key>
	<array/>
	<key>NSPrivacyCollectedDataTypes</key>
	<array/>
	<key>NSPrivacyAccessedAPITypes</key>
	<array>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryUserDefaults</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>CA92.1</string>
			</array>
		</dict>
		<dict>
			<key>NSPrivacyAccessedAPIType</key>
			<string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
			<key>NSPrivacyAccessedAPITypeReasons</key>
			<array>
				<string>C617.1</string>
			</array>
		</dict>
	</array>
</dict>
</plist>
```
(`CA92.1` = access info from the same app, per documented entitlement; `C617.1` = manage/delete files the app itself created, in direct response to a user action, within the app's own container — matches the backup-export file the app writes in Task 10.)

- [ ] **Step 2: Set display name and lock orientation to portrait in Info.plist**

Open `ios/App/App/Info.plist` in Xcode (or edit the XML directly) and set:
```xml
<key>CFBundleDisplayName</key>
<string>GainPath</string>
<key>UISupportedInterfaceOrientations</key>
<array>
	<string>UIInterfaceOrientationPortrait</string>
</array>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
```
(Light-content status bar text matches the dark `#0C1512` background — GainPath is dark-only, so this never needs to branch by theme.)

- [ ] **Step 3: Verify the build still succeeds with the manifest present**

Run: `npx cap sync ios && npx cap run ios`
Expected: app still launches correctly; status bar text is visible (light) against the dark background; orientation stays locked to portrait if you try rotating the Simulator (`Cmd+Left`/`Cmd+Right`).

- [ ] **Step 4: Commit**

```bash
git add ios/App/App/PrivacyInfo.xcprivacy ios/App/App/Info.plist
git commit -m "$(cat <<'EOF'
Add privacy manifest and lock display config for the iOS app

PrivacyInfo.xcprivacy declares the Required Reason APIs Capacitor's
own bridge and the Filesystem plugin touch (UserDefaults,
FileTimestamp) — Apple rejects binaries missing this at App Store
Connect upload, not just at review. Also sets the app's display name,
locks orientation to portrait (matches the existing mobile-only
layout), and sets a light-content status bar to match the dark-only
Kinetic theme.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

### Task 12: Code signing and a real-device verification pass

**Context:** This is the first task that actually needs the paid Apple Developer Program membership (enroll as an individual, per the earlier decision, any time before this task — Tasks 1-11 don't need it). Simulator testing so far proves the app boots and the JS logic runs; it does not prove haptics, real push-style backgrounding, or Share-sheet-to-Files actually work the way they do on hardware.

**Files:**
- Modify: `ios/App/App.xcodeproj/project.pbxproj` (signing team, generated by Xcode UI — do not hand-edit)

- [ ] **Step 1: Enroll in the Apple Developer Program (if not already done)**

At developer.apple.com/programs/enroll — individual account, $99/year, using the Apple ID tied to jed.mangubat@me.com. Allow up to 48h for account activation.

- [ ] **Step 2: Set the signing team in Xcode**

Open `ios/App/App.xcworkspace` in Xcode → select the `App` target → Signing & Capabilities → check "Automatically manage signing" → select the newly-enrolled team from the dropdown.

- [ ] **Step 3: Build to a physical device**

Connect an iPhone via USB (or wireless debugging), select it as the run destination in Xcode, click Run.
Expected: app installs and launches on the physical device (first run requires trusting the developer certificate under Settings → General → VPN & Device Management on the phone).

- [ ] **Step 4: Manually verify every native touch on real hardware**

- Start a workout, log a set at a weight that beats your current PR for that exercise → feel a distinct success haptic (Task 9).
- Log a normal (non-PR) set → feel a light haptic.
- Start a rest timer, background the app for its full duration → receive the "Rest over — back to work! 💪" native notification (Task 8).
- Go to Settings → Reports & backup → export → the native Share sheet appears and "Save to Files" produces a real, openable JSON file (Task 10).
- Toggle Airplane Mode, relaunch the app → it still fully works (confirms the offline bundle from Task 3/5 holds on real hardware, not just Simulator).

- [ ] **Step 5: No commit needed for this task**

Signing configuration is local/device-specific (the `DEVELOPMENT_TEAM` value in `project.pbxproj` is tied to your personal team ID) — if Xcode did write a team ID into `project.pbxproj`, review the diff before committing; if you'd rather keep that value out of source control, add `ios/App/App.xcodeproj/project.pbxproj`'s `DEVELOPMENT_TEAM` line to a local git-ignored override instead of committing your personal team ID.

---

### Task 13: Final verification pass and consolidated CHANGELOG summary

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Run the full existing check suite against the unaffected web app**

```bash
npm run lint
npm run test:units
npm run visual-check
```
Expected: all three pass, confirming nothing in this plan regressed the web PWA.

- [ ] **Step 2: Re-run the native offline+native-touch checklist from Task 12, Step 4, once more end-to-end**

This confirms the full sequence (Tasks 1-12) together, not just each task in isolation.

- [ ] **Step 3: Add a summary CHANGELOG.md entry**

Under today's date (the day this task is actually executed):
```markdown
### Added
- Initial Capacitor-based iOS app wrapper: offline-capable native shell (self-hosted Chart.js/jsPDF/EmailJS, no service worker dependency), native rest-timer notifications, haptic feedback on set logging and PRs, and a native Share sheet for backup export. Not yet submitted to the App Store — this covers the technical build only (see the Nov 2026 iOS research conversation for the remaining App Store Connect / privacy policy / submission checklist).
```

- [ ] **Step 4: Commit**

```bash
git add CHANGELOG.md
git commit -m "$(cat <<'EOF'
Wrap up Capacitor iOS technical setup — offline shell + native touches verified

Consolidated CHANGELOG summary for the Capacitor iOS wrapper work
(Tasks 1-12 of the implementation plan): offline-capable native
shell, self-hosted CDN libraries, native rest-timer notifications,
haptics, and native Share-sheet export, verified on both Simulator
and physical hardware with the network disabled. App Store Connect
setup, privacy policy, and submission are a separate next step, not
covered by this commit.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Buo2TxJZFt62eBhLQvGqj2
EOF
)"
```

---

## What this plan deliberately does not cover

Scoped out on purpose — these are real next steps, but they're paperwork/submission work, not Capacitor engineering, and belong in a separate plan once this one ships:

- App Store Connect app record creation, screenshots, listing copy, age rating questionnaire, App Privacy "nutrition label."
- Privacy policy page (needs a live URL before submission).
- TestFlight beta distribution.
- Extending `scripts/ios_verify.mjs`/`ios_chaos.mjs` (currently Mobile-Safari-only) to also drive the native binary via Appium — worth doing once the app is stable, not blocking first Simulator/device verification.
- Any monetization decision (IAP, Paid Apps Agreement, tax forms) — this plan assumes GainPath stays free.
