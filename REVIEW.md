# CSN+ V4.22 REVIEW

Visual world pass on the existing CSN+ trainer. Logic, bank, keys, copy locked.

## WHAT CHANGED

- Theme tokens: each existing theme (`basic` / `dark` / `neon` / `pro`) is a full night world (accent, glow, surfaces, hero)
- Cinematic heroes in `public/themes/*.jpg` — original cars, no brand marks or baked slogans
- Splash: fullscreen car + existing `tagline` + `Sākt`
- Home: car hero with XP/streak HUD, then the same primary CTA
- Settings: theme picker is car cards with locked i18n names
- Stats: telemetry ring for real average
- Buttons: engineered control body, theme edge light, press sweep
- Glass header/nav; exam play stays focused
- Theme boot script reads `csnplus-v1` before first paint (`data-theme` + `--csn-hero`)
- Share card regenerated (website / custom)

## WHAT DID NOT CHANGE

- Persist `csnplus-v1` and `csn-splash-done`
- 270 questions, XP, V(n) pass, timers 60/30/45
- Routes and tab labels
- Theme IDs and unlock levels
- i18n strings (no NIGHT RUNNER / REDLINE copy)
- Audio: still a boolean, no engine

## FUNCTIONAL QA

| Flow | Result |
|---|---|
| Open / splash / Sākt | Pass — tagline + Sākt present |
| Home CTA start 30 | Pass — existing handler |
| Theme tokens swap with `data-theme` | Pass |
| Settings theme cards | Pass — locked names + unlock copy |
| Smoke desktop+mobile | Pass — no console/page errors, no overflow |
| Prod vs dev baseline | Pass — `divergesFromBaseline: false` |

## VISUAL QA

Splash/home show the cyan night coupe (pixels: mid-frame teal ~39,165,193). Overlay keeps type readable at the bottom. Not a 9-car brand wall — product has 4 themes.

## MOBILE QA

390×844 smoke: no horizontal overflow. Touch targets 48–56. Nav padded for safe area.

## ACCESSIBILITY QA

Semantic buttons, focus-visible on primary, reduced-motion kills energy breathe + blur. Contrast on HUD over the fade.

## PERFORMANCE QA

Hero JPEGs 98–163 KB. No particles, no WebGL. CSS radial veil only on splash/home, 10s breathe, off when reduced-motion.

## KNOWN LIMITATIONS

- Four themes, not nine legendary nameplates (would invent unlocks/copy)
- Cars are original photography, not licensed GT-R/Mustang/etc.
- No audio engine to duck — toggle only
- Dark is INITIAL even though “Tumšais” unlocks at level 2 (pre-existing)

## FINAL SCORES

| Area | /10 | Why not 10 |
|---|---|---|
| Automotive identity | 8 | Car owns splash/home; inner screens stay utility |
| Buttons | 8 | Theme-edge control; not chrome-physical |
| Theme worlds | 8 | 4 complete worlds; not a supercar garage |
| Hierarchy | 8 | Splash/home 2-second test; exam still a list |
| Functionality safety | 9 | Keys/bank/XP untouched; full 30q not re-timed this pass |
| Anti-slop | 8 | No slogans, no RGB borders; energy is one accent |
