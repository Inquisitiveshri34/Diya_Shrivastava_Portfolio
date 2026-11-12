import type { ReactElement } from "react";

/** A headline number in a case study: the big mono figure, its label and its required context line. */
export function MetricBlock({
  value,
  label,
  context,
}: {
  value: string;
  label?: string;
  context: string;
}): ReactElement {
  return (
    <div className="my-8">
      <p className="text-accent m-0 font-mono text-[36px] leading-[1.15] font-semibold">
        <span className="border-accent border-b-[3px] border-double pb-px">{value}</span>
        {label ? (
          <span className="text-ink ml-3 font-mono text-[15px] font-medium">{label}</span>
        ) : null}
      </p>
      <p className="text-ink-muted m-0 mt-2 text-[14px] leading-[1.45]">{context}</p>
    </div>
  );
}
