import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ApproachStrip } from "@/components/home/ApproachStrip";
import { CertificationsShowcase } from "@/components/home/CertificationsShowcase";
import { ClosingContact } from "@/components/home/ClosingContact";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { Toolkit } from "@/components/home/Toolkit";
import { Values } from "@/components/home/Values";
import { featuredProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "",
  description:
    "Third-year CSE student building ML and GenAI systems people can rely on — calibrated risk models and RAG assistants that cite their sources.",
  path: "/",
});

// Seven sections in Design Source order.
export default function HomePage(): ReactElement {
  const projects = featuredProjects();
  return (
    <>
      <Hero />
      <FeaturedWork projects={projects} />
      <Values />
      <ApproachStrip />
      <CertificationsShowcase />
      <Toolkit />
      <ClosingContact />
    </>
  );
}
