import Image from "next/image";
import type { ReactElement } from "react";
import { HomeContainer, HomeSection } from "@/components/home/HomeLayout";
import { Reveal } from "@/components/ui/Reveal";
import { certifications } from "@/content/data/certifications";
import { certificatePdf, certificateThumbnail } from "@/lib/media";
import type { Certification } from "@/lib/schemas";

// The code (PL-200, AI-900, ...) is the slug when it has that shape, uppercased.
const codeOf = (c: Certification) =>
  /^[a-z]{2}-\d+$/.test(c.slug) ? c.slug.toUpperCase() : undefined;

// "Power Platform Fundamentals (PL-900)" shows as "Power Platform Fundamentals"; the code sits on the meta line.
const titleOf = (c: Certification) => c.name.replace(/\s*\([A-Z]{2}-\d+\)$/, "");

/**
 * One certificate. Microsoft cards stack the preview over the text in a two-column grid on phones.
 * The other cards are rows on phones (thumbnail left, text right) and stack from the laptop breakpoint.
 * The preview is the certificate's first page when its thumbnail exists, otherwise a placeholder
 * frame with the PDF's file name, as in the design.
 */
function CertCard({ cert, major }: { cert: Certification; major: boolean }): ReactElement {
  const code = codeOf(cert);
  const pdf = certificatePdf(cert.slug);
  const thumbnail = certificateThumbnail(cert.slug);
  return (
    <article
      className={`rounded-card border-border bg-surface min-w-0 overflow-hidden border ${
        major ? "flex flex-col" : "flex flex-row lg:flex-col"
      }`}
    >
      <div
        aria-hidden="true"
        className={`border-border bg-band ${
          major
            ? "aspect-[297/210] border-b p-3"
            : "w-[120px] shrink-0 self-stretch border-r p-2.5 lg:aspect-[297/210] lg:w-auto lg:self-auto lg:border-r-0 lg:border-b lg:p-3.5"
        }`}
      >
        <div className="border-border bg-surface relative flex h-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[3px] border px-1">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt=""
              fill
              sizes="(min-width: 1024px) 280px, 45vw"
              className="object-contain p-1"
            />
          ) : (
            <>
              <span className="text-ink font-mono text-[12px] font-medium">{cert.slug}.pdf</span>
              <span className="text-ink-muted hidden text-[11.5px] lg:inline">
                landscape certificate
              </span>
            </>
          )}
        </div>
      </div>
      <div
        className={`flex min-w-0 flex-1 flex-col gap-1.5 ${
          major
            ? "p-4 lg:px-[22px] lg:pt-5 lg:pb-[22px]"
            : "px-3.5 py-3.5 lg:px-5 lg:pt-[18px] lg:pb-5"
        }`}
      >
        <h3
          className={`m-0 font-serif leading-[1.3] font-semibold ${major ? "text-[17px] lg:text-[20px]" : "text-[17px]"}`}
        >
          {titleOf(cert)}
        </h3>
        <p className="text-ink-muted m-0 text-[13px] lg:text-[13.5px]">
          {major ? "Microsoft · " : `${cert.issuer} · `}
          {major && code ? (
            <>
              <span className="text-ink font-mono font-medium">{code}</span>
              {" · "}
            </>
          ) : null}
          <span className="text-ink font-mono font-medium">{cert.date}</span>
        </p>
        <p className="m-0 mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[14px] font-semibold">
          {pdf ? (
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              View certificate
            </a>
          ) : null}
          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verify →
          </a>
        </p>
      </div>
    </article>
  );
}

/**
 * Certifications: four Microsoft cards, then the rest. Headings and the intro follow the design.
 * "View certificate" appears only when the PDF is in the media manifest.
 */
export function CertificationsShowcase(): ReactElement {
  const major = certifications.filter((c) => c.issuer === "Microsoft");
  const more = certifications.filter((c) => c.issuer !== "Microsoft");
  return (
    <HomeSection band id="certifications">
      <HomeContainer>
        <Reveal>
          <h2 className="m-0 font-serif text-[26px] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:wrap] lg:text-[32px]">
            Major certifications
          </h2>
          <p className="text-ink-muted m-0 mt-2.5 max-w-[680px] text-[17px]">
            Microsoft certifications earned alongside my degree in 2026. Each one links to
            Microsoft&apos;s own verification page.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {major.map((c) => (
              <CertCard key={c.slug} cert={c} major />
            ))}
          </div>

          <h2 className="m-0 mt-16 font-serif text-[26px] leading-[1.25] font-semibold [text-wrap:wrap]">
            More certifications
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {more.map((c) => (
              <CertCard key={c.slug} cert={c} major={false} />
            ))}
          </div>
        </Reveal>
      </HomeContainer>
    </HomeSection>
  );
}
