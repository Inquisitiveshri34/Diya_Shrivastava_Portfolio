import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { approachSteps } from "@/content/data/values";

/**
 * "How I approach a problem." Four steps joined by arrows: across on laptops, down on phones.
 * The content text starts with an em dash that separates it from the title; the design drops it.
 */
export function ApproachStrip(): ReactElement {
  return (
    <Section>
      <Container width="wide">
        <Reveal>
          <h2 className="m-0 font-serif text-[32px] leading-[1.25] font-semibold tracking-[-0.01em]">
            How I approach a problem.
          </h2>
          <ol className="m-0 mt-10 flex list-none flex-col gap-3 p-0 md:flex-row md:items-stretch">
            {approachSteps.map((step, i) => (
              <li key={step.title} className="contents">
                <div className="rounded-card border-border bg-surface flex min-w-0 flex-1 flex-col gap-2 border p-5">
                  <span className="text-accent font-mono text-[14px] font-semibold">{i + 1}</span>
                  <p className="m-0 text-[16.5px] font-semibold">{step.title}</p>
                  <p className="text-ink-muted m-0 text-[15px] first-letter:uppercase">
                    {step.text.replace(/^—\s*/, "")}
                  </p>
                </div>
                {i < approachSteps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="text-accent flex shrink-0 rotate-90 items-center justify-center text-[18px] md:w-9 md:rotate-0"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
