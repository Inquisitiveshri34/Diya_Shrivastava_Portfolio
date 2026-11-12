# TODO

Files still to supply. Drop each one in the folder shown, under the exact file name, and the site picks it up at the next build. Remove an item when its file is in place.

## Figures

Each PNG goes in the folder shown, under the exact file name. Its caption and alt text come from the `.meta.json` beside it. Until a PNG has that name, its sidecar is skipped with a warning and the page shows no figure.

- [ ] **DeliverIQ: re-export the five figures** under the same file names. Each still has a "Plot N —" title and raw axis names (for example `avg_speed_kmph`); `docs/content.md` §11.5 asks for clean titles.
- [ ] **ChargebackLens (4 needed).** `public/media/images/chargebacklens/fig-calibration.png`, `fig-savings-thresholds.png`, `fig-segment-economics.png`, `fig-delivery-status.png`. The chart data and the render README are in `~/Desktop/Portfolio-media-held/chargebacklens/`.
- [ ] **StreakForge (4 needed).**
  - `public/media/images/streakforge/fig-activation-by-year.png`: grouped bars by sign-up year. The PNGs on hand do not match this caption.
  - `public/media/images/streakforge/fig-activation-by-plan.png`: bars by membership type and trainer access. `pr12_activation_by_branch.png` is by branch, so it does not fit.
  - `public/media/images/streakforge/fig-weekly-anomalies.png`: re-export without the partial final week that the caption says is excluded.
  - `public/media/images/streakforge/fig-branch-churn.png`: add the dashed average line at 94.2% and the red outlier marks the caption describes.
- Files moved out of the repo, not deleted: `~/Desktop/Portfolio-media-held/` (unused or mismatched charts, the landing-page screenshot, the ChargebackLens data and the StreakForge interactive HTML).

Already on the site: `clausecheck/fig-checked-answer.png`, `streakforge/fig-funnel.png`, and the five DeliverIQ figures above (still to re-export).
