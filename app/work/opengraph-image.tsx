import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, PreviewCard, loadOgFonts } from "@/lib/og";

export const alt = "Work · Diya Shrivastava";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    <PreviewCard
      title="Work"
      description="Case studies in applied machine learning, GenAI and data analysis: contract question-answering, payment dispute risk, delivery-time prediction, retention analytics and more."
    />,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
