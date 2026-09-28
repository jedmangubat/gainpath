# index.html section map

Snapshot of `index.html` at v2.9.0 (commit after 6c5dc8b): 17,212 lines,
1.27 MB. Line numbers drift with every edit, so re-run the commands at the
bottom before relying on them.

## Top level

| Lines | Block | Size |
|---|---|---|
| 1–34 | `<head>`: meta/SEO/OG tags, JSON-LD, three CDN scripts (Chart.js, jsPDF, EmailJS) | — |
| 35–309 | `<style>`: the whole Kinetic theme, set-row width budget media queries | ~275 lines |
| 311–1289 | Static screen markup (`.screen` divs, sheets, onboarding, tutorial); 181 inline `on*=""` handlers | ~980 lines |
| 1290–17211 | The one inline `<script>` | ~15,900 lines |

## Inside the script

| Lines | Section | Owns | Depends on |
|---|---|---|---|
| 1290–1352 | Boot constants, analytics, What's New | `APP_VERSION`, `ANALYTICS_ENDPOINT`, `track()`, `WHATS_NEW_*`, `cmpVer` | `CFG`, `t()`, `lsSave` (called later, not at load) |
| 1353–1368 | Splits and machine keys | `SPLITS`, `SPLIT_FREQ`, `MACHINE_EX`, `mwKey`, `migrateMW` | `ST.mw` |
| 1369–1775 | Exercise database | `EX` (per-day built-in exercises), `getDayExercises`, `getEffectiveDayExercises`, day names ja/ko | `CFG.customDays/dayPlan`, `EXPOOL` |
| 1776–1807 | Exercise pool | `EXPOOL` (**let**), `EXPOOL_F`, `equipRank`, `buildExercisePool()`, **runs at load** | `EX` |
| 1808–13149 | **Exercise text data, 831 KB (66% of the file)** | `EX_TIPS` (+ `_JA`, `_KO`), `EX_NAMES_JA/KO`, `EX_INSTRUCTIONS` (+ `_JA`, `_KO`), `tipsFor`, `instructionsFor` | `CFG.lang` |
| 13151–13201 | State | `CFG` and `ST` (both **let**, reassigned by `load`/restore), hold timer, wake lock, Apple Watch trigger, `OB`, `load()` | storage, `IDB` |
| 13203–14401 | i18n | `STRINGS` en/ja/ko (~1,170 lines), `t()`, `applyLang`, `setLang` | `CFG.lang` |
| 14402–14442 | Migrations and saving | `migrate*`, `mergeCustomExercises`, `saveFailed/saveOK`, `lsSave`, `saveCFG`, `saveData` | `IDB` mirror |
| 14443–14581 | IndexedDB mirror and in-progress workout | `idbInit/Verify/Recover/Clear`, `saveInProgress`, `restoreInProgress` | `CFG`, `ST`, `lsSnapshot` |
| 14582–14629 | Date and DOM helpers, navigation | `dkey`, `dkDay`, `dayLabel`, `timeAxis`, `esc`, `jsArg`, `gid`, `ss()` | `refreshHome` and the other screen renderers |
| 14630–14666 | Audio and timers | `ensureAudio`, `beep`, rest countdown, notifications | `ST.rt/restEnd` |
| 14667–14776 | Onboarding | `setSex/Unit/Exp/Freq`, rep presets, `renderSplitOpts`, `obNext/Back/Finish` | `OB`, `CFG`, `SPLITS` |
| 14777–14815 | Tutorial | `TUT_TOTAL`, `TUT` (**let**), `tut*` | static tutorial markup |
| 14816–15266 | **GAINPATH MATH** (DOM-free, unit-tested) | `buildSets`, `carriedWeight`, `breakSuggest`, `LIFT_REL`, `liftEstimate`, `getAIEstimatedWeight`, `suggestWeight`, `e1rm`, `convertUnitData`, `roundToGymWeight`, `calcPlates` | `CFG`, `ST`, `EX`, `EXPOOL`, `equipRank`, `mwKey`, `dkey`, `dkDay` |
| 15267–15356 | Suggestion chips, history, session editor | `applySuggest`, `recomputePRs`, `renderExHistory`, `openSession`, `saveSessionEdit`, `deleteSession` | math, `recomputeBadges`, save |
| 15357–15499 | Calendar, streaks, rest days, tabs | `renderCal`, `weekTarget`, `streakEndingAt`, `stab`, `bnav`, `goHome` | `ST.history`, `CFG` |
| 15500–15628 | Badges | `BADGES`, `BDG_GLYPH`, `badgeSvg`, `recomputeBadges`, `renderBadges` | streak helpers, `ST.bw` |
| 15629–15653 | Home render | `refreshHome` | streaks, banners, day list |
| 15654–15783 | Settings | `openSettings`, gym inventory, machine weights, `setSetting*`, lead email, Privacy, `resetApp` | save, `convertUnits`, `idbClear` |
| 15784–15839 | Custom program builder | `openProgramBuilder`, `saveProgram` | `CFG.customDays`, day edit |
| 15840–16181 | Day edit and swap | `openDayEdit`, `openMidWorkoutEdit`, `commitDayEdit`, `closeDayEdit`, drag/swipe, `openSwap` | `CFG.customDays/dayLinks/dayPlan`, `ST.sd`, `buildSets` |
| 16182–16230 | Custom exercises | `openCustomEx`, `saveCustomEx`, `deleteCustomExercise` | `EXPOOL`, `CFG.customExercises` |
| 16231–16340 | Start workout, plate calculator, machine weights | `startDay`, `convertUnits`, `renderPlateCalc`, `renderMWScreen`, `exImgFallback` | math, `ST` |
| 16341–16708 | Workout screen | `renderEx`, `updSet`, `chkPR`, supersets, `startRest`, RIR sheet, `finishWo`, `submitFeel`, `shareSessionCard` | nearly everything above |
| 16709–16950 | Climb tab and PRs | `initChart`, `chSeg`, `chWindow`, `weeklyMGVolume`, body weight log, `drawChart`, `renderPRs` | Chart.js (lazy), `timeAxis`, `exHistory` |
| 16951–16990 | PDF report | `genPDF` | jsPDF (lazy) |
| 16991–17168 | Data safety and Home banners | `exportData`, `validateBackup`, `applyBackup`, `undoRestore`, `renderHomeBanners`, nudges, iOS warning | save, `recomputePRs/Badges`, `idbClear` |
| 17169–17200 | Feedback | `sendFeedback` | EmailJS (guarded) |
| 17201–17211 | **Boot**: `load()`, `idbInit()`, theme/lang, restore-in-progress or `refreshHome`, service worker registration | everything |

