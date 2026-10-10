# Android (Google Play) via Trusted Web Activity — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish GainPath on Google Play as a Trusted Web Activity (TWA) that opens the existing hosted PWA full-screen, with every Play policy form, the privacy policy and the store listing in place, and without forking `index.html` or moving the app's origin.

**Architecture:** Bubblewrap (Google's official TWA CLI) generates a small Android project in `android-twa/`. That project launches `https://jedmangubat.github.io/gainpath/index.html?twa=1` in the user's Chrome with no browser UI. The TWA is trusted through a Digital Asset Links file at the **origin root**, `https://jedmangubat.github.io/.well-known/assetlinks.json`, which means creating a `jedmangubat.github.io` GitHub user-site repo. Because the app is a live web page, pushing to `main` updates the Android app with no Play re-release. `index.html` only gains an `IS_TWA` flag that hides iOS-only features in the Play build. It is a no-op on the web.

**Tech Stack:** `@bubblewrap/cli` (run through `npx`; it installs its own JDK 17 + Android SDK into `~/.bubblewrap` on the internal drive), Google Play Console, GitHub Pages, and the existing Playwright `test:units` harness.

**Spec:** No separate spec doc. Scoped from the 2026-09-23 conversation that compared a hand-built APK, a TWA and Capacitor Android, and chose **TWA on Google Play**. The deciding reasons: a hand-built APK adds nothing over Chrome's own WebAPK install, and Play is what makes the app discoverable. The sibling iOS plan is `docs/superpowers/plans/2026-11-15-capacitor-ios-setup.md`. Tasks 1–2 here are shared with it (see "Shared with iOS"). Whichever plan runs first does them, and the other skips them.

## Global Constraints

- **Never move the app's origin.** The app stays at `https://jedmangubat.github.io/gainpath/`. The new `jedmangubat.github.io` user-site repo must **never** get a custom domain: that would re-home every project site under it and orphan every user's localStorage workout history (see memory `project-gainpath-website`).
- Android application ID: `me.jedmangubat.gainpath` (matches the iOS bundle ID). It is permanent once uploaded to Play.
- Visual identity is dark-only "Kinetic": base `#0C1512`, accent `#C6F24E`. Theme, background, splash and nav-bar colours are all `#0C1512`.
- No "AI" wording anywhere: store listing, privacy policy, screenshots or release notes (per CLAUDE.md).
- The web app keeps zero build steps. `android-twa/` is additive tooling and never touches what ships in `index.html`.
- The signing keystore and its passwords live only in `secrets/` (gitignored). Never commit, print or echo them. **The user types the keystore passwords into Bubblewrap themselves.** Claude never types passwords (memory `feedback_public_actions_approval_and_secrets`).
- Outward-facing steps need an explicit yes each time: creating the public `jedmangubat.github.io` repo, every `git push`, the Play Console account purchase, agreeing to any Google terms, and any Facebook post recruiting testers.
- Every `index.html` change gets a `CHANGELOG.md` entry dated the day the work is actually done. `npm run lint`, `npm run test:units` and `npm run visual-check` must pass after it.
- GainPath stays free with **no ads** in this plan. Adding ads later changes the Data safety form, the ads declaration and the privacy policy (see "Not covered").

## Review Focus

1. **Offline cold launch with the `?twa=1` query string:** the service worker's navigation fallback must still serve the cached `index.html` when the exact `index.html?twa=1` URL was never cached. Test in Task 3.
2. **A backup restored from an iPhone with `healthSync:true`:** on Android, starting or ending a workout must not fire a `shortcuts://` navigation, which would show an error or nothing. Test in Task 3.
3. **Web users are unaffected:** without `?twa=1`, the Apple Watch sync row still shows and `IS_TWA` is `false`. Test in Task 3.
4. **The Play App Signing key differs from the upload key:** `assetlinks.json` must list **both** SHA-256 fingerprints. Otherwise Play installs show a Chrome URL bar, the tell-tale failed-verification look. Checked by an API query in Task 6 and again in Task 7.
5. **Existing Android users keep their data:** a TWA shares the default browser's storage for the origin. Someone who used GainPath in Chrome sees their history in the Play app, but only if Chrome is their default TWA provider. Manual check in Task 7 (not automatable here).

---

### Task 1: Shared — manifest colours and a 512px maskable icon (skip parts the iOS plan already did)

**Context:** `manifest.json` still has the pre-Kinetic `#EDEBE3` colours, and its largest icon is `logo.png` at 256×256. Bubblewrap and Play both need a **512×512** icon, and Android launchers want a **maskable** icon with the mark inside the central 80% safe zone. iOS plan Task 6 fixes the colours and iOS Task 7 Step 1 creates `images/branding/logo-1024.png`. If those have already landed, skip the matching steps here.

**Files:**
- Modify: `manifest.json`
- Create: `images/branding/logo-1024.png` (only if absent), `images/branding/icon-512.png`, `images/branding/icon-512-maskable.png`
- Modify: `sw.js` (add the two icons to `SHELL_URLS`, bump `CACHE_NAME`)
- Test: `scripts/test_units.mjs`

- [ ] **Step 1: Write the failing test**

In `scripts/test_units.mjs`, just before `await browser.close();` (after the main `const results = await page.evaluate(...)` at ~line 114 has returned), add a manifest check that runs in its own page:

```js
  // ── Manifest is Play/TWA-ready: dark colours, 512 icon + 512 maskable icon ──
  {
    const mp = await browser.newPage();
    await mp.goto(`http://localhost:${PORT}/index.html`);
    const m = await mp.evaluate(async () => {
      const man = await (await fetch('manifest.json')).json();
      const size = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth + 'x' + i.naturalHeight); i.onerror = () => res('missing'); i.src = src; });
      const any512 = man.icons.find(i => i.sizes === '512x512' && (i.purpose || 'any') === 'any');
      const mask512 = man.icons.find(i => i.sizes === '512x512' && i.purpose === 'maskable');
      return {
        bg: man.background_color, theme: man.theme_color,
        any512: any512 ? await size(any512.src) : 'absent',
        mask512: mask512 ? await size(mask512.src) : 'absent'
      };
    });
    results.push({ name: 'manifest is TWA-ready (dark colours, 512 + maskable icons load at 512x512)', pass: JSON.stringify(m) === JSON.stringify({ bg: '#0C1512', theme: '#0C1512', any512: '512x512', mask512: '512x512' }), actual: m, expected: { bg: '#0C1512', theme: '#0C1512', any512: '512x512', mask512: '512x512' } });
    await mp.close();
  }
