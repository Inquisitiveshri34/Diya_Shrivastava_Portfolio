import type { ReactElement } from "react";
import { projectDocuments } from "@/lib/media";

/** Documents attached to a project (reports, slides). Renders nothing when there are none. */
export function DocumentList({ slug }: { slug: string }): ReactElement | null {
  const docs = projectDocuments(slug);
  if (docs.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="m-0 mb-5 font-serif text-[30px] leading-[1.25] font-semibold">Documents</h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {docs.map((doc) => (
          <li key={doc.src}>
            <a href={doc.src} target="_blank" rel="noopener noreferrer" className="font-medium">
              {doc.title}{" "}
              <span className="text-ink-muted text-[14px]">(PDF, opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
