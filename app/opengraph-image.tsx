import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, PreviewCard, SITE_DESCRIPTION, loadOgFonts } from "@/lib/og";

export const alt = "Diya Shrivastava — Applied ML & GenAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    <PreviewCard title="Diya Shrivastava — Applied ML & GenAI" description={SITE_DESCRIPTION} />,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
