import type { ReactElement } from "react";
import { latestResume } from "@/lib/media";

const BUTTON =
  "inline-flex min-h-[46px] items-center justify-center rounded-pill bg-accent px-6 text-[15.5px] font-semibold text-surface no-underline hover:bg-accent-hover hover:text-surface";

/**
 * The latest résumé. On laptops it shows an embedded preview; on phones only the
 * Download PDF button, because PDFs preview poorly in a phone-width frame.
 */
export function ResumeViewer(): ReactElement {
  const href = latestResume();
  return (
    <div>
      <div className="border-border bg-surface mb-6 hidden overflow-hidden rounded-[16px] border md:block">
        <object
          data={`${href}#view=FitH`}
          type="application/pdf"
          aria-label="Latest résumé"
          className="block h-[80vh] w-full"
        >
          <a href={href} className={BUTTON}>
            Download PDF
          </a>
        </object>
      </div>
      <a href={href} download className={BUTTON}>
        Download PDF
      </a>
    </div>
  );
}
