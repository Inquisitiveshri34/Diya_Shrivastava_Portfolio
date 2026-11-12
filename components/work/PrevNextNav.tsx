import type { ReactElement } from "react";
import { TextLink } from "@/components/ui/TextLink";
import type { LoadedProject } from "@/lib/content";

/**
 * Previous and next featured project, and a link back to Work. The order wraps: the project
 * before the first is the last, and the one after the last is the first.
 */
export function PrevNextNav({
  previous,
  next,
}: {
  previous: LoadedProject;
  next: LoadedProject;
}): ReactElement {
  return (
    <nav aria-label="More projects" className="mt-24">
      <div className="grid gap-4 sm:grid-cols-2">
        <PrevNextCard href={`/work/${previous.slug}`} direction="previous" name={previous.name} />
        <PrevNextCard href={`/work/${next.slug}`} direction="next" name={next.name} />
      </div>
      <p className="m-0 mt-6 text-[15.5px]">
        <TextLink href="/work" className="font-semibold">
          Back to all work
        </TextLink>
      </p>
    </nav>
  );
}

function PrevNextCard({
  href,
  direction,
  name,
}: {
  href: string;
  direction: "previous" | "next";
  name: string;
}): ReactElement {
  const previous = direction === "previous";
  return (
    <a
      href={href}
      className={`bg-band text-ink hover:bg-accent-tint block rounded-[16px] px-6 py-5.5 no-underline transition-colors ${
        previous ? "" : "sm:text-right"
      }`}
    >
      <span className="text-ink-muted block text-[13.5px]">
        {previous ? "← Previous" : "Next →"}
      </span>
      <span className="font-serif text-[21px] font-semibold">{name}</span>
    </a>
  );
}