## Coupling facts that matter for a split

- **Everything is one shared global scope.** There are 463 top-level
  declarations, and every section reads `CFG`, `ST`, `t()` and `gid()` freely.
- **271 inline handlers** (181 in static markup, 90 built inside JS strings)
  call **154 distinct top-level functions by bare name**.
- **13 top-level `let` bindings are reassigned** (`CFG`, `ST`, `OB`, `TUT`,
  `IDB`, `SAVE_FAILED`, `HOLD_TIMER`, `wakeLockSentinel`, `_actx`, …), about
  20 sites in all, from several different sections.
- **The tests reach in by bare name.** `test:units` alone has about 340 bare
  `CFG.`/`ST.` references inside `page.evaluate`, plus direct calls to math
  and UI functions. `simulate`, `test:data`, `visual-check`, `chaos` and
  `capture:tutorial` do the same.
- **Code that runs at load:** `emailjs.init` (guarded), `buildExercisePool()`,
  two `visibilitychange` listeners, the boot block, and the service worker
  registration. Everything else is declarations.

## Regenerate

```sh
grep -n "// ═══" index.html                      # section markers
awk 'NR>1290 && /^(async )?function |^(const|let|var) /' index.html   # declarations
awk 'NR>1290 && /^[A-Za-z_$(\[;!]/ && !/^(async )?function |^(const|let|var) /' index.html  # load-time statements
```
