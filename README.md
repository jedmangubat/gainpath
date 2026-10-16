# GainPath — Workout Tracker

**A free workout tracker that suggests your next weight and keeps every workout on your phone.** No account, no ads, no subscription.

🔗 **[Open the app](https://jedmangubat.github.io/gainpath)** · [Lifting guides](https://jedmangubat.github.io/gainpath/guides/) · [Privacy](https://jedmangubat.github.io/gainpath/privacy.html) · [Changelog](CHANGELOG.md)

If it's been useful to you, consider [☕ supporting development via PayPal](https://www.paypal.com/donate/?business=jed.mangubat@me.com).

<img src="images/screenshots/onboarding.png" width="200" alt="First-run setup — language, first name and sex"> <img src="images/screenshots/home.png" width="200" alt="Train tab — pick a day from your split"> <img src="images/screenshots/rest-timer.png" width="200" alt="Rest timer with a form cue and the next set's target"> <img src="images/screenshots/progress.png" width="200" alt="Climb tab — estimated 1RM chart for a lift">

---

## ✨ What's new in v2.10.0

- **Over 1,000 exercises.** 838 new ones for kettlebell, dumbbell, barbell, cable, machine, landmine, weight plate and bodyweight, each with a three-panel illustration, form cues and steps in English, Japanese and Korean.
- **Clearer exercise names.** 118 built-in exercises now use equipment-first names ("Barbell bench press", "Machine pulldown"). Your history, PRs and custom days move to the new names automatically.
- **Kettlebells in My gym.** Tick the kettlebells you own and suggested weights snap to them, separately from your dumbbells.
- **Catch up after time away from a lift.** Come back to a lift after 4 weeks or more and, if your related lifts went up, you're offered a higher weight. It's still a tap to apply or dismiss.
- **Lighter images.** New exercise pictures are about 50 KB each and download the first time you open them, so open the ones you need before training offline.

## Features

**Training**
- Five built-in splits: PPL / Upper-Lower, Bro Split, Alternating Legs/Push/Pull, Upper / Lower, Full Body. You can also build your own program.
- Edit any day before or during a workout: reorder, swap, add or delete exercises, and link supersets and circuits.
- A 1,059-exercise library, each with an illustrated guide, form cues and step-by-step instructions.
- Custom exercises for anything not in the library.

**Weights**
- Starting weights are estimated from your related lifts or, before you've logged any, from your body weight, sex and experience.
- After each exercise you rate how many reps you had left, and the app suggests your next weight. It's always a tap to apply or dismiss, never an automatic change.
- It suggests easing back after a break and offers a deload when you stall.
- Every proposed weight snaps to the plates, dumbbells and kettlebells your gym has (Settings → My gym).
- Plate calculator, machine base weights, warm-up sets, and straight or pyramid sets.
- Switch between kg and lbs anytime. Switching back restores your exact numbers.

**During a workout**
- One-tap set logging, with steppers to adjust the weight.
- Rest timer with sound, vibration, form tips and a preview of the next set.
- Hold timers for planks and carries, drop sets, notes that remind you next time, and a keep-screen-awake option.

**Progress**
- Charts of estimated 1RM, top weight and volume, plus muscle-group balance and body weight.
- Automatic PRs with their full history, and 16 achievement badges.
- Dated progress photos on Climb → Body. They stay on your phone and aren't in backups, so save the ones you want to keep to your photo library.
- A workout calendar that lets you edit or delete past sessions.
- A weekly streak that pauses for planned rest.
- A monthly PDF report and a shareable session card.

**Your data**
- Everything is stored on your device, with a second verified copy in IndexedDB.
- A failed save shows an alert with a one-tap backup, and iPhone Safari users are warned about its 7-day data wipe and how to avoid it.
- JSON and CSV export, backup to Files or iCloud Drive, restore on any device with undo, and backup reminders you can schedule.
- Settings → Privacy lists exactly what leaves your device. Your workouts never do.
- English, 日本語 and 한국어.
- Optional Apple Watch workout start and end through Shortcuts (may not work on iOS 27).

## Getting started

1. Open [jedmangubat.github.io/gainpath](https://jedmangubat.github.io/gainpath).
2. Answer three quick setup screens.
3. Pick a day, log your sets, and finish.

**On iPhone, add it to your Home Screen:** in Safari tap Share → **Add to Home Screen** → **Add**. Safari deletes a website's data after 7 days without a visit, but an installed app is exempt. Your existing workouts carry over.

## Tech

Plain HTML, CSS and JavaScript (`index.html` plus `js/`) with no framework, no build step and no backend. It uses [Chart.js](https://chartjs.org), [jsPDF](https://parall.ax/products/jspdf) and [EmailJS](https://emailjs.com) for feedback (self-hosted in `vendor/` and loaded only when needed), and self-hosted [Tabler Icons](https://tabler.io/icons).

## Contributing

Found a bug or have an idea? Use Settings → Send feedback in the app, or open an issue.

## License

MIT
