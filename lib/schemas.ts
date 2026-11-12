import { z } from "zod";

// All content and media schemas live here. Build Spec §8.1 and §9.1 are the starting point;
// the fields below follow the PR 2 plan (label, name and subtitle, cardLabel, cardLine,
// cardTags, contextNote, glance and viz).

const text = z.string().min(1);
const url = z.url();
const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase words joined by hyphens");

// ---------- Projects (content/work/*.mdx) ----------

export const DotsViz = z
  .object({
    kind: z.literal("dots"),
    filled: z.number().int().nonnegative(),
    total: z.number().int().positive(),
    /** "muted" draws the filled dots in sage, as the design does for the 30 correct answers. */
    tone: z.enum(["accent", "muted"]).default("accent"),
  })
  .refine((v) => v.filled <= v.total, { message: "filled cannot exceed total" });

export const LiftViz = z.object({
  kind: z.literal("lift"),
  disputes: z.number().int().nonnegative(),
  transactions: z.number().int().positive(),
  baseRate: text,
});

export const BarViz = z.object({
  kind: z.literal("bar"),
  percent: z.number().min(0).max(100),
});

export const ScaleViz = z.object({
  kind: z.literal("scale"),
  value: z.number().nonnegative(),
  baseline: z.number().nonnegative(),
  max: z.number().positive(),
  unit: text,
});

export const Viz = z.discriminatedUnion("kind", [DotsViz, LiftViz, BarViz, ScaleViz]);

/** A bar split into a base part (sage) and what was added since (plum), e.g. 262 of 375 tests. */
export const SplitViz = z
  .object({
    kind: z.literal("split"),
    base: z.number().int().nonnegative(),
    total: z.number().int().positive(),
  })
  .refine((v) => v.base <= v.total, { message: "base cannot exceed total" });

export const Metric = z.object({
  value: text,
  label: text.optional(),
  context: text,
  viz: Viz.optional(),
});

// A glance row may carry a mini-chart. Rows with a `viz` sit in the left column on laptops.
export const GlanceRow = z.object({
  number: text,
  meaning: text,
  viz: z.union([Viz, SplitViz]).optional(),
});
export type GlanceRow = z.infer<typeof GlanceRow>;

const ProjectBase = z.object({
  kind: z.enum(["featured", "learning"]),
  slug,
  order: z.number().int().positive(),
  draft: z.boolean().default(false),
  name: text,
  subtitle: text,
  title: text,
  label: text,
  cardLabel: text,
  summary: text,
  cardLine: text,
  cardTags: z.array(text).min(1).optional(),
  details: text,
  stack: z.array(text).min(1),
  contextNote: text.optional(),
  links: z
    .object({
      github: url.optional(),
      demo: url.optional(),
    })
    .default({}),
  linkNote: text.optional(),
  glanceNote: text.optional(),
  glance: z.array(GlanceRow).optional(),
  metrics: z.array(Metric).max(4).optional(),
});

// Featured projects need the card metrics and the "At a glance" table. Learning projects
// have neither, and their pages describe only what was built.
export const Project = ProjectBase.superRefine((p, ctx) => {
  if (p.kind === "featured") {
    if (!p.metrics || p.metrics.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["metrics"],
        message: "featured projects need at least one card metric",
      });
    }
    if (!p.glance || p.glance.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["glance"],
        message: "featured projects need an 'At a glance' table",
      });
    }
  }
  if (p.kind === "learning" && (p.glance || p.metrics)) {
    ctx.addIssue({
      code: "custom",
      path: ["kind"],
      message: "learning projects have no metrics or glance table",
    });
  }
});

export type Project = z.infer<typeof Project>;
export type Metric = z.infer<typeof Metric>;
export type Viz = z.infer<typeof Viz>;

// ---------- Posts (content/writing/*.mdx; none yet) ----------

export const Post = z.object({
  title: text,
  slug,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD"),
  summary: text,
  tags: z.array(text).default([]),
  draft: z.boolean().default(false),
});
export type Post = z.infer<typeof Post>;

// ---------- Figure and document sidecars (<file>.meta.json) ----------

export const Sidecar = z.object({
  title: text.optional(),
  alt: text.optional(),
  caption: text.optional(),
  date: z.string().optional(),
  externalUrl: url.optional(),
});
export type Sidecar = z.infer<typeof Sidecar>;

// ---------- Site data (content/data/*.ts) ----------

export const Certification = z.object({
  slug,
  name: text,
  issuer: text,
  date: text,
  verifyUrl: url,
});
export type Certification = z.infer<typeof Certification>;

export const ForageSimulation = z.object({
  company: text,
  simulation: text,
  date: text,
  summary: text,
  certificateUrl: url,
});
export type ForageSimulation = z.infer<typeof ForageSimulation>;

export const TimelineKind = z.enum(["Projects", "Certifications", "Simulations", "Programs"]);
export const TimelineRow = z.object({
  when: text,
  what: text,
  kinds: z.array(TimelineKind),
});
export type TimelineRow = z.infer<typeof TimelineRow>;

export const Value = z.object({ title: text, text });
export type Value = z.infer<typeof Value>;

export const ApproachStep = z.object({ title: text, text });
export type ApproachStep = z.infer<typeof ApproachStep>;

export const ToolkitGroup = z.object({
  group: text,
  items: z.array(text).min(1),
});
export type ToolkitGroup = z.infer<typeof ToolkitGroup>;

export const Education = z.object({
  degree: text,
  institution: text,
  coursesLabel: text,
  courses: text,
  currentlyStudyingLabel: text,
  currentlyStudying: text,
});
export type Education = z.infer<typeof Education>;

// ---------- ChargebackLens thresholds (build-spec §8.1) ----------

export const Thresholds = z.object({
  meta: z.object({
    source: text,
    n_transactions: z.number().int().nonnegative(),
    base_rate: z.number().nonnegative(),
    currency: text,
    cost_assumptions: text,
  }),
  grid: z.array(
    z
      .object({
        stepUp: z.number().nonnegative(),
        review: z.number().nonnegative(),
        pctAllowed: z.number(),
        pctStepUp: z.number(),
        pctReview: z.number(),
        recall: z.number(),
        netSavingsINR: z.number(),
      })
      .refine((g) => g.stepUp < g.review, { message: "stepUp must be lower than review" }),
  ),
  chosen: z.object({ stepUp: z.number().nonnegative(), review: z.number().nonnegative() }),
});
export type Thresholds = z.infer<typeof Thresholds>;

// ---------- Media manifest (written by scripts/build-media-manifest.ts) ----------

export type MediaFile = {
  /** Public URL, e.g. /media/images/clausecheck/fig-checked-answer.png */
  src: string;
  alt: string;
  caption?: string;
  title?: string;
};

export type MediaManifest = {
  resume: {
    /** Always /media/resume/Diya_Shrivastava.pdf */
    latest: string;
    /** Earlier versions, newest first. */
    archive: { date: string; src: string }[];
  };
  images: Record<string, MediaFile[]>;
  videos: Record<string, { src: string; poster?: string; externalUrl?: string }>;
  documents: {
    certificates: Record<string, string>;
    projects: Record<string, { src: string; title: string }[]>;
  };
  thresholds: Thresholds | null;
};
