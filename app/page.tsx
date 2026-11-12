import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ApproachStrip } from "@/components/home/ApproachStrip";
import { CertificationsShowcase } from "@/components/home/CertificationsShowcase";
import { ClosingContact } from "@/components/home/ClosingContact";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HomeContainer, HomeSection } from "@/components/home/HomeLayout";
import { NowCard } from "@/components/home/NowCard";
import { Toolkit } from "@/components/home/Toolkit";
import { Values } from "@/components/home/Values";
import { JsonLd, personJsonLd } from "@/components/seo/JsonLd";
import { featuredProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "",
  description:
    "Third-year CSE student building ML and GenAI systems people can rely on — calibrated risk models and RAG assistants that cite their sources.",
  path: "/",
});

/**
 * Home, in Design Source order. On laptops the Now card sits in the hero and the certifications
 * come before the toolkit. On phones the Now card is its own section after the approach steps,
 * and the toolkit comes before the certifications. The order classes below do that.
 */
export default function HomePage(): ReactElement {
  const projects = featuredProjects();
  return (
    <div className="flex flex-col">
      <JsonLd data={personJsonLd()} />
      <Hero />
      <FeaturedWork projects={projects} />
      <Values />
      <ApproachStrip />
      <HomeSection band className="lg:hidden">
        <HomeContainer>
          <NowCard />
        </HomeContainer>
      </HomeSection>
      <div className="order-6 lg:order-7">
        <Toolkit />
      </div>
      <div className="order-7 lg:order-6">
        <CertificationsShowcase />
      </div>
      <div className="order-8">
        <ClosingContact />
      </div>
    </div>
  );
}
