import type { ReactElement } from "react";
import { CONTACT, NAME } from "@/content/site";
import type { LoadedProject } from "@/lib/content";
import { projectDescription } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";

/** Renders one JSON-LD object. `<` is escaped so the payload cannot close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Person on Home: name, URL, email, GitHub and LinkedIn, and the university. */
export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    email: CONTACT.email,
    sameAs: [CONTACT.github.href, CONTACT.linkedin.href],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Lovely Professional University" },
  };
}

/** CreativeWork on each case study. */
export function creativeWorkJsonLd(project: LoadedProject): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: projectDescription(project.slug),
    url: `${SITE_URL}/work/${project.slug}`,
    author: { "@type": "Person", name: NAME, url: SITE_URL },
    keywords: project.stack.join(", "),
  };
}
