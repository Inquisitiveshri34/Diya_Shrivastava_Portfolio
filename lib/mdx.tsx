import type { ComponentType, ReactElement } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "@/components/ui/Callout";
import { MetricBlock } from "@/components/ui/MetricBlock";
import { Decision } from "@/components/work/Decision";
import { Figure } from "@/components/work/Figure";

// Compiles case-study bodies with the component map below. A body is split at its "## " headings,
// so each section gets a stable id for the "On this page" list, and the Limitations section is
// wrapped in the limitation callout. The same split feeds the list, so its links always match.

export type Section = { id: string; title: string; body: string };

/** "What I'd do next" → "what-id-do-next". Apostrophes are dropped, other punctuation becomes a hyphen. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Splits an MDX body at its level-2 headings. "## " inside a code fence is not a heading. */
export function splitSections(source: string): Section[] {
  const sections: Section[] = [];
  const seen = new Map<string, number>();
  let current: { title: string; lines: string[] } | null = null;
  let inFence = false;

  const push = () => {
    if (!current) return;
    const base = slugify(current.title);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    sections.push({
      id: count === 1 ? base : `${base}-${count}`,
      title: current.title,
      body: current.lines.join("\n"),
    });
  };

  for (const line of source.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    const heading = inFence ? null : line.match(/^## (.+?)\s*$/);
    if (heading) {
      push();
      current = { title: heading[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  push();
  return sections;
}

/** The component map for one case study. Figure needs the slug to find its images. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function caseStudyComponents(slug: string): Record<string, ComponentType<any>> {
  return {
    Figure: (props: { name: string }) => <Figure slug={slug} name={props.name} />,
    Decision,
    Callout,
    MetricBlock,
  };
}

/** Renders a case study body: each section with its heading, and the Limitations callout. */
export async function CaseStudyBody({
  slug,
  source,
}: {
  slug: string;
  source: string;
}): Promise<ReactElement> {
  const components = caseStudyComponents(slug);
  const sections = splitSections(source);
  return (
    <div className="text-ink text-[18px] leading-[1.65] [&_li]:pl-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_p]:m-0 [&_p+p]:mt-4 [&_strong]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
      {sections.map((section) => {
        const isLimitation = section.id === "limitations";
        const content = <MDXRemote source={section.body} components={components} />;
        return (
          <section key={section.id} className="mt-18 first:mt-0">
            <h2
              id={section.id}
              className="m-0 mb-3.5 scroll-mt-24 font-serif text-[30px] leading-[1.25] font-semibold"
            >
              {section.title}
            </h2>
            {isLimitation ? <Callout type="limitation">{content}</Callout> : content}
          </section>
        );
      })}
    </div>
  );
}
