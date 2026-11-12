import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { certifications } from "@/content/data/certifications";
import { certificatePdf } from "@/lib/media";
import type { Certification } from "@/lib/schemas";

// The code (PL-200, AI-900, ...) is the slug when it has that shape, uppercased.
const codeOf = (c: Certification) =>
  /^[a-z]{2}-\d+$/.test(c.slug) ? c.slug.toUpperCase() : undefined;

// "Power Platform Fundamentals (PL-900)" shows as "Power Platform Fundamentals"; the code sits on the meta line.
const titleOf = (c: Certification) => c.name.replace(/\s*\([A-Z]{2}-\d+\)$/, "");

function CertCard({ cert, large }: { cert: Certification; large: boolean }): ReactElement {
  const code = codeOf(cert);
  const pdf = certificatePdf(cert.slug);
  const meta = [cert.issuer, code, cert.date].filter(Boolean).join(" · ");
  return (
    <article className="rounded-card border-border bg-surface flex min-w-0 flex-col overflow-hidden border">
      <div aria-hidden="true" className="border-border bg-band aspect-[297/210] border-b p-3">
        <div className="border-border bg-surface flex h-full items-center justify-center rounded-[3px] border">
          {code ? <span className="text-ink font-mono text-[12px]">{code}</span> : null}
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-2 ${large ? "p-6" : "p-5"}`}>
        <h3
          className={`m-0 font-serif leading-[1.3] font-semibold ${large ? "text-[20px]" : "text-[17px]"}`}
        >
          {titleOf(cert)}
        </h3>
        <p className="text-ink-muted m-0 text-[13.5px]">{meta}</p>
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
 * Certifications, as cards: four Microsoft ones, then the rest. Headings follow the design.
 * "View certificate" appears only when the PDF is in the media manifest.
 */
export function CertificationsShowcase(): ReactElement {
  const major = certifications.filter((c) => c.issuer === "Microsoft");
  const more = certifications.filter((c) => c.issuer !== "Microsoft");
  return (
    <Section band id="certifications">
      <Container width="wide">
        <Reveal>
          <h2 className="m-0 font-serif text-[32px] leading-[1.25] font-semibold tracking-[-0.01em]">
            Major certifications
          </h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {major.map((c) => (
              <CertCard key={c.slug} cert={c} large />
            ))}
          </div>

          <h2 className="m-0 mt-16 font-serif text-[26px] leading-[1.25] font-semibold">
            More certifications
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((c) => (
              <CertCard key={c.slug} cert={c} large={false} />
            ))}
          </div>

          <p className="m-0 mt-10">
            <TextLink href="/about#certifications" className="text-[15.5px] font-semibold">
              See all certifications →
            </TextLink>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
