import type { ReactElement } from "react";
import { NowCard } from "@/components/home/NowCard";
import { HomeContainer } from "@/components/home/HomeLayout";
import { latestResume } from "@/lib/media";
import { AVAILABILITY, CONTACT, HERO_HEADING_ID } from "@/content/site";

// Words: subline from content.md §2.1. The "4× Microsoft Certified" line and "Applied ML & GenAI Developer"
// follow the design (see TODO). The headline is "I'm Diya." per content.md.
const SUBLINE =
  "Models that know how confident they are, and AI assistants that show their sources — or say \"I don't know.\" I care about work that's useful beyond the demo.";

/** The rising-line motif from the design. Decorative. */
function RisingLine(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent size-12"
    >
      <path d="M4 40c6-.5 9-3 12-7.5s5.5-6 9.5-6.5S33 23 36 17s4.5-8 8-9.5" />
      <circle cx="44" cy="7.5" r="2.4" fill="currentColor" stroke="none" />
      <path d="M4 44h40" opacity="0.35" />
    </svg>
  );
}

/**
 * The hero. Laptops: the headline runs the full width, and the text column sits beside the
 * Now card. Phones: one column, with the Now card moved to its own section further down.
 * Not wrapped in Reveal: it is the largest contentful paint, so it must not wait for JavaScript.
 */
export function Hero(): ReactElement {
  const resume = latestResume();
  return (
    <section className="pt-10 pb-14 lg:pt-28 lg:pb-20">
      <HomeContainer className="grid gap-x-12 gap-y-7 lg:grid-cols-[minmax(0,1fr)_352px] lg:items-start">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
          <RisingLine />
          <h1
            id={HERO_HEADING_ID}
            className="m-0 font-serif text-[31px] leading-[1.18] font-semibold tracking-[-0.025em] lg:text-[60px] lg:leading-[1.1]"
          >
            <span className="block">I&apos;m Diya Shrivastava.</span>
            <span className="block text-[26px] lg:text-[60px]">I build machine-learning</span>
            <span className="block text-[26px] lg:text-[60px]">
              systems{" "}
              <span className="[box-shadow:inset_0_-0.42em_0_var(--accent-tint)]">
                people can rely on.
              </span>
            </span>
          </h1>
        </div>

        <div className="flex min-w-0 flex-col gap-[22px]">
          <p className="text-ink-muted m-0 mb-[3px] max-w-[60ch] text-[17px] lg:text-[19px]">
            {SUBLINE}
          </p>
          <p className="text-ink-muted m-0 -mb-2 text-[15px] leading-[1.45] lg:text-[16px] lg:leading-[1.65]">
            <a href="#certifications" className="text-accent font-medium">
              4× Microsoft Certified
            </a>
            <span className="lg:hidden"> · Ahmedabad, India</span>
            <span className="block lg:hidden">Applied ML &amp; GenAI Developer</span>
            <span className="hidden lg:inline">
              {" "}
              · Applied ML &amp; GenAI Developer · Ahmedabad, India
            </span>
          </p>
          <p className="rounded-pill bg-accent-tint text-ink inline-flex w-fit items-center gap-2.5 px-4 py-1.5 text-[14px] leading-[1.35] font-medium lg:text-[14.5px] lg:leading-normal">
            <span aria-hidden="true" className="bg-accent size-[7px] rounded-full" />
            {AVAILABILITY}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/work"
              className="rounded-pill bg-accent text-surface hover:bg-accent-hover hover:text-surface inline-flex min-h-[46px] items-center justify-center px-[22px] text-[15px] font-semibold no-underline transition-colors hover:no-underline lg:px-6 lg:text-[15.5px]"
            >
              See my work
            </a>
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

        <NowCard className="hidden lg:mt-[18px] lg:block" />
      </HomeContainer>
    </section>
  );
}
