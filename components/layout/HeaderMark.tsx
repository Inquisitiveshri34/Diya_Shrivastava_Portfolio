"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { DsMonogram } from "@/components/ui/DsMonogram";
import { HERO_HEADING_ID, NAME } from "@/content/site";

/**
 * The monogram and name in the header.
 * - On Home it stays hidden until the hero heading has scrolled out of view upward.
 * - On every other route it is always visible.
 * The hero is watched by its id (HERO_HEADING_ID). Until the hero exists, the
 * placeholder H1 carries that id.
 */
export function HeaderMark(): ReactElement {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    // Home always renders the hero heading. If it is missing, the mark stays hidden
    // on Home, which is the safe default: nothing is ever shown over a hero that is still in view.
    const hero = document.getElementById(HERO_HEADING_ID);
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  const shown = !isHome || pastHero;

  return (
    <Link
      href="/"
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className={`text-ink hover:text-ink inline-flex min-h-11 items-center gap-2.5 no-underline transition-[opacity,transform] duration-300 hover:no-underline ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <DsMonogram size="md" />
      <span className="font-serif text-[18px] font-semibold">{NAME}</span>
    </Link>
  );
}