```

`results` is a `const` array, so `results.push` works.

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm run test:units`
Expected: `FAIL  manifest is TWA-ready …` with actual `bg:"#EDEBE3"` and `any512:"absent"` (or `bg` already `#0C1512` if iOS Task 6 landed).

- [ ] **Step 3: Produce the 1024 master (skip if `images/branding/logo-1024.png` exists)**

Follow iOS plan Task 7 Step 1 exactly. It regenerates the mark at 1024×1024 via `scripts/gen_exercise_image.py`, passing the current `logo.png` as the reference image. That is a **paid** Gemini call (~$0.14). Ask the user before running it. Verify with `sips -g pixelWidth -g pixelHeight -g hasAlpha images/branding/logo-1024.png`: expect 1024, 1024, `hasAlpha: no`.

- [ ] **Step 4: Derive the two 512 icons**

```bash
python3 - <<'EOF'
from PIL import Image
src = Image.open('images/branding/logo-1024.png').convert('RGB')
src.resize((512, 512), Image.LANCZOS).save('images/branding/icon-512.png')
# Maskable: shrink the mark to 72% so it sits inside Android's 80% safe-zone circle, on the brand base.
bg = Image.new('RGB', (512, 512), (0x0C, 0x15, 0x12))
mark = src.resize((368, 368), Image.LANCZOS)
bg.paste(mark, ((512 - 368) // 2, (512 - 368) // 2))
bg.save('images/branding/icon-512-maskable.png')
EOF
```

Visually check the maskable one at https://maskable.app (drag the file in, no upload needed). The whole mark must stay visible under the circle mask.

- [ ] **Step 5: Update `manifest.json`**

Set `background_color` and `theme_color` to `"#0C1512"`, and replace the `icons` array with:

```json
  "icons": [
    { "src": "images/branding/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" },
    { "src": "images/branding/logo.png", "sizes": "256x256", "type": "image/png" },
    { "src": "images/branding/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "images/branding/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
```

- [ ] **Step 6: Precache the new icons**

In `sw.js`, add `'./images/branding/icon-512.png', './images/branding/icon-512-maskable.png',` to `SHELL_URLS` after `logo.png`, and bump `CACHE_NAME` by one (e.g. `gainpath-v40` → `gainpath-v41`; use whatever the current value is plus one).

- [ ] **Step 7: Run everything**

Run: `npm run test:units && npm run lint && npm run visual-check`
Expected: all pass, including the new manifest case.

- [ ] **Step 8: CHANGELOG + commit**

Add under today's date in `CHANGELOG.md`, in a `### Fixed` / `### Added` block matching the file's existing format: manifest colours now match the dark theme, and 512px regular + maskable icons were added for Android installs and the Play build.

```bash
git add manifest.json sw.js images/branding/icon-512.png images/branding/icon-512-maskable.png images/branding/logo-1024.png scripts/test_units.mjs CHANGELOG.md
git commit -m "Add 512px and maskable app icons, fix stale light-theme manifest colours

Android launchers and the Play/TWA build need a 512x512 icon plus a maskable
variant inside the 80% safe zone; the manifest topped out at 256px and still
carried the pre-Kinetic #EDEBE3 colours. test:units now guards both."
```

---

### Task 2: Shared — privacy policy page, linked from Settings → About

