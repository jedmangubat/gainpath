# Manual checks still needed (Phase 3)

Automated coverage (`npm run test:a11y`, `visual-check`, the ja/ko checks) can't
replace these. None of them has been done; they need a person and a device.

## VoiceOver on a real iPhone (installed PWA and in Safari)
- [ ] Train tab: swipe through a workout. Each set announces its set name with
      weight, reps, log and remove (for example "Set 2: weight (kg)").
- [ ] Open and close each sheet (cancel workout, exercise "?" info, badge,
      What's New, photo viewer): the name is read, background content is not
      reachable, closing returns to the control you used.
- [ ] Rest screen: the status is read once when the rest starts and the
      countdown is **not** read every second.
- [ ] Settings toggles are announced as switches with on/off.
- [ ] Failed save alert and the unreadable-data sheet are announced.
- [ ] Repeat in Japanese and Korean (Settings → language).

## Layout
- [ ] 200% text size (Settings → Display & Brightness → Text Size → Larger
      Accessibility Sizes): set rows, sheets and Settings stay usable and
      scroll; nothing is cut off with no way to reach it.
- [ ] Smallest iPhone width (320-360px) in all three languages: the set row
      still fits on one line.
- [ ] Landscape: sheets still scroll to their buttons.

## Keyboard
- [ ] With an external keyboard (or Full Keyboard Access): Tab reaches every
      control on Home, Days, Climb and PRs; Enter/Space opens PR groups and
      session cards; Escape closes sheets.

## Install and offline
- [ ] Installed to Home Screen, airplane mode: the app opens, a workout can be
      logged, charts and the PDF report work (the libraries are precached when the
      service worker installs).
