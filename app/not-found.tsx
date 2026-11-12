import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound(): ReactElement {
  return (
    <Section className="pt-24 pb-28 xl:pt-28">
      <Container width="reading">
        <h1 className="m-0 font-serif text-[40px] leading-[1.15] font-semibold tracking-[-0.015em] lg:text-[46px]">
          This page doesn&apos;t exist — but these do:
        </h1>
        <ul className="m-0 mt-10 flex list-none flex-wrap gap-x-10 gap-y-4 p-0 text-[20px]">
          <li>
            <TextLink href="/">Home</TextLink>
          </li>
          <li>
            <TextLink href="/work">Work</TextLink>
          </li>
          <li>
            <TextLink href="/about">About</TextLink>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
