// Copied word for word from docs/content.md sections 2.3 and 8.3. Keep the text in step with that document.
import type { Value, ApproachStep } from "@/lib/schemas";

export const values: Value[] = [
  {
    title: "Honest numbers.",
    text: "Every metric shown with its baseline and its limits.",
  },
  {
    title: "Decisions, not just predictions.",
    text: "A model is only useful when its output is something someone can act on.",
  },
  {
    title: "Work that lasts beyond the demo.",
    text: "Tests, documentation, and saying what's unfinished.",
  },
];

export const approachSteps: ApproachStep[] = [
  {
    title: "Understand the decision",
    text: "— who will act on the output, and what a mistake costs them.",
  },
  {
    title: "Respect the data",
    text: "— clean it, question it, and split it the way time actually flows.",
  },
  {
    title: "Evaluate honestly",
    text: "— baselines, calibration, and the cases where it fails.",
  },
  {
    title: "Ship something usable",
    text: "— tested, documented, and clear about its limits.",
  },
];
