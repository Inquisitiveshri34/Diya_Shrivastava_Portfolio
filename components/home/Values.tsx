import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { values } from "@/content/data/values";

/** "How I try to work." Three values with a plum rule. Reused on the About page. */
export function Values(): ReactElement {
  return (
    <Section band>
      <Container width="wide">
        <Reveal>
          <h2 className="m-0 font-serif text-[32px] leading-[1.25] font-semibold tracking-[-0.01em]">
            How I try to work.
          </h2>
          <ul className="m-0 mt-10 flex list-none flex-col gap-8 p-0">
            {values.map((value) => (
              <li key={value.title} className="border-accent border-l-2 pl-6">
                <p className="m-0 font-serif text-[24px] leading-[1.25] italic">{value.title}</p>
                <p className="text-ink-muted m-0 mt-1 text-[17px]">{value.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
