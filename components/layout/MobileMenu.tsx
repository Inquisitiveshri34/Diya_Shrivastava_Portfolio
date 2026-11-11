"use client";

import { useId, useRef, useState } from "react";
import type { ReactElement, KeyboardEvent } from "react";
import { NavLinks } from "@/components/layout/NavLinks";

/**
 * Phone navigation: a disclosure button that shows the nav links in a panel.
 * Works with the keyboard: Enter or Space opens it, Escape closes it and
 * returns focus to the button. Hidden from 640px up.
 */
export function MobileMenu(): ReactElement {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      close(true);
    }
  }

  return (
    <div className="sm:hidden" onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="rounded-pill border-ink/20 text-ink hover:border-ink inline-flex min-h-11 items-center gap-2 border px-4 text-[15px] font-semibold"
      >
        Menu
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="border-border bg-background absolute inset-x-0 top-full border-b px-5 py-4"
      >
        <NavLinks label="Mobile" className="flex" onNavigate={() => close(false)} />
      </div>
    </div>
  );
}