**Context:** Play requires a privacy policy URL for every app, and the App Store requires one too, so one page serves both. It lives **in this repo** at `https://jedmangubat.github.io/gainpath/privacy.html` so the app can link to it and it can't drift from the code it describes. The planned `gainpath-site` should link here rather than keep its own copy. The contents below were written from the real code on 2026-09-23:
- analytics: `track()` at `index.html:1368` sends `{id, event}` to the Cloudflare Worker, which stores per-ID event counts plus the first two workout timestamps, with no TTL
- notify-me: the email plus a timestamp go to Worker `/lead`
- feedback: `index.html:16753` sends name, sex, split, experience, subject, message and reply email via EmailJS
- there's no analytics opt-out

**Re-read those three call sites before publishing. If the code changed, the page must change.**

**Files:**
- Create: `privacy.html`
- Modify: `index.html` (About screen button near line 899, plus a `btn_privacy` string in each of the three language blocks next to `btn_full_changelog`, around lines 13414 / 13803 / 14193)
- Test: `scripts/test_units.mjs`

- [ ] **Step 1: The user decides the public contact email**

Ask the user which address should be public. It appears on this page **and** as the Play developer contact. Recommend a dedicated address (e.g. a new Gmail or an iCloud Hide-My-Email alias) rather than their personal one. Use the answer wherever `CONTACT_EMAIL` appears below. **Don't continue until it's chosen.**

- [ ] **Step 2: Write the failing test**

Add next to the Task 1 block in `scripts/test_units.mjs`:

```js
  // ── Privacy policy exists and is reachable from Settings → About ──
  {
    const pp = await browser.newPage();
    await pp.goto(`http://localhost:${PORT}/index.html`);
    const r = await pp.evaluate(async () => {
      const btn = document.querySelector('#s-setabout [data-i18n="btn_privacy"]');
      const res = await fetch('privacy.html');
      const html = res.ok ? await res.text() : '';
      return { button: !!btn, page: res.ok, mentionsEmailJS: html.includes('EmailJS'), mentionsCloudflare: html.includes('Cloudflare'), noAI: !/\bAI\b/.test(html) };
    });
    const exp = { button: true, page: true, mentionsEmailJS: true, mentionsCloudflare: true, noAI: true };
    results.push({ name: 'privacy policy page exists, names its processors, and is linked from About', pass: JSON.stringify(r) === JSON.stringify(exp), actual: r, expected: exp });
    await pp.close();
  }
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `npm run test:units`. Expected: `FAIL … privacy policy …` with `button:false, page:false`.

