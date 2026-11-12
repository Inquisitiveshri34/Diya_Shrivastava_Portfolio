# TODO

Open placeholders, missing assets and decisions. Remove an item when it is resolved.

## Figures still to add or fix (you drop these in; the site picks them up)

Each PNG goes in the folder shown, under the exact file name. Its caption and alt text come from the `.meta.json` beside it. Until a PNG has that name, its sidecar is skipped with a warning and the page shows no figure.

Figures already on the site: `clausecheck/fig-checked-answer.png`, `streakforge/fig-funnel.png`, and the five DeliverIQ figures below.

- **DeliverIQ: re-export the five figures.** The charts match their captions, but each still has a "Plot N —" title and raw axis names (for example `avg_speed_kmph`). `docs/content.md` §11.5 asks for clean titles. Re-export under the same file names.
- **ChargebackLens (4 needed).** No PNGs yet. The chart data (`fig-*.json`) and the README that explains how to render it are in `~/Desktop/Portfolio-media-held/chargebacklens/`.
- **StreakForge (4 needed).**
  - `fig-activation-by-year.png`: the PNGs you have do not match this caption (grouped bars by sign-up year).
  - `fig-activation-by-plan.png`: the PNGs you have do not match this caption (bars by membership type and trainer access). `pr12_activation_by_branch.png` is by branch, so it does not fit.
  - `fig-weekly-anomalies.png`: `pr11_weekly_engagement_anomalies.png` is close, but it includes the partial final week that the caption says is excluded. Re-export without it.
  - `fig-branch-churn.png`: `pr11_branch_churn_anomalies.png` is close, but it has no dashed average line at 94.2% and no red outlier marks, which the caption describes. Re-export to match.
- Files moved out of the repo, not deleted: `~/Desktop/Portfolio-media-held/` (unused or mismatched charts, the landing-page screenshot, the ChargebackLens data, and the StreakForge interactive HTML).

The full list of names the page uses:

- [x] `public/media/images/clausecheck/fig-checked-answer.png`
- [ ] `public/media/images/chargebacklens/fig-calibration.png`, `fig-savings-thresholds.png`, `fig-segment-economics.png`, `fig-delivery-status.png`
- [x] `public/media/images/streakforge/fig-funnel.png`
- [ ] `public/media/images/streakforge/fig-activation-by-year.png`, `fig-activation-by-plan.png`, `fig-weekly-anomalies.png`, `fig-branch-churn.png`
- [x] `public/media/images/deliveriq/fig-target-distribution.png`, `fig-road-type.png`, `fig-hour-day-heatmap.png`, `fig-speed-traffic.png`, `fig-road-weather.png` (re-export, see above)

## Data still to add

- [ ] `public/media/data/chargebacklens-thresholds.json`, exported from the ChargebackLens repo (`docs/build-spec.md` §8.1). **Status (PR 5):** not present; the explorer shows "Interactive explorer coming soon". Percentages and `base_rate` are percents, and `chosen` carries its full outputs.
- [ ] Certificate PDFs under `public/media/documents/certificates/<slug>.pdf` (for example `pl-200.pdf`). **Status (PR 5):** none present; the About table shows only Verify links until they are added.

## Content to confirm

- [ ] **ParkEase dates.** `docs/content.md` says Feb–Mar 2026 in three places. PR 2 copies them as written. If the dates change, correct `docs/content.md` first and regenerate.
- [ ] **Certification slugs.** Slugs in `content/data/certifications.ts` are derived from the codes and names (for example `pl-200`, `databricks-fundamentals`). The content doc has none. Confirm them before adding certificate PDFs.
- [ ] **Home words not in `content.md`.** The design headings "Major certifications" and "More certifications" were used, as you asked; they are not in `content.md`. The design's sentence under the heading and the "View certificate" link text are also not in `content.md`. Add them to the content doc, or confirm they stay.
- [ ] **Hero line.** "4× Microsoft Certified" is added to the hero label on request. It is not in `docs/content.md`. Add it there to keep the content doc and the site in step.
- [ ] **Certificate preview boxes.** The design shows each certificate's file name in its preview box. The site shows the code on the Microsoft cards. The three "More" cards have no code, so their boxes are blank. Decide what they should show.
- [ ] **ClauseCheck figure paragraph.** The Evaluation section still has a `**Figure:**` line that repeats the figure's caption. Keep it or remove it.
- [ ] **Case-study descriptions.** Each case-study page uses its summary as its meta description. `docs/content.md` §10 has its own wording for each page; PR 6 sets those.

## Pages that the Home links point to

- "See all certifications →" was removed: the design has no such link (it is in `content.md` §2.7). Add it back if you want it.

## Design colours outside the PR 1 tokens (PR 4–5)

`docs/design-source.md` uses eight colour values that are not in the token list. Find them by searching that file for hex codes. Map each to the nearest existing token when its screen is built.

- [ ] Card dividers: map to `--border`.
- [ ] Scale ticks and track lines: map to `--border`. (The Home scale uses `--border`.)
- [ ] Certificate backgrounds (two values): map to `--band`.
- [ ] Grey bar in the ChargebackLens "all transactions" row: map to `--ink-muted`. (The Home lift uses `--ink-muted`.)
- [ ] Light plum tints in the DeliverIQ range (two values): map to `--accent-tint`.
- [ ] One value used once, purpose not identified: confirm the intended role before PR 4.

## Home: known differences from the design (PR 3)

Measured against `docs/Diya-Portfolio-Design/html` at 1280px and 390px. Laptop sections are within about 12px of the design. Phone sections are taller by roughly 20–130px in total, mostly the certifications and the cards.

- [ ] Card heights differ by 15–27px on laptops, because the descriptions and context lines are the `content.md` text and the design's wording is different.
- [ ] The headline is "I'm Diya Shrivastava." as the design has it, on request. `docs/content.md` §2.1 says "I'm Diya.". Update the content doc to match, or change the site back.
- [ ] Design text kept as written: certification intro, "landscape certificate", "Applied ML & GenAI Developer". Confirm these are wanted in the content doc.
- [ ] "View certificate" is hidden until the PDF exists, as agreed in PR 3. The design always shows it.
- [ ] The header (PR 1) shows a "Menu" button on phones; the design shows an icon. The header and footer are shared with every page, so they were not changed here.
- [ ] The arrow "→" in Public Sans falls back to another font, so it looks longer than in the design.
