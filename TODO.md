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
- [ ] Certificate PDFs under `public/media/documents/certificates/<slug>.pdf` (for example `pl-200.pdf`). Until a PDF exists, its card has no "View certificate" link.

## Content to confirm

- [ ] **ParkEase dates.** `docs/content.md` says Feb–Mar 2026 in three places. PR 2 copies them as written. If the dates change, correct `docs/content.md` first and regenerate.
- [ ] **Certification slugs.** Slugs in `content/data/certifications.ts` are derived from the codes and names (for example `pl-200`, `databricks-fundamentals`). The content doc has none. Confirm them before adding certificate PDFs.
- [ ] **Home words not in `content.md`.** The design headings "Major certifications" and "More certifications" were used, as you asked; they are not in `content.md`. The design's sentence under the heading and the "View certificate" link text are also not in `content.md`. Add them to the content doc, or confirm they stay.
- [ ] **Hero extra line.** The design's "4× Microsoft Certified · Applied ML & GenAI Developer" line is not in `docs/content.md`, so it is left out. Add it to the content doc to show it.
- [ ] **Certificate preview boxes.** The design shows each certificate's file name in its preview box. The site shows the code on the Microsoft cards. The three "More" cards have no code, so their boxes are blank. Decide what they should show.

## Pages that the Home links point to

- [ ] `/work/<slug>`, `/work`: built in PR 4. Until then, the card links and "All projects →" return 404.
- [ ] `/about#certifications`: built in PR 5. Until then, "See all certifications →" returns 404.

## Design colours outside the PR 1 tokens (PR 4–5)

`docs/design-source.md` uses eight colour values that are not in the token list. Find them by searching that file for hex codes. Map each to the nearest existing token when its screen is built.

- [ ] Card dividers: map to `--border`.
- [ ] Scale ticks and track lines: map to `--border`. (The Home scale uses `--border`.)
- [ ] Certificate backgrounds (two values): map to `--band`.
- [ ] Grey bar in the ChargebackLens "all transactions" row: map to `--ink-muted`. (The Home lift uses `--ink-muted`.)
- [ ] Light plum tints in the DeliverIQ range (two values): map to `--accent-tint`.
- [ ] One value used once, purpose not identified: confirm the intended role before PR 4.
