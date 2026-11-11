# TODO

Open placeholders, missing assets and decisions. Remove an item when it is resolved.

## Figures still to add (you drop these in; the site picks them up)

Each PNG goes in the folder shown. Its caption and alt text are already in a `.meta.json` file beside where the PNG goes. Until a PNG exists, the media script skips its sidecar with a warning.

ClauseCheck (1)
- [ ] `public/media/images/clausecheck/fig-checked-answer.png`

ChargebackLens (4)
- [ ] `public/media/images/chargebacklens/fig-calibration.png`
- [ ] `public/media/images/chargebacklens/fig-savings-thresholds.png`
- [ ] `public/media/images/chargebacklens/fig-segment-economics.png`
- [ ] `public/media/images/chargebacklens/fig-delivery-status.png`

StreakForge (5)
- [ ] `public/media/images/streakforge/fig-funnel.png`
- [ ] `public/media/images/streakforge/fig-activation-by-year.png`
- [ ] `public/media/images/streakforge/fig-activation-by-plan.png`
- [ ] `public/media/images/streakforge/fig-weekly-anomalies.png`
- [ ] `public/media/images/streakforge/fig-branch-churn.png`

DeliverIQ (5). Re-export with the clean titles in `docs/content.md` §11.5 first, as §11.1 asks.
- [ ] `public/media/images/deliveriq/fig-target-distribution.png`
- [ ] `public/media/images/deliveriq/fig-road-type.png`
- [ ] `public/media/images/deliveriq/fig-hour-day-heatmap.png`
- [ ] `public/media/images/deliveriq/fig-speed-traffic.png`
- [ ] `public/media/images/deliveriq/fig-road-weather.png`

## Data still to add

- [ ] `public/media/data/chargebacklens-thresholds.json`, exported from the ChargebackLens repo (`docs/build-spec.md` §8.1). Until it exists, the threshold explorer shows no data.

## Content to confirm

- [ ] **ParkEase dates.** `docs/content.md` says Feb–Mar 2026 in three places (the card, the case-study label and the About timeline). PR 2 copies them as written. If the dates change, correct `docs/content.md` first, then re-run the content generator or edit the three places.
- [ ] **Certification slugs.** `content/data/certifications.ts` slugs are derived from the names and codes, for example `pl-200`, `databricks-fundamentals`. The content doc has no slugs. Confirm them before any certificate PDF is added under `documents/certificates/`.

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
