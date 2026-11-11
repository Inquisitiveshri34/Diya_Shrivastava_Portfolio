"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { NAV_LINKS } from "@/content/site";

type NavLinksProps = {
  className?: string;
  /** Accessible name for this <nav>. Two navs can exist (desktop and phone menu). */
  label: string;
  /** Called after a link is followed, so the phone menu can close. */
  onNavigate?: () => void;
};

/**
 * Primary navigation. Marks the current page with aria-current="page".
 * Each link is at least 44px tall.
 */
export function NavLinks({ className = "", label, onNavigate }: NavLinksProps): ReactElement {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1">
        {NAV_LINKS.map((item) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={onNavigate}
                className={`inline-flex min-h-11 items-center rounded-md px-3 text-[15.5px] font-medium no-underline underline-offset-[3px] hover:underline ${
                  current ? "text-accent" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
