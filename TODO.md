# TODO

Open placeholders, missing assets and decisions. Remove an item when it is resolved.

## Before PR 2

- [ ] **Résumé PDF.** Add `public/media/resume/Diya_Shrivastava.pdf`. The media script fails the build without it.
- [ ] **ParkEase dates.** `docs/content.md` and the design say Feb–Mar 2026; the owner says Jan–Feb 2026. Correct `docs/content.md` before PR 2 copies it into `parkease.mdx`.

## Before PR 3

- [ ] **Hero extra line.** The design adds "4× Microsoft Certified · Applied ML & GenAI Developer" under the subline. It is not in `docs/content.md`, so it stays out until the owner adds it there.
- [ ] **Scroll test for the header mark.** The Home test checks that the mark starts hidden. The "appears after the hero scrolls away" check needs a tall hero, so it is added in PR 3.

## Design colours outside the PR 1 tokens (PR 3–5)

`docs/design-source.md` uses eight colour values that are not in the PR 1 token list. Find them by searching that file for hex codes. The owner's rule: design follows `docs/design-source.md`, but only the listed tokens go in the codebase. Map each to the nearest existing token when the screen is built.

- [ ] Card dividers: map to `--border`.
- [ ] Scale ticks and track lines: map to `--border`.
- [ ] Certificate backgrounds (two values): map to `--band`.
- [ ] Grey bar in the ChargebackLens "all transactions" row: map to `--ink-muted`.
- [ ] Light plum tints in the DeliverIQ range (two values): map to `--accent-tint`.
- [ ] One value used once, purpose not identified: confirm the intended role before PR 3.

## Deployment

- [ ] Vercel preview: push `pr-1-foundation`, check it at 390px and 1280px, then merge.
