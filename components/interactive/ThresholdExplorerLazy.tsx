"use client";

import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import type { Thresholds } from "@/lib/schemas";

// A client boundary that loads the explorer only in the browser. `ssr: false` is allowed here
// because this file is a client component; the server wrapper cannot use it.
const ThresholdExplorerClient = dynamic(() => import("./ThresholdExplorerClient"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[420px]" />,
});

export function ThresholdExplorerLazy({ data }: { data: Thresholds }): ReactElement {
  return <ThresholdExplorerClient data={data} />;
}
