# GainPath — AI Workout Tracker

A free, open-source AI-powered workout tracking web app. No account needed, no subscriptions, no ads. Just open it and train.

🔗 **Live app:** [jedmangubat.github.io/gainpath](https://jedmangubat.github.io/gainpath)

---

## Features

### 🤖 AI coaching
- Per-set feedback after every rest — assesses your performance and tells you whether to increase, keep, or decrease weight
- Per-exercise RPE rating (Too easy / Just right / Hard / Too much) with instant one-line next-session recommendation
- Overall session feel rating before summary
- End-of-session AI weight recommendations for every exercise, factoring in RPE, session feel, and previous session data

### 🏋️ Training splits
Five split types to choose from:
- **PPL / Upper-Lower** — Push, Pull, Legs, Upper, Lower (5-day)
- **5-Day Bro Split** — Legs, Chest, Back, Shoulders, Arms (one muscle group per day)
- **Alternating Legs/Push/Pull** — Legs A, Push, Legs B, Pull (rotating 4-day)
- **Upper / Lower** — Upper, Lower A (Legs), Lower B (rotating)
- **Full Body** — 9-exercise full-body session

### 📋 Smart onboarding
- Name, sex (male/female), body weight, height, body fat %
- Strength baseline — recent weights on key lifts (hack squat, chest press, lat pulldown, overhead press)
- Experience level and fitness goal
- Training frequency → app suggests the right split
- Preferred reps, sets, rest time, warm-up set preferences
- Starting weight method — AI estimate or manual entry

### ⚖️ Smart weight system
- AI estimates starting weights from your body stats, experience level, and strength baseline
- Machine tare weight system — enter the base weight of plate-loaded machines once, saved permanently. The app shows plate weight only and calculates total automatically
- Warm-up sets on the first exercise per muscle group only, at 50% of working weight

### ⏱️ Rest timer
- Automatic rest timer after each set
- Adjustable with +15s / -15s buttons
- Color changes: orange at 30s, red at 10s
- Shorter timer for warm-up sets

### 📈 Progress tracking
- Progress charts — max weight per exercise over time
- Personal record (PR) tracker — auto-detects new PRs, celebrates on screen
- Streak counter — consecutive training days
- Session history

### 📄 Monthly PDF report
- Color-coded training calendar
- Session stats (total sessions, sets, new PRs, streak)
- Bar chart of sessions by day type
- Strength gains table
- New personal records list

### 💾 Data backup
- Export all your data as a JSON file
- Restore from backup on any device
- No cloud account needed

### 💬 Feedback
- Built-in feedback form for bug reports, feature requests, and general feedback

---

## How to use

1. Open the app at [jedmangubat.github.io/gainpath](https://jedmangubat.github.io/gainpath)
2. Complete the one-time setup (takes about 2 minutes)
3. Pick your training day and start logging sets
4. Rate how each exercise felt — AI adjusts your next weights automatically
5. On iPhone: tap Share → **Add to Home Screen** for a native app experience

---

## Male workout plans

### PPL / Upper-Lower
| Day | Exercises |
|---|---|
| Push | Incline barbell chest press, Bench dumbbell chest press, Dumbbell fly, Seated dumbbell shoulder press, Dumbbell lateral raise, Triceps pushdown, Cable rope tricep extension |
| Pull | Lat pulldown, Reverse grip pulldown, Cable row, Cable face pull, Dumbbell reverse fly, Dumbbell bicep curl, Hammer curls |
| Legs | Machine seated crunch, Vertical leg raise, Plate-loaded standing calf raise, Hack squat, Lying hamstring curl, Dumbbell lunge, Machine adduction |
| Upper | Incline barbell chest press, Lat pulldown, Seated dumbbell shoulder press, Cable face pull, Dumbbell reverse fly, Triceps pushdown, Dumbbell bicep curl |
| Lower | Machine seated crunch, Vertical leg raise, Hack squat, Lying hamstring curl, Dumbbell lunge, Machine abduction |

### 5-Day Bro Split
| Day | Exercises |
|---|---|
| Legs | Machine seated crunch, Vertical leg raise, Plate-loaded standing calf raise, Hack squat, Lying hamstring curl, Dumbbell lunge |
| Chest | Incline barbell chest press, Bench dumbbell chest press, Dumbbell fly, Dumbbell pullover |
| Back | Lat pulldown, Reverse grip pulldown, Cable row, Straight arm cable pulldown |
| Shoulders | Seated dumbbell shoulder press, Dumbbell lateral raise, Cable face pull, Dumbbell front raise, Machine rear delt fly |
| Arms | Triceps pushdown, Dumbbell bicep curl, Cable rope tricep extension, Hammer curls, Overhead cable tricep extension, Cable bicep curl |

### Alternating Legs/Push/Pull
| Rotation | Exercises |
|---|---|
| Day 1 — Legs A | Same as PPL Legs day |
| Day 2 — Push | Same as PPL Push day |
| Day 3 — Legs B | Same as PPL Lower day |
| Day 4 — Pull | Same as PPL Pull day |

### Upper / Lower
| Day | Exercises |
|---|---|
| Upper | Incline barbell chest press, Lat pulldown, Seated dumbbell shoulder press, Cable face pull, Dumbbell reverse fly, Triceps pushdown, Dumbbell bicep curl |
| Lower A | Same as PPL Legs day |
| Lower B | Same as PPL Lower day |

### Full Body
Machine seated crunch, Hack squat, Lying hamstring curl, Plate-loaded standing calf raise, Incline barbell chest press, Lat pulldown, Seated dumbbell shoulder press, Triceps pushdown, Dumbbell bicep curl

---

## Female workout plans

### PPL / Upper-Lower
| Day | Exercises |
|---|---|
| Push | Incline bench dumbbell press, Bench dumbbell press, Seated dumbbell shoulder press, Dumbbell lateral raise, Dumbbell skull crusher, Single-arm dumbbell overhead tricep extension |
| Pull | Lat pulldown, Cable row, Cable face pull, Dumbbell shrug, Dumbbell bicep curl, Hammer curls |
| Legs | Decline sit-ups, Leg raise, Leg press calf raise, Leg press, Lying hamstring curl, Dumbbell lunge, Machine adduction |
| Upper | Bench dumbbell press, Lat pulldown, Seated dumbbell shoulder press, Cable face pull, Dumbbell skull crusher, Dumbbell bicep curl |
| Lower | Decline sit-ups, Leg raise, Leg press, Lying hamstring curl, Dumbbell lunge, Machine abduction |

*More female split types coming soon.*

---

## Add to iPhone home screen

1. Open [jedmangubat.github.io/gainpath](https://jedmangubat.github.io/gainpath) in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add**

The app will appear on your home screen and open full-screen like a native app. Your workout data is saved in Safari's local storage.

> **Tip:** Export a backup regularly from the Export tab to protect your data.

---

## Tech stack

- Single HTML file — no framework, no build step, no backend
- AI coaching powered by [Claude](https://anthropic.com) (claude-sonnet-4-6)
- Charts via [Chart.js](https://chartjs.org)
- PDF export via [jsPDF](https://parall.ax/products/jspdf)
- Feedback via [EmailJS](https://emailjs.com)
- Data stored in browser localStorage

---

## Contributing

Found a bug or have a feature idea? Use the feedback form inside the app (Settings → Send feedback) or open an issue on this repo.

---

## Support

GainPath is free, ad-free, and has no subscriptions. If it's been useful to you, consider supporting development:

[☕ Donate via PayPal](https://www.paypal.com/donate/?business=jed.mangubat@me.com)

---

## License

MIT — free to use, modify, and share.
