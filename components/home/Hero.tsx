import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { NowCard } from "@/components/home/NowCard";
import { Container } from "@/components/layout/Container";
import { latestResume } from "@/lib/media";
import { AVAILABILITY, CONTACT, HERO_HEADING_ID } from "@/content/site";

// Content file, §2.1. The design's "4× Microsoft Certified" line is not in content.md, so it is left out.
const LABEL = "Applied ML & GenAI · Ahmedabad, India";
const SUBLINE =
  "Models that know how confident they are, and AI assistants that show their sources — or say \"I don't know.\" I care about work that's useful beyond the demo.";

/** The rising-line motif from the design. Decorative. */
function RisingLine(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M4 40c6-.5 9-3 12-7.5s5.5-6 9.5-6.5S33 23 36 17s4.5-8 8-9.5" />
      <circle cx="44" cy="7.5" r="2.4" fill="currentColor" stroke="none" />
      <path d="M4 44h40" opacity="0.35" />
    </svg>
  );
}

/**
 * The hero. The headline spans the full width; the subline, badge, buttons and links sit
 * beside the Now card on laptops, and stack above it on phones.
 * Not wrapped in Reveal: it is the largest contentful paint, so it must not wait for JavaScript.
 */
export function Hero(): ReactElement {
  const resume = latestResume();
  return (
    <section className="pt-8 pb-20 sm:pt-16 xl:pt-24 xl:pb-28">
      <Container
        width="wide"
        className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"
      >
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <RisingLine />
          <p className="text-ink-muted m-0 text-[16px]">{LABEL}</p>
          <h1
            id={HERO_HEADING_ID}
            className="m-0 font-serif text-[clamp(40px,4.5vw+12px,60px)] leading-[1.1] font-semibold tracking-[-0.015em]"
          >
            <span className="block">I&apos;m Diya.</span>
            <span className="block">I build machine-learning systems</span>
            <span className="block">
              <span className="[box-shadow:inset_0_-0.42em_0_var(--accent-tint)]">
                people can rely on.
              </span>
            </span>
          </h1>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <p className="text-ink-muted m-0 max-w-[60ch] text-[19px]">{SUBLINE}</p>
          <p className="rounded-pill bg-accent-tint text-ink inline-flex w-fit items-center gap-2.5 px-4 py-1.5 text-[14.5px] font-medium">
            <span aria-hidden="true" className="bg-accent size-[7px] rounded-full" />
            {AVAILABILITY}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/work">See my work</Button>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-pill border-ink/20 text-ink hover:border-ink hover:text-ink inline-flex min-h-[46px] items-center justify-center border px-6 text-[15.5px] font-semibold no-underline transition-colors hover:no-underline"
            >
              Download résumé
            </a>
          </div>
          <p className="m-0 flex flex-wrap gap-x-5 gap-y-2 text-[15.5px]">
            <a href={`mailto:${CONTACT.email}`} className="font-medium">
              Email
            </a>
            <a href={CONTACT.github.href} className="font-medium">
              GitHub
            </a>
            <a href={CONTACT.linkedin.href} className="font-medium">
              LinkedIn
            </a>
          </p>
        </div>

        <NowCard />
      </Container>
    </section>
  );
}
