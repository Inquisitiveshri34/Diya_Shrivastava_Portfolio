import type { ReactElement } from "react";
import { thresholds } from "@/lib/media";
import { Thresholds } from "@/lib/schemas";
import { ThresholdExplorerLazy } from "./ThresholdExplorerLazy";

// The server reads and validates the precomputed JSON; with no valid file, the placeholder
// shows and no made-up numbers are ever drawn. The client part loads lazily (see the wrapper).
function Placeholder(): ReactElement {
  return (
    <div className="border-border bg-surface rounded-[16px] border p-6">
      <p className="m-0 font-serif text-[20px] font-semibold">Interactive explorer coming soon</p>
    </div>
  );
}

/** The ChargebackLens threshold explorer. Data: public/media/data/chargebacklens-thresholds.json. */
export function ThresholdExplorer(): ReactElement {
  const parsed = Thresholds.safeParse(thresholds());
  if (!parsed.success || parsed.data.grid.length === 0) return <Placeholder />;
  return <ThresholdExplorerLazy data={parsed.data} />;
}
