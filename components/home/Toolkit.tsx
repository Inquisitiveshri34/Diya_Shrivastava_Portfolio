import type { ReactElement } from "react";
import { HomeContainer, HomeSection } from "@/components/home/HomeLayout";
import { Reveal } from "@/components/ui/Reveal";
import { toolkit } from "@/content/data/toolkit";

/** "Toolkit": grouped rows with hairline dividers. */
export function Toolkit(): ReactElement {
  return (
    <HomeSection>
      <HomeContainer>
        <Reveal>
          <h2 className="m-0 font-serif text-[26px] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:wrap] lg:text-[32px]">
            Toolkit
          </h2>
          <dl className="border-border m-0 mt-7 border-b">
            {toolkit.map((row) => (
              <div
                key={row.group}
                className="border-border grid grid-cols-[116px_minmax(0,1fr)] border-t py-3.5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="m-0 text-[16px] font-semibold">{row.group}</dt>
                <dd className="m-0 text-[16px]">{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </HomeContainer>
    </HomeSection>
  );
}
