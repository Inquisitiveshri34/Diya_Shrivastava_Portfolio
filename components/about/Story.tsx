import type { ReactElement } from "react";
import { TextLink } from "@/components/ui/TextLink";

// Copied word for word from docs/content.md section 8.1 (build-spec §6.4 matches it).
// Bold phrases are kept bold; "ClauseCheck" links to its case study.
export function Story(): ReactElement {
  return (
    <div className="flex flex-col gap-[18px] text-[18px] leading-[1.65]">
      <p className="m-0">
        Most of my projects end with a question that isn&apos;t about the model:{" "}
        <strong>what will someone actually do with this output?</strong> A dispute-risk score is
        only useful once it becomes a decision — allow, challenge or review — with a rupee cost
        attached. A contract assistant is only useful if a procurement team can check every answer
        against the clause it came from.
      </p>
      <p className="m-0">
        That question shapes how I work. I split data the way time actually flows, so a model never
        learns from the future. I <strong>calibrate</strong> scores so that a 10% risk really means
        10%. And I test what a system does when it doesn&apos;t know:{" "}
        <TextLink href="/work/clausecheck" inline>
          ClauseCheck
        </TextLink>{" "}
        <strong>refuses rather than guesses</strong>, and ChargebackLens shows the segments where it{" "}
        <strong>shouldn&apos;t be deployed at all</strong>. Some of my most important results are
        the ones that say no.
      </p>
      <p className="m-0">
        I study Computer Science (Software Product Engineering) at Lovely Professional University,
        where I hold a 9.10 CGPA. I started out building full-stack and mobile apps before moving
        into machine learning and GenAI. I&apos;m looking for a team that has shipped models into
        the real world, and where being careful is treated as part of being good.
      </p>
    </div>
  );
}
