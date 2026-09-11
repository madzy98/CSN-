# CSN+ — user project instructions for Builder Grok

**Priority: same as AGENTS.md. Read BUILDER_GROK.md next.**

Official Latvian road signs are legal data, not artwork.
This was already broken multiple times. Do not repeat it.

Full script: `BUILDER_GROK.md`

## Hard stops

1. Never generate, redraw, restyle or "enhance" a CSN road sign.
2. Never call Imagine / generate_image / edit_image on a sign.
3. Never put CSS `filter` or `drop-shadow` on the sign graphic.
4. Official files only: `public/signs/{csnNumber}.png`.
5. Minimum-speed sign = **423** (`min-speed-50`, question `sg046`). Not 323. Not 531.
6. Source of truth: https://likumi.lv/ta/id/274865-celu-satiksmes-noteikumi#piel4
7. If the official PNG is missing, say missing. Do not invent a substitute.
8. Do not change question text, answers, explanations or scoring when touching signs.
9. Do not say "fixed" unless rendered 423 matches current 4. pielikums.
10. Re-read `BUILDER_GROK.md` at the start of every session (ERR-003).

## Code map

- Sign SVG approximations (forbidden to expand): `src/components/csn/question-visual.tsx`
- Official resolver: `src/lib/csn/officialSigns.ts`
- Official renderer: `src/components/csn/official-sign.tsx`
- Question bank: `src/data/questions.json` (do not rewrite copy for a sign-asset fix)
