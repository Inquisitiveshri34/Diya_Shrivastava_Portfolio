import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HERO_HEADING_ID } from "@/content/site";

// Placeholder Home: one heading, carrying the hero id the header watches.
// PR 3 replaces this page with the full hero.
export default function HomePage(): ReactElement {
  return (
    <Section>
      <Container>
        <h1 id={HERO_HEADING_ID}>
          {"I'm Diya. I build machine-learning systems people can rely on."}
        </h1>
      </Container>
    </Section>
  );
}
