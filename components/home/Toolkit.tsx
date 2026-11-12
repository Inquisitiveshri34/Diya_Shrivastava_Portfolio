import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { toolkit } from "@/content/data/toolkit";

/** "Toolkit": grouped rows with hairline dividers. */
export function Toolkit(): ReactElement {
  return (
    <Section>
      <Container width="wide">
        <Reveal>
          <h2 className="m-0 font-serif text-[32px] leading-[1.25] font-semibold tracking-[-0.01em]">
            Toolkit
          </h2>
          <dl className="border-border m-0 mt-7 border-b">
            {toolkit.map((row) => (
              <div
                key={row.group}
                className="border-border grid gap-1 border-t py-3.5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="m-0 text-[16px] font-semibold">{row.group}</dt>
                <dd className="m-0 text-[16px]">{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
