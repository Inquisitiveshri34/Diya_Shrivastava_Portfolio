import type { ReactElement } from "react";
import { HomeContainer, HomeSection } from "@/components/home/HomeLayout";
import { Reveal } from "@/components/ui/Reveal";
import { values } from "@/content/data/values";

/** "How I try to work." Three values with a plum rule. Reused on the About page. */
export function Values(): ReactElement {
  return (
    <HomeSection band>
      <HomeContainer>
        <Reveal>
          <h2 className="m-0 font-serif text-[26px] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:wrap] lg:text-[32px]">
            How I try to work.
          </h2>
          <ul className="m-0 mt-10 flex list-none flex-col gap-[34px] p-0">
            {values.map((value) => (
              <li key={value.title} className="border-accent border-l-2 pl-6">
                <p className="m-0 font-serif text-[22px] leading-[1.25] italic lg:text-[24px]">
                  {value.title}
                </p>
                <p className="text-ink-muted m-0 mt-1 text-[16px] lg:text-[17px]">{value.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </HomeContainer>
    </HomeSection>
  );
}
