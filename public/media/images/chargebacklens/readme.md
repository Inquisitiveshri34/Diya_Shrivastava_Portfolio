# Case Study Figures

This directory contains the data for four key figures used in the ChargebackLens case study.

## Files

### fig-calibration.json
**Calibration Curve: Predicted vs Observed Dispute Rate**

Shows how well the deployed model's predicted probabilities match observed dispute rates across decile bins. The uncalibrated HGB model and the deployed (sigmoid calibrated) logistic regression are compared. Perfect calibration follows the diagonal line.

- Data source: `data/processed/05_calibration_curve.csv`
- Metrics: ECE (Expected Calibration Error) = 0.00185

### fig-savings-thresholds.json
**Net Savings vs Review Decision Threshold**

Shows net cost savings across all possible decision thresholds on the test set. The deployed threshold (0.024425) is marked as the optimum under the three-band routing policy.

- Data source: `data/processed/05_threshold_sweep.csv`
- X-axis: Decision threshold (probability score, 0 to ~0.34)
- Y-axis: Net savings in ₹ INR relative to allowing all transactions
- Chosen threshold: 0.024425 (allow/step-up boundary)

### fig-segment-economics.json
**Segment Economics: Net Savings per Manual Review Decision**

Shows return on investment per manual review decision across 15 segments defined by amount bucket, merchant category, and payment method. Sorted by return (ascending). Segments with negative returns are highlighted (e.g., wallet method = −₹300).

- Data source: `data/processed/05_segment_economics.csv`
- Red bars: Negative savings (segments where manual review loses money)
- Blue bars: Positive savings

### fig-delivery-status.json
**Excluded on Purpose: Delivery Status is Only Known After the Decision**

Shows the strong relationship between delivery status and dispute rate (delivered 0.86%, lost 2.68%, a 3.1× spread). This signal is deliberately excluded from the model because it is only knowable weeks after the transaction decision must be made.

- Data source: `data/processed/01_cleaned_fulfilment.csv` + `data/processed/01_master_labelled.csv`
- Reason for exclusion: Post-decision information violates the feature knowability contract

---

## Generating PNG/HTML Versions

The JSON files can be rendered as charts using the following methods:

### Option 1: Use Plotly (Python)
```python
import json
import plotly.graph_objects as go

with open("fig-calibration.json") as f:
    fig_data = json.load(f)

# Render based on fig_data["type"] and fig_data["data"]
# See notebooks/05_model_evaluation.ipynb cells 6-7, 9-16, etc.
```

### Option 2: Original Notebook Code
The exact figures can be regenerated from the notebooks by running:
- **Calibration curve**: `notebooks/05_model_evaluation.ipynb`, cell 6
- **Savings vs thresholds**: `notebooks/05_model_evaluation.ipynb`, cell 9
- **Segment economics**: `notebooks/05_model_evaluation.ipynb`, cell 16
- **Delivery status**: `notebooks/02_eda.ipynb`, cell 6

Run the notebooks and modify the final `fig.show()` calls to:
```python
fig.write_image("fig-calibration.png", width=1600, height=600)
```

### Option 3: Online SVG-to-PNG Conversion
If you generate SVG versions of the figures, they can be converted to PNG using:
- https://cloudconvert.com/svg-to-png
- https://svg2png.io/

---

## Reference

All figure data is traceable to specific CSV files in `data/processed/`:
- Calibration: `05_calibration_curve.csv` (20 rows, 10 deciles × 2 models)
- Threshold sweep: `05_threshold_sweep.csv` (101 rows, one per quantile-derived threshold)
- Segment economics: `05_segment_economics.csv` (15 rows, one per segment above n=300)
- Delivery status: `01_cleaned_fulfilment.csv` + `01_master_labelled.csv`

For full technical details, see `CASE_STUDY_CONTENT.md` §10 (Figures available).