- [ ] **Step 4: Create `privacy.html`**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GainPath — Privacy Policy</title>
<link rel="icon" href="images/branding/favicon-32.png">
<style>
@font-face{font-family:'Space Grotesk';src:url(fonts/space-grotesk-latin-var.woff2) format('woff2');font-weight:300 700}
@font-face{font-family:'Archivo';src:url(fonts/archivo-latin-var.woff2) format('woff2');font-weight:100 900}
body{margin:0;background:#0C1512;color:#E8EEE9;font:16px/1.65 'Space Grotesk',system-ui,sans-serif}
main{max-width:720px;margin:0 auto;padding:32px 16px 64px}
h1,h2{font-family:'Archivo',sans-serif;text-transform:uppercase;letter-spacing:-.01em}
h1{font-size:28px;font-weight:800;margin:0 0 4px}h2{font-size:17px;font-weight:800;margin:32px 0 8px;color:#C6F24E}
a{color:#C6F24E}.muted{color:#9AA8A0;font-size:14px}ul{padding-left:20px}
</style>
</head>
<body><main>
<h1>Privacy Policy</h1>
<p class="muted">GainPath · Last updated: YYYY-MM-DD (set to the publish date)</p>

<p>GainPath is a free workout tracker made by an individual developer. It has no accounts and no ads. This page covers the web app at jedmangubat.github.io/gainpath and the GainPath apps on Google Play and the App Store, which show the same app.</p>

<h2>Your workouts stay on your device</h2>
<p>Your profile, workouts, sets, personal records, body weight and settings are stored only in your browser's local storage on your device. They are never uploaded to us. Backups you export are files you keep; we never receive them. Clearing the app's site data, or uninstalling and choosing to clear its data, deletes them permanently. Export a backup first if you want to keep them.</p>

<h2>Anonymous usage counts</h2>
<p>To learn whether GainPath is useful, the app sends a small message when you start a session, finish a workout, set a personal record, create a PDF report, export data or save a program. Each message contains only the name of that event and a random ID created on your device. The ID is not linked to your name, email or device identifiers. Our server, run on Cloudflare Workers, stores per-ID counts of these events and the times of your first two completed workouts. It does not store your workout content, your IP address or your location. Because the ID isn't linked to you, we can't look up or delete a record from your name or email.</p>

<h2>Things you choose to send</h2>
<ul>
<li><strong>Launch updates (optional).</strong> If you enter your email under Settings → Native app updates, we store that address and the time you sent it, only to tell you about app releases. Email us to have it deleted.</li>
<li><strong>Feedback (optional).</strong> If you send feedback, your message, subject, optional reply email, and the name, sex, training split and experience level from your profile are sent to us by email through EmailJS, a message-delivery service. We use them only to read and reply to your feedback.</li>
</ul>

<h2>Services that see standard web requests</h2>
<p>Loading the app sends ordinary web requests, which include your IP address, to GitHub Pages (which hosts the app), and to cdnjs.cloudflare.com and cdn.jsdelivr.net (which serve the chart, PDF and email libraries). Their own privacy policies govern those logs. We don't receive them.</p>

<h2>What we don't do</h2>
<ul><li>No advertising and no ad or tracking SDKs.</li><li>We don't sell or share personal data.</li><li>No accounts, and no location, contacts, camera or microphone access.</li></ul>

<h2>Children</h2>
<p>GainPath is intended for users 13 and older and is not directed at children.</p>

<h2>Changes and contact</h2>
<p>If this policy changes, we update this page and its date. Questions or deletion requests: <a href="mailto:CONTACT_EMAIL">CONTACT_EMAIL</a>.</p>
</main></body></html>
```

Replace `YYYY-MM-DD` with the actual publish date in this step. It's a required fill-in, not something to leave for later.

- [ ] **Step 5: Link it from Settings → About**

In `index.html`, directly after the `btn_full_changelog` button in `#s-setabout` (around line 899), add:

```html
    <button type="button" class="bs" style="width:100%;margin-top:8px" onclick="window.open('privacy.html','_blank','noopener')"><i class="ti ti-shield-check" aria-hidden="true"></i> <span data-i18n="btn_privacy">Privacy policy</span></button>
```

(`ti-shield-check` is already in the icon subset, so no re-subsetting is needed.) Add one string after each `"btn_full_changelog"` line in the three language blocks:
- en: `"btn_privacy": "Privacy policy",`
- ja: `"btn_privacy": "プライバシーポリシー",`
- ko: `"btn_privacy": "개인정보 처리방침",`

- [ ] **Step 6: Run everything**

Run: `npm run test:units && npm run lint && npm run visual-check`. Expected: all pass. Also open `privacy.html` in a 390px-wide browser and confirm there's no horizontal scroll.

- [ ] **Step 7: CHANGELOG, README check, commit**

CHANGELOG `### Added`: a privacy policy page, linked from Settings → About, needed for the Play and App Store listings. README: add a one-line "Privacy" link only if the README has a links/footer area; otherwise leave it.

```bash
git add privacy.html index.html scripts/test_units.mjs CHANGELOG.md README.md
git commit -m "Add privacy policy page and link it from Settings → About

Both Google Play and the App Store require a public privacy policy URL.
Written from the actual data flows (anonymous event counts to the
Cloudflare Worker, optional launch-updates email, optional EmailJS
feedback); workouts never leave the device."
```

---

### Task 3: `IS_TWA` — hide iOS-only Apple Watch sync inside the Play build

**Context:** Apple Watch sync works by navigating to `shortcuts://…` (`healthSyncTrigger`, `index.html:13237`), which only exists on iOS. The Play build must hide its Settings row and must never fire the navigation. That matters even when a restored iPhone backup has `healthSync:true`, which is Review Focus #2. Bubblewrap's launch URL carries `?twa=1` (set in Task 5). Chrome also sets an `android-app://` referrer on the first TWA load, which is a second signal. The install banner needs no change: a TWA matches `display-mode: standalone`, so `isStandalone()` already hides it.

**Files:**
- Modify: `index.html`: `IS_TWA` constant next to `APP_VERSION` (~line 1361); `id="menu-watch"` on the Settings button (line 732); one CSS rule inside `<style>` (lines 22–292); guard in `healthSyncTrigger`
- Test: `scripts/test_units.mjs`

- [ ] **Step 1: Write the failing tests**

Add to `scripts/test_units.mjs` next to the Task 1/2 blocks:

```js
  // ── Play build (TWA): Apple Watch sync hidden + never fires; web unaffected; offline launch with ?twa=1 ──
  {
    const seed = { name: 'TWA Test', sex: 'male', setup: true, unit: 'kg', exp: 'intermediate', goal: 'definition', split: 'pplul', freq: 5, warmup: true, wuReps: 12, prefReps: 10, prefRest: 90, prefSets: 3, startingWeights: 'ai', keyLifts: {}, healthSync: true };
    const probe = async (url) => {
      const ctx = await browser.newContext();
      const p = await ctx.newPage();
      const cdp = await ctx.newCDPSession(p);
      const navs = [];
      await cdp.send('Page.enable');
      cdp.on('Page.frameRequestedNavigation', (e) => navs.push(e.url));
      await p.goto(url);
      await p.evaluate((cfg) => localStorage.setItem('gp_cfg', JSON.stringify(cfg)), seed);
      await p.reload();
      await p.waitForSelector('#s-home.active');
      const r = await p.evaluate(() => ({ isTwa: IS_TWA, watchRow: getComputedStyle(document.getElementById('menu-watch')).display !== 'none' }));
      await p.evaluate(() => healthSyncTrigger('start'));
      await p.waitForTimeout(300);
      r.shortcutNav = navs.some(u => u.startsWith('shortcuts:'));
      return { r, ctx, p };
    };
    const web = await probe(`http://localhost:${PORT}/index.html`);
    const webExp = { isTwa: false, watchRow: true, shortcutNav: true };
    results.push({ name: 'web (no ?twa): Watch row visible and healthSync still fires (positive control)', pass: JSON.stringify(web.r) === JSON.stringify(webExp), actual: web.r, expected: webExp });
    await web.ctx.close();

    const twa = await probe(`http://localhost:${PORT}/index.html?twa=1`);
    const twaExp = { isTwa: true, watchRow: false, shortcutNav: false };
    results.push({ name: 'TWA (?twa=1): Watch row hidden and healthSync never navigates, even with healthSync:true restored', pass: JSON.stringify(twa.r) === JSON.stringify(twaExp), actual: twa.r, expected: twaExp });

    // Offline cold launch: the SW has never cached the exact "?twa=1" URL, so it must fall back to ./index.html.
    await twa.p.evaluate(() => navigator.serviceWorker.ready);
    await twa.p.reload(); // page is now SW-controlled and the shell is cached
    await twa.ctx.setOffline(true);
    await twa.p.goto(`http://localhost:${PORT}/index.html?twa=1&cold=1`);
    const offlineOk = await twa.p.waitForSelector('#s-home.active', { timeout: 5000 }).then(() => true).catch(() => false);
    results.push({ name: 'TWA launch URL still boots offline via the service-worker fallback', pass: offlineOk === true, actual: offlineOk, expected: true });
    await twa.ctx.close();
  }
```

- [ ] **Step 2: Run it and confirm it fails the right way**

Run: `npm run test:units`
Expected:
- the **web positive control PASSES** (`shortcutNav: true`), which proves the CDP probe can see `shortcuts:` navigations
- the TWA case fails with a `ReferenceError`/`IS_TWA is not defined` page error, or `isTwa` missing
- the offline case may already pass, since it only exercises existing SW code. That's fine; it's there as a regression guard. If it fails even though `curl`-level reasoning says the fallback should hit, check whether this Playwright version applies `setOffline` to service-worker fetches before changing any app code.

**If the web positive control fails** (`shortcutNav:false`), the probe can't observe custom-scheme navigations in this Chromium build. Stop and report back rather than weakening the test.

- [ ] **Step 3: Implement**

Directly after `const APP_VERSION=…;` (~line 1361) add:

```js
// True inside the Google Play build (a Trusted Web Activity): Bubblewrap launches index.html?twa=1, and Chrome sets an android-app:// referrer on that first load. Used only to hide iOS-only features there.
const IS_TWA=new URLSearchParams(location.search).has('twa')||document.referrer.startsWith('android-app://');
if(IS_TWA)document.documentElement.classList.add('twa');
```

On line 732, add `id="menu-watch"` to the `<button class="day-btn" onclick="ss('setwatch')">` element.

Inside `<style>`, add: `.twa #menu-watch{display:none}`

In `healthSyncTrigger`, change the first line to: `if(!CFG.healthSync||IS_TWA)return;`

- [ ] **Step 4: Run everything**

Run: `npm run test:units && npm run lint && npm run visual-check && npm run chaos`
Expected: all pass. The three new cases PASS.

- [ ] **Step 5: CHANGELOG + commit**

CHANGELOG `### Changed`: in the Android (Google Play) build, the iOS-only Apple Watch sync setting is hidden and never triggers. The web app is unchanged. Fold this and Tasks 1–2 into the next version bump per CLAUDE.md: bump `APP_VERSION`, bump `CACHE_NAME` if it wasn't already bumped since the last release, and leave `WHATS_NEW_VERSION` alone because none of this is headline user-facing news.

```bash
git add index.html scripts/test_units.mjs CHANGELOG.md
git commit -m "Hide iOS-only Apple Watch sync in the Google Play (TWA) build

The Play build launches index.html?twa=1; IS_TWA hides the Settings row and
makes healthSyncTrigger a no-op so a backup restored from an iPhone with
healthSync on can't fire a shortcuts:// navigation on Android. Web behaviour
is unchanged. test:units covers both paths plus offline launch via the
service-worker fallback for the ?twa=1 URL."
```

Then ask "Ready to push — push now?" and, on yes, run the tag + `gh release create` flow per CLAUDE.md. **The live site must include Tasks 1–3 before Task 5**, because Bubblewrap reads the live `manifest.json`.

---

### Task 4: Google Play developer account (user-driven, no repo changes)

**Context:** One-time **US$25** fee, with government-ID verification that can take a few days. **Personal accounts created after Nov 2023 must run a closed test with ≥12 opted-in testers for 14 consecutive days before they can apply for production.** That's the long pole in this plan, so start recruiting testers during this task. Google's Android developer verification (rolling out from late 2026, required even for apps installed outside Play) is covered by the same Play Console identity, so no separate step is needed. Check the current rules on the Play Console help pages at enrollment time, since both requirements have changed before.

- [ ] **Step 1:** The user signs up at https://play.google.com/console/signup as a **Personal** account and pays. Claude doesn't type card details, ID numbers or passwords, and asks before accepting the Developer Distribution Agreement on the user's behalf (it's the user's own click).
- [ ] **Step 2:** Set the public developer name ("GainPath" or the user's name) and the public contact email **from Task 2 Step 1**.
- [ ] **Step 3: Start recruiting 12+ testers** who own Android phones. Create a Google Group (e.g. `gainpath-testers@googlegroups.com`) so testers can be added in one step. Any Facebook Page post asking for testers follows the draft → user approves → `scripts/fb_post.py … --yes` rule.
- [ ] **Step 4: Verify:** the Play Console dashboard loads with "Create app" enabled and identity verification shows as complete.

---

### Task 5: Generate and build the TWA with Bubblewrap

**Context:** Bubblewrap reads the **live** manifest and asks a series of questions. On first run it offers to download JDK 17 and the Android SDK into `~/.bubblewrap` (a few GB on the internal drive, which had 39Gi free on 2026-09-23). Accept. If Gradle fails on the exFAT SSD with file-lock/permission errors, move `android-twa/` to the internal drive for building and copy back only `twa-manifest.json`.

**Files:**
- Create: `android-twa/` (Bubblewrap project; commit it)
- Create: `secrets/gainpath-upload.keystore` (gitignored; **never commit**)
- Modify: `.gitignore` (add `android-twa/app/build/`, `android-twa/.gradle/`, `android-twa/*.aab`, `android-twa/*.apk`, `android-twa/*.idsig`)

- [ ] **Step 1: Init**

```bash
mkdir -p android-twa && cd android-twa
npx @bubblewrap/cli init --manifest https://jedmangubat.github.io/gainpath/manifest.json
```

Answers:

| Prompt | Answer |
|---|---|
| Domain | `jedmangubat.github.io` |
| URL path / start URL | `/gainpath/index.html?twa=1` |
| Application name | `GainPath — Workout Tracker` |
| Short name | `GainPath` |
| Application ID | `me.jedmangubat.gainpath` |
| Display mode | `standalone` |
| Orientation | `portrait` |
| Status bar / nav bar / splash bg colour | `#0C1512` |
| Icon URL | `https://jedmangubat.github.io/gainpath/images/branding/icon-512.png` |
| Maskable icon URL | `https://jedmangubat.github.io/gainpath/images/branding/icon-512-maskable.png` |
| Monochrome icon | skip |
| Include app shortcuts | No |
| Play Billing | No |
| Location delegation | No |
| **Notification delegation** | **Yes** (lets the rest-timer web notification show as a GainPath app notification; Android 13+ asks for permission at runtime) |
| Key store location | `../secrets/gainpath-upload.keystore` |
| Key name | `upload` |
| Passwords | **the user types these**; they save them in their password manager, never in a repo file |

- [ ] **Step 2: Check the target API level**

Run: `grep -n "targetSdkVersion\|compileSdkVersion" app/build.gradle`
Compare against Play's current requirement at https://developer.android.com/google/play/requirements/target-sdk. If it's lower, update Bubblewrap (`npx @bubblewrap/cli@latest update`) rather than hand-editing.

- [ ] **Step 3: Build**

```bash
npx @bubblewrap/cli build
```

Expected: `app-release-bundle.aab` (upload to Play) and `app-release-signed.apk` (for sideload testing) in `android-twa/`. The user types the keystore passwords when prompted.

- [ ] **Step 4: Record the upload-key fingerprint**

```bash
npx @bubblewrap/cli fingerprint list
```

Note the SHA-256. It's public information, safe to put in `assetlinks.json` and chat.

- [ ] **Step 5: Back up the keystore**

The user copies `secrets/gainpath-upload.keystore` to a second place they control (e.g. an encrypted note or password-manager attachment). Losing it is recoverable through Play's upload-key reset, but that takes days.

- [ ] **Step 6: Commit (without secrets)**

Run `git status` and confirm no `.keystore`, `.aab`, `.apk` or `build/` paths are staged. Then:

```bash
git add .gitignore android-twa
git commit -m "Add Bubblewrap TWA project for the Google Play build

Wraps https://jedmangubat.github.io/gainpath/index.html?twa=1 as
me.jedmangubat.gainpath with dark Kinetic colours and notification
delegation. Signing keystore lives in gitignored secrets/."
```

---

### Task 6: Digital Asset Links on the origin root

**Context:** Chrome only shows the TWA full-screen if `https://jedmangubat.github.io/.well-known/assetlinks.json` lists the app's signing fingerprints. The app is a *project* site, so the origin root belongs to a *user* site repo named exactly `jedmangubat.github.io`, which doesn't exist yet. GitHub Pages runs Jekyll by default, and **Jekyll skips dot-folders like `.well-known`**, so the repo needs a `.nojekyll` file. **No custom domain on this repo, ever** (Global Constraints).

**Files (in a new local folder `03 Projects/jedmangubat.github.io/`, its own repo):**
- Create: `.nojekyll`, `.well-known/assetlinks.json`, `index.html` (a one-line redirect to `/gainpath/`), `CLAUDE.md` (stating the no-custom-domain rule)

- [ ] **Step 1: Ask the user before creating the public GitHub repo `jedmangubat.github.io`.** On yes:

```bash
cd "/Volumes/EngrJed SSD/03 Projects" && mkdir jedmangubat.github.io && cd jedmangubat.github.io
git init && git config core.fileMode false   # exFAT, per the SSD CLAUDE.md
touch .nojekyll && mkdir .well-known
printf '<!DOCTYPE html><meta http-equiv="refresh" content="0;url=/gainpath/">\n' > index.html
cd "../GainPath/android-twa" && npx @bubblewrap/cli generateAssetLinks --output="../../jedmangubat.github.io/.well-known/assetlinks.json"
```

Write `CLAUDE.md` in that folder with this content: "User site for jedmangubat.github.io. Exists only to serve `/.well-known/assetlinks.json` for the GainPath Play app (TWA trust). NEVER add a custom domain here — it would move every project site, including the GainPath app, to a new origin and orphan all users' local workout data. `.nojekyll` must stay or Pages drops `.well-known/`." Also add `03 Projects/jedmangubat.github.io/` to the Projects list in `/Volumes/EngrJed SSD/CLAUDE.md`.

- [ ] **Step 2: Publish.** Commit, then `gh repo create jedmangubat/jedmangubat.github.io --public --source=. --push` (this is the push the user approved in Step 1). Enable Pages from the `main` branch root if `gh` didn't.

- [ ] **Step 3: Verify it's served**

```bash
curl -sI https://jedmangubat.github.io/.well-known/assetlinks.json | head -3
curl -s "https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://jedmangubat.github.io&relation=delegate_permission/common.handle_all_urls"
```

Expected: `HTTP/2 200` with `content-type: application/json`, and the API response lists `me.jedmangubat.gainpath` with the upload-key SHA-256 from Task 5 Step 4. Also confirm `https://jedmangubat.github.io/gainpath/` still loads the app unchanged.

---

### Task 7: Play Console — app record, policy forms, listing, closed test

**Context:** This is where all the legal/policy declarations get filed. Play generates its own **app signing key** when the first AAB is uploaded (Play App Signing). Its SHA-256 **must be added to `assetlinks.json`**, or Play-installed copies show a URL bar (Review Focus #4).

**Files:**
- Create: `scripts/.store/` outputs via a throwaway Playwright script (add `scripts/.store/` to `.gitignore`)
- Modify: `jedmangubat.github.io/.well-known/assetlinks.json`

- [ ] **Step 1: Create the app** in Play Console: name "GainPath — Workout Tracker", default language English (US), App (not game), Free.

- [ ] **Step 2: App content forms.** Fill in:

| Form | Answer |
|---|---|
| Privacy policy | `https://jedmangubat.github.io/gainpath/privacy.html` |
| Ads | No, the app doesn't contain ads |
| App access | All functionality is available without special access (no login) |
| Content rating (IARC) | Fitness/utility; no violence, no user-to-user interaction, no gambling. Expect Everyone / PEGI 3 |
| Target audience | **13–15, 16–17, 18+** (don't select any under-13 band, which would trigger the Families policy) |
| News app | No |
| Health apps declaration | Fitness / activity tracking; not a medical device; no Health Connect |
| Government app / financial features | No / none |
| Data safety: data collected | **Device or other IDs** (anonymous ID): collected, not shared, Analytics, required. **App activity → App interactions** (event counts): collected, Analytics, required. **Personal info → Email address**: optional; purposes Developer communications (notify-me) and App functionality (feedback reply). **Personal info → Name**, **Personal info → Other info** (sex), **Health & fitness → Fitness info** (split, experience), **App activity → Other user-generated content** (feedback message): all optional, App functionality |
| Data safety: sharing | None (EmailJS and Cloudflare process on our behalf, which Play doesn't count as sharing) |
| Data safety: security | Encrypted in transit: Yes. Users can request deletion: Yes (email from the privacy policy). No account creation, so no account-deletion URL is needed |

**Re-check each Data safety line against Task 2's code references at submission time.**

- [ ] **Step 3: Store listing assets.** Write a throwaway Playwright script in the scratchpad (seed localStorage the way `capture_tutorial.mjs` does, including `gp_a2hs_dismissed:'true'` and a recent `gp_last_export`, with a neutral seed name, not "Jed"). Capture **4–8 phone screenshots at 1080×1920** (viewport 360×640 @3x: Train, active workout, Climb chart, PRs/badges) into `scripts/.store/`. The existing README screenshots are 780×1688, which breaks Play's 2:1 maximum aspect ratio. Also render a **1024×500 feature graphic** in HTML (the same HTML → Playwright approach as the Facebook post graphics). Use the 512 icon from Task 1. Wait ≥300ms after each screen transition before capturing (per CLAUDE.md).

- [ ] **Step 4: Listing copy.** Short description (≤80 chars) and full description (≤4000), written from README `## Features`. No "AI", no invented ratings or download counts, no "#1"/"best" claims (Play's metadata policy). Run the copy through the `humanizer` skill, show it to the user, and get approval.

- [ ] **Step 5: Upload to Internal testing first.** Upload `android-twa/app-release-bundle.aab`. Opt in to Play App Signing (the default). Then copy the **App signing key SHA-256** from Play Console → Test and release → App integrity:

```bash
cd android-twa && npx @bubblewrap/cli fingerprint add <PLAY_APP_SIGNING_SHA256> --name=play
npx @bubblewrap/cli generateAssetLinks --output="../../jedmangubat.github.io/.well-known/assetlinks.json"
```

Commit and push the user-site repo (ask first). Re-run the Task 6 Step 3 API query: expect **two** fingerprints.

- [ ] **Step 6: Device check** (the user, or the emulator: `~/.bubblewrap/android_sdk` has `emulator`; heavy on 8GB RAM, so close other apps). Install from the internal-testing link and confirm:
  - (a) no URL bar
  - (b) dark splash and dark status/nav bars
  - (c) log a set → kill the app → relaunch → the set is still there
  - (d) the rest timer fires a notification when backgrounded, after granting the Android 13+ permission
  - (e) airplane mode → cold launch still works
  - (f) Settings has no Apple Watch row, and About → Privacy policy opens
  - (g) on a phone that already used GainPath in Chrome, existing history appears (Review Focus #5)

- [ ] **Step 7: Closed testing track.** Promote the build to a Closed test and add the Task 4 Google Group. **The 14-day clock starts when ≥12 testers have opted in.** Ask testers to open the app on several different days. Google's production questionnaire asks about tester engagement.

---

### Task 8: Production release and docs

- [ ] **Step 1: Apply for production access** in Play Console after 14 days with ≥12 testers. Answer the questionnaire honestly: what testers did, what feedback changed, and why the app is ready. Review typically takes up to about a week.
- [ ] **Step 2: Production release.** Pick countries (at least the Philippines, Japan and South Korea to match the app's languages, or all countries). Use a staged rollout if Play offers it.
- [ ] **Step 3: Update docs in one commit:**
  - **README:** add a "Get it on Google Play" link/badge in the install section, plus a `## ✨ What's new` bullet ("GainPath is now on Google Play") if this ships alongside a version bump, per the README rules
  - **CHANGELOG** entry
  - **CLAUDE.md**, a new standing-convention bullet covering:
    - the Play build is a TWA (`android-twa/`, launch URL `?twa=1`, `IS_TWA`)
    - web pushes update it automatically; only manifest/icon/colour changes need `npx @bubblewrap/cli update && build` with a bumped `appVersionCode`
    - the keystore lives in `secrets/`
    - `assetlinks.json` lives in the `jedmangubat.github.io` repo and must list both fingerprints
    - that repo must never get a custom domain
    - Data safety and `privacy.html` must be updated in the same pass as any new data flow
- [ ] **Step 4:** Commit, then ask "Ready to push — push now?"

---

## Shared with iOS

| Item | This plan | iOS plan |
|---|---|---|
| Manifest colours | Task 1 | Task 6 |
| 1024 master icon | Task 1 Step 3 | Task 7 Step 1 |
| Privacy policy page | Task 2 | Listed as "not covered", which this closes |
| Public contact email | Task 2 Step 1 | Needed for App Store Connect too |

## What this plan deliberately does not cover

- **Ads, affiliate links or sponsorships.** Any of these flips the Play "Contains ads" declaration and Data safety answers, rewrites `privacy.html`, and (for ad SDKs) needs a consent flow. It gets a separate plan if pursued.
- **An analytics opt-out toggle.** Not required by Play for anonymous counts, but a cheap trust win later. If it's added, update the privacy policy and Data safety answers.
- **Health Connect** (the Android counterpart to Apple Watch sync). It needs its own Play permission declaration and review.
- **Tutorial step 12's copy**, which mentions Apple Watch. Harmless on Android. Revisit if Health Connect lands.
- **Localized Play listings (ja/ko).** Worth adding once the English listing is approved.
- **Capacitor Android.** Only if the Play build later needs native-only APIs a TWA can't reach.
