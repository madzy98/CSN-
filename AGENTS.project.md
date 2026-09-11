# CSN+ project rules — read BEFORE any image or question work

Official Latvian road signs are legal data, not artwork.
Previous sessions ignored this and kept redrawing signs. That is ERR-001. Do not repeat it.

## ERROR MEMORY (permanent)

- ERR-001 Official CSN signs were AI/SVG-recreated and must never be regenerated.
- ERR-002 Minimum-speed sign is CSN **423**, not 323 and not 531. Slug in bank: `min-speed-50`.
- ERR-003 Later builder passes forgot earlier sign fixes. Re-read this file every session.
- ERR-004 Do not take official plates from Google, Pinterest, Wikipedia, icon packs, Imagine.
- ERR-005 Do not run scenario-art / Imagine / enhance pipelines on `visual.type === "sign"`.
- ERR-006 Do not rewrite question text, answers, explanations or scoring when fixing signs.
- ERR-007 Do not say "fixed" unless the rendered 423 plate matches current Likumi 4. pielikums.

Source of truth: https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi#piel4

## What you must do

1. Official signs live in `public/signs/{csnNumber}.png` and `src/lib/csn/officialSigns.ts`.
2. Questions with a real CSN plate use `visual.type: "sign"` + mapped `signId`.
3. `QuestionVisual` must prefer the official file. Never send that file through Imagine.
4. Allowed on the plate: scale with `height: auto`. Forbidden on the plate: CSS `filter`, restyle, crop, regenerate.
5. Container (card) may have shadow. The `<img>` / plate SVG must not.

## What you must never do

- Do not edit pixels of `public/signs/*`.
- Do not add `filter: drop-shadow` on the sign graphic (already a shipped bug in `question-visual.tsx`).
- Do not invent a "nicer" 423.
- If an official PNG is missing, say it is missing. Do not generate a lookalike.
