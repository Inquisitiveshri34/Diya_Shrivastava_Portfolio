import type { ReactElement } from "react";
import { forageSimulations } from "@/content/data/forage";

/** The Forage job simulations. The table scrolls sideways on phones rather than squeezing. */
export function LearningRecordTable(): ReactElement {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[760px] border-collapse text-[15.5px]">
        <caption className="sr-only">Job simulations completed on Forage</caption>
        <thead>
          <tr className="text-ink-muted text-left text-[13px] tracking-[0.06em] uppercase">
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Company
            </th>
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Simulation
            </th>
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Date
            </th>
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              What I did
            </th>
            <th scope="col" className="pb-2.5 font-semibold">
              <span className="sr-only">Link</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {forageSimulations.map((row) => (
            <tr
              key={`${row.company}-${row.simulation}`}
              className="border-border border-t align-top"
            >
              <th scope="row" className="py-3.5 pr-4 text-left font-semibold whitespace-nowrap">
                {row.company}
              </th>
              <td className="py-3.5 pr-4 whitespace-nowrap">{row.simulation}</td>
              <td className="text-ink-muted py-3.5 pr-4 font-mono text-[14px] whitespace-nowrap">
                {row.date}
              </td>
              <td className="py-3.5 pr-4">{row.summary}</td>
              <td className="py-3.5 whitespace-nowrap">
                <a
                  href={row.certificateUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="font-medium"
                >
                  Certificate
                  <span className="sr-only"> from {row.company} (opens in a new tab)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
