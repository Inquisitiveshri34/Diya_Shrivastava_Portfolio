import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, PreviewCard, loadOgFonts } from "@/lib/og";

export const alt = "About · Diya Shrivastava";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    <PreviewCard
      title="About"
      description="I build machine-learning systems that are honest about what they know."
    />,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
