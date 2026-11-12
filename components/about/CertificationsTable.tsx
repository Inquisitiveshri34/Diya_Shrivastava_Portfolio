import type { ReactElement } from "react";
import { certifications } from "@/content/data/certifications";
import { certificatePdf } from "@/lib/media";

/** Certifications with a Verify link for each, and a PDF link only when the file exists. */
export function CertificationsTable(): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-[16px]">
        <thead>
          <tr className="text-ink-muted text-left text-[13px] tracking-[0.06em] uppercase">
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Certification
            </th>
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Issuer
            </th>
            <th scope="col" className="pr-4 pb-2.5 font-semibold">
              Date
            </th>
            <th scope="col" className="pb-2.5 font-semibold">
              <span className="sr-only">Links</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => {
            const pdf = certificatePdf(cert.slug);
            return (
              <tr key={cert.slug} className="border-border border-t">
                <td className="py-3.5 pr-4 font-medium">{cert.name}</td>
                <td className="text-ink-muted py-3.5 pr-4">{cert.issuer}</td>
                <td className="text-ink-muted py-3.5 pr-4 font-mono text-[14px] whitespace-nowrap">
                  {cert.date}
                </td>
                <td className="py-3.5 whitespace-nowrap">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4 font-medium underline-offset-[3px] hover:underline"
                  >
                    Verify
                    <span className="sr-only"> {cert.name}</span>
                  </a>
                  {pdf ? (
                    <a href={pdf} className="font-medium underline-offset-[3px] hover:underline">
                      PDF
                      <span className="sr-only"> {cert.name}</span>
                    </a>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
