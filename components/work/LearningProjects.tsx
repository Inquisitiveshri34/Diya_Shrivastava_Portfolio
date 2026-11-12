"use client";

import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

/**
 * The learning-projects toggle. A real button with aria-expanded and aria-controls, over a region
 * with the `hidden` attribute, so its rows cannot be reached by keyboard while closed.
 * It starts closed on every load: the state is not stored anywhere.
 */
export function LearningProjects({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="learning"
        onClick={() => setOpen((value) => !value)}
        className="border-ink/20 text-ink hover:bg-band min-h-[46px] cursor-pointer rounded-[999px] border bg-transparent px-6 font-sans text-[15.5px] font-semibold"
      >
        {open ? "Hide learning projects" : `Show ${count} earlier learning projects`}
      </button>
      <div id="learning" hidden={!open} className="mt-9">
        {children}
      </div>
    </div>
  );
}
