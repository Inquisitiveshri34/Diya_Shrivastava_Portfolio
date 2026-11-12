import type { ReactElement, ReactNode } from "react";

/** A "Chose X over Y because Z" panel inside a case study body. */
export function Decision({ children }: { children: ReactNode }): ReactElement {
  return (
    <aside className="bg-accent-tint border-accent my-8 rounded-r-[16px] border-l-[3px] p-6 text-[17px] leading-[1.6]">
      <p className="text-accent m-0 mb-2 text-[13px] font-semibold tracking-[0.06em] uppercase">
        Decision
      </p>
      <div className="m-0">{children}</div>
    </aside>
  );
}
