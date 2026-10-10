# MuscleWiki dumbbell group: plan

Status: **planned, not started.** No images generated, no prompts staged, no
exercises added. Written 2026-10-05 after the kettlebell group (164 exercises)
was finished. Nothing from the MuscleWiki work is committed yet; it all goes in
as one piece when every included group is in the app.

The per-exercise decision is in `docs/musclewiki-dumbbell-plan.csv`
(`plan` = generate / verify / hold / drop, with the reason).

## Scope

MuscleWiki lists 259 dumbbell exercises the app doesn't have.

| Plan | Count | What it means |
|---|---|---|
| generate | 196 | Movement is clear from the name. Write the prompt, generate, add. |
| verify | 38 | Look the movement up on MuscleWiki first, then treat as generate. 14 are the "bench braced" curl family; the rest are one-offs (Bayesian lateral raise, skullover, six-way lateral raise, lawnmower row, offset squat, service exercise...). |
| hold | 17 | 9 unclear from the name (the same nine names were held for kettlebells: quad stomp, swing lunge, superman x2, tricep guillotine press x2, somersault squat, waiters bow x2), 6 rehab / isometric drills, 2 that need a stability ball. Those two groups were skipped on purpose. |
| drop | 8 | 2 are already in the app under another name (incline chest fly, Bulgarian split squat). 3 are the existing pull-up, chin-up and dip with a dumbbell added, which the app already logs as added weight. 3 differ from an existing exercise only in tempo (pause squat, pulse squat, pullover eccentrics), so the picture and the logging would be identical. |

So up to **234 images** (196 + 38), about 24 batches of 10.

## Decisions needed before starting

1. **Hyphens in names.** The app's existing dumbbell names are hyphenated
   (`Dumbbell single-arm row`, `Dumbbell step-up`, `Dumbbell heels-up goblet
   squat`). The 164 kettlebell names follow MuscleWiki's spelling without
   hyphens (`Kettlebell single arm row`, `Kettlebell step up`). Recommended:
   use the app's hyphenated style for both, and rename the kettlebell entries
   and their image files now. Nothing is released, so no saved data has to be
   migrated.
2. **Target-only dumbbell lifts.** Kettlebells got a second type for lifts
   limited by grip or balance, or several lifts in one (Z press, Larsen press,
   guillotine press, single-leg work, thrusters, clean and press): they get a
   starting weight but never drive another lift. Recommended: the same rule for
   the new dumbbell exercises (a new `'D'` type). The dumbbell exercises already
   in the app keep behaving as they do today.
3. **The 8 drops and 17 holds** above: confirm, or move any back in.
4. **The 38 to verify:** I open each exercise's MuscleWiki page in Chrome and
   read what the movement is (reading only, nothing downloaded). Anything still
   unclear after that goes on the held-back list.

## How the work runs

Same loop as kettlebells, which produced 164 accepted images with one
regeneration.

1. **Look up** the 38 "verify" exercises and settle each one.
2. **Stage prompts** in `image-prompts-dumbbell.txt` at the repo root, one line
   per exercise (`slug | name | panels`), in batches of 10.
   - Reference images for style and character: `images/exercises/goblet-squat.png`,
     `images/exercises/dumbbell-floor-press.png` and one accepted kettlebell image.
   - Equipment line: a dumbbell is two black six-sided (hex) rubber heads on a
     short gray metal handle, drawn the same in every panel.
   - 67 of these have a kettlebell twin (same movement). Their prompts and text
     start from the kettlebell version with the grip wording changed; each one
     is still reviewed on its own.
3. **Generate** through the ChatGPT app's Work tab, 10 per message, into
   `images/exercises/_incoming/`. Wait for the previous batch to finish before
   sending (the send arrow is the Stop button while it is working).
4. **Review** every batch on contact sheets against its three panel sentences.
   Check the background gray (darken anything above about 244). Reject and
   re-prompt with tighter geometry when the picture would teach the wrong
   movement.
5. **Accept:** convert to `images/exercises/<slug>.webp` (`cwebp -q 80`).
6. **Add the exercise** only after its image is accepted: `EX.sub` entry with
   `webp:true`, names in Japanese and Korean, 6 tips and 5 steps in English,
   Japanese and Korean, and its `LIFT_REL` ratio where a comparable lift exists.
7. **Checks** after every batch: lint. After every 50 exercises: unit and data
   tests. At the end: the full precheck, the simulator, and a headless load of
   every image.
8. **Save learnings to memory** every 50 accepted images and at every stop.
9. **No commits.**

## What does not change

- My Gym: dumbbells already have their own row.
- The exercise picker: these show under the existing "Dumbbell" label.
- Weight math: plain dumbbell lifts use the existing `'d'` type and ratios
  taken from the closest existing dumbbell lift. No existing ratio changes.

## Cost

- About 24 batches at 13 to 20 minutes each: roughly 6 hours of generation on
  the ChatGPT Pro account, with the screen in use only for a few seconds per
  batch.
- 234 exercises of text: about 7,700 strings across three languages.

## Afterwards

Update `docs/musclewiki-held-back.md` with the dumbbell holds, add the group to
the CHANGELOG entry, and delete `image-prompts-dumbbell.txt` when the images
ship.

Remaining groups after this one (from `docs/musclewiki-new-exercises.csv`):
Bodyweight / other 266, Cable 178, Band 118, Barbell 104, Plate 58, Landmine
52, Machine 43, Bosu ball 36, TRX 31, Smith machine 26, Rings 23, EZ bar 11,
Trap bar 9, Medicine ball 8. Bands, plates, landmine, Bosu, TRX, rings, trap
bar and medicine ball each need a decision on how they appear in My Gym and in
the weight suggestions before their exercises go in.
