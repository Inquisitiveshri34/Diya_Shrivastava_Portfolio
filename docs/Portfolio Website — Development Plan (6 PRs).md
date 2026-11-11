# Portfolio Website — Development Plan (6 PRs)

Nov 12, 2026 · @Diya Shrivastava

## Before PR 1: sources and decisions

The site is built in six pull requests, one per build phase, each merged to `main` only when lint, typecheck, build and the Playwright tests pass. The three project docs sit in the repo as read-only references, and Claude Code reads them at the start of every PR.

| File in the repo | What it decides | When they disagree |
| --- | --- | --- |
| `docs/build-spec.md` (Build Spec) | Stack, routes, components, rules, accessibility and performance budgets | Loses to the other two on looks and words |
| `docs/content.md` (Content) | Every word, number, caption and alt text | Wins on all copy and figures |
| `docs/design-source.md` (Design Source) | Colours, fonts, spacing, layout of each screen | Wins on all visuals |

### Decisions baked into this plan

1. **Visual system follows the Design Source, not Build Spec §3.** It is the newer, approved design: sage paper `#F5F7F2`, graphite ink `#23262B`, plum accent `#6C3E66`; Literata, Public Sans and Roboto Mono; 16px card corners, pill buttons; 680px reading and 1040px wide columns.
2. **Words follow the Content doc.** Where the design mock-ups differ, the Content doc wins: the hero headline is "I'm Diya.", and the About timeline has no robotics row (so the "Elevation gained" chart has no Programs tile).
3. **Layout follows the Design Source.** The Now card sits beside the hero, Home shows certification cards instead of a one-line credentials strip, and there are no uppercase eyebrow labels.
4. **No repo cloning.** Build Spec §13 asked Claude Code to clone every project repo. The Content doc already holds repo-checked text, captions and alt text, so that step is dropped. You drop the figure PNGs and the thresholds JSON in yourself.
5. **Seven projects, seven MDX files.** Featured: ClauseCheck, ChargebackLens, StreakForge, DeliverIQ. Learning (collapsed): HealthOps, ParkEase, CraftBridge.

### Fix or confirm before you start

- **ParkEase dates.** The Content doc and Design Source say Feb–Mar 2026, but you told me it was Jan–Feb 2026. Correct the Content doc before PR 2, since PR 2 copies it into `parkease.mdx`.
- **Hero extra line.** The design adds "4× Microsoft Certified · Applied ML & GenAI Developer" under the subline. It is not in the Content doc, so PR 3 leaves it out unless you add it there.
- **Résumé PDF.** Put `public/media/resume/Diya_Shrivastava.pdf` in the repo before PR 2. The media script fails the build without it.

### What you add by hand (Claude Code never creates or edits these)

- `docs/*.md` — the three reference docs
- Everything under `public/media/` except the `.meta.json` caption files: résumé PDFs, figure PNGs, demo videos and posters, certificate PDFs, and `data/chargebacklens-thresholds.json`

## Ground rules for every PR

Each PR touches only the files in its own list; anything outside it is out of bounds, including the three `docs/` files and your media files.

- **Create** means a new file; **Modify** means a file an earlier PR made. Generated files (`package-lock.json`, `next-env.d.ts`, `lib/media-manifest.generated.ts`) only change through the command that generates them.
- If a task seems to need a file that isn't listed, Claude Code stops and asks rather than touching it.
- Every PR ends by running `npm run lint`, `npm run typecheck`, `npm run build` and `npm run test:e2e`, and fixing every error inside its own file list.
- Every PR adds one line to `CHANGELOG.md` and updates `TODO.md` with any missing value, link or asset (a visible `TODO:` on the page, never an invented number).
- Branch names: `pr-1-foundation`, `pr-2-content-layer`, `pr-3-home`, `pr-4-work-case-studies`, `pr-5-about-resume-explorer`, `pr-6-seo-launch`. Each branches from `main` after the previous PR merges.
- Vercel builds a preview for every PR; check it at 390px and 1280px before merging.

## PR 1 — Foundation and design system

**Branch:** `pr-1-foundation` · **Result:** an empty but fully styled site — header, footer, tokens, fonts, tests and CI — live on a Vercel preview.

### What it does

1. Scaffolds Next.js (App Router) with TypeScript `strict`, Tailwind CSS v4, ESLint and Prettier, using the latest stable versions.
2. Defines the Design Source colours as CSS variables in `globals.css` and maps them into Tailwind's `@theme`: background, surface, muted band `#EBF0E7`, border, ink, ink muted, accent, accent hover, accent tint `#F3EAF1`, limitation tint and ink. No other colours anywhere.
3. Loads Literata, Public Sans and Roboto Mono through `next/font`, only the weights the design uses, with `display: swap`.
4. Sets base styles: fluid type with `clamp()`, link styles, a 2px plum focus ring on everything, 44px minimum touch targets, and all motion switched off under `prefers-reduced-motion`.
5. Builds the layout shell: skip link, sticky header (the DS mark and name fade in on Home once the hero heading scrolls away; always visible elsewhere), nav with `aria-current`, a simple disclosure menu on phones, and the three-column footer with the build-time "Last updated" date.
6. Creates `content/site.ts` as the single source for name, email, social links, availability line, Now items and the `SHOW_WRITING` flag (off).
7. Adds the "DS" monogram favicon and a `pageMetadata()` helper every later page uses for its title, description and canonical URL.
8. Sets up Playwright at 390px and 1280px with axe checks, and a GitHub Actions workflow that runs lint, typecheck, build and tests on every push and PR.

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `package.json` | Create | Dependencies and scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test:e2e` |
| `package-lock.json` | Create (generated) | Lockfile |
| `next-env.d.ts` | Create (generated) | Next.js types |
| `tsconfig.json` | Create | Strict mode, `@/*` path alias |
| `next.config.ts` | Create | Static output settings, image config |
| `postcss.config.mjs` | Create | Tailwind v4 PostCSS plugin |
| `eslint.config.mjs` | Create | Next.js + TypeScript rules |
| `.prettierrc.json` | Create | Formatting rules |
| `.prettierignore` | Create | Skip build output, docs and media |
| `.gitignore` | Create | `node_modules`, `.next`, test reports, `.env*` |
| `.nvmrc` | Create | Node LTS version |
| `README.md` | Create | How to run, test and deploy; folder map |
| `CHANGELOG.md` | Create | One line per PR |
| `TODO.md` | Create | Open placeholders and missing assets |
| `app/globals.css` | Create | Tokens, `@theme`, base styles, focus ring, reduced motion |
| `app/layout.tsx` | Create | Fonts, skip link, header, `main`, footer, default metadata |
| `app/page.tsx` | Create | Placeholder Home (one heading); replaced in PR 3 |
| `app/icon.svg` | Create | "DS" monogram favicon |
| `lib/fonts.ts` | Create | `next/font` setup for the three families |
| `lib/seo.ts` | Create | `pageMetadata()` helper and site URL |
| `content/site.ts` | Create | Contact details, availability, Now items, nav, `SHOW_WRITING` |
| `components/layout/Header.tsx` | Create | Sticky header shell |
| `components/layout/HeaderMark.tsx` | Create | Client: monogram + name that fades in on scroll |
| `components/layout/NavLinks.tsx` | Create | Client: nav links with `aria-current` |
| `components/layout/MobileMenu.tsx` | Create | Client: phone disclosure menu |
| `components/layout/Footer.tsx` | Create | Sign-off, last-updated date, contact and page links |
| `components/layout/Container.tsx` | Create | Reading (680px) and wide (1040px) columns |
| `components/layout/Section.tsx` | Create | Section spacing and the muted band variant |
| `components/layout/SkipLink.tsx` | Create | "Skip to content" link |
| `components/ui/Button.tsx` | Create | Primary and secondary pill buttons (link or button) |
| `components/ui/TextLink.tsx` | Create | Standalone and in-sentence link styles |
| `components/ui/DsMonogram.tsx` | Create | The double-bordered "DS" mark, in three sizes |
| `playwright.config.ts` | Create | 390px and 1280px projects, local server |
| `tests/smoke.spec.ts` | Create | Home loads; header, footer and phone menu work |
| `tests/a11y.spec.ts` | Create | Zero axe violations on Home |
| `.github/workflows/ci.yml` | Create | Lint, typecheck, build, Playwright on push and PR |

### Done when

- [ ] The placeholder page builds and deploys to a Vercel preview.
- [ ] Header and footer work at 390px and 1280px, and the phone menu opens and closes with the keyboard.
- [ ] axe reports zero violations; CI is green.

## PR 2 — Content and media layer

**Branch:** `pr-2-content-layer` · **Result:** every word and figure on the site lives in typed, validated content files, and the site picks up whatever you drop into `public/media/` — no pages render it yet.

### What it does

1. Writes the `zod` schemas: project frontmatter, posts, figure sidecars, certifications, Forage rows, timeline rows and the ChargebackLens thresholds JSON (Build Spec §8.1).
2. Extends the Build Spec project schema with what the design needs: `kind` (featured or learning), a `glance` list for the "At a glance" grid (ClauseCheck has six numbers, so it can't share the 4-item card `metrics`), and a `viz` field on the first card metric naming its mini-chart (`dots`, `lift`, `bar` or `scale`) with its numbers.
3. Writes all seven project MDX files, copying the Content doc word for word: frontmatter (label, title, subtitle, summary, role details, stack, links, card metrics, glance) and body sections. Featured bodies use `## The problem`, `## The data`, `## Approach`, `## Evaluation`, `## Results`, `## Limitations`, `## What I'd do next` (plus ClauseCheck's integration section and StreakForge's findings). Learning bodies hold only what was built and a scope note.
4. Puts the rest of the site's copy in typed data files: certifications, Forage simulations, About timeline (no robotics row), values and approach steps, toolkit groups, and education.
5. Builds `lib/content.ts` to load, validate and sort projects and posts, hiding drafts in production. A bad field fails the build with the file name and field.
6. Builds `scripts/build-media-manifest.ts`, run before `dev` and `build`: it walks `public/media/`, reads sidecars, checks naming rules and image alt text, requires `resume/Diya_Shrivastava.pdf`, sorts archived résumés newest first, and writes the git-ignored `lib/media-manifest.generated.ts`. Orphan sidecars (no image yet) are skipped with a warning.
7. Writes the 15 figure caption files (`.meta.json`) with the captions and alt text from Content §11, so each figure appears as soon as you drop its PNG in.
8. Adds `lib/media.ts` helpers that later PRs call: latest and archived résumés, figures, video, documents and certificate PDF per slug, and the thresholds data (returns nothing if the JSON is missing).

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `package.json` | Modify | Add `gray-matter`, `zod`, `next-mdx-remote`, `tsx`; `predev` / `prebuild` scripts |
| `package-lock.json` | Modify (generated) | Lockfile |
| `.gitignore` | Modify | Ignore `lib/media-manifest.generated.ts` |
| `lib/schemas.ts` | Create | All `zod` schemas |
| `lib/content.ts` | Create | Load, validate, sort projects and posts |
| `lib/media.ts` | Create | Typed helpers over the media manifest |
| `lib/media-manifest.generated.ts` | Create (generated, git-ignored) | Output of the manifest script |
| `scripts/build-media-manifest.ts` | Create | Scans `public/media/`, writes the manifest |
| `scripts/validate-content.ts` | Create | Runs in `prebuild`; clear errors for bad content |
| `content/work/clausecheck.mdx` | Create | Featured #1 |
| `content/work/chargebacklens.mdx` | Create | Featured #2 (explorer added in PR 5) |
| `content/work/streakforge.mdx` | Create | Featured #3 |
| `content/work/deliveriq.mdx` | Create | Featured #4 |
| `content/work/healthops.mdx` | Create | Learning project |
| `content/work/parkease.mdx` | Create | Learning project (dates as you confirm) |
| `content/work/craftbridge.mdx` | Create | Learning project |
| `content/writing/.gitkeep` | Create | Empty posts folder |
| `content/data/certifications.ts` | Create | Seven certifications, slugs, verify links |
| `content/data/forage.ts` | Create | Five job simulations |
| `content/data/timeline.ts` | Create | About timeline rows and milestone kinds |
| `content/data/values.ts` | Create | Three values and four approach steps |
| `content/data/toolkit.ts` | Create | Five toolkit groups |
| `content/data/education.ts` | Create | Degree, CGPA, course groups, studying now |
| `public/media/images/clausecheck/fig-checked-answer.png.meta.json` | Create | Caption and alt text |
| `public/media/images/chargebacklens/fig-calibration.png.meta.json`, `fig-savings-thresholds…`, `fig-segment-economics…`, `fig-delivery-status…` | Create (4 files) | Captions and alt text |
| `public/media/images/streakforge/fig-funnel.png.meta.json`, `fig-activation-by-year…`, `fig-activation-by-plan…`, `fig-weekly-anomalies…`, `fig-branch-churn…` | Create (5 files) | Captions and alt text |
| `public/media/images/deliveriq/fig-target-distribution.png.meta.json`, `fig-road-type…`, `fig-hour-day-heatmap…`, `fig-speed-traffic…`, `fig-road-weather…` | Create (5 files) | Captions and alt text |
| `CHANGELOG.md` | Modify | PR 2 line |
| `TODO.md` | Modify | Missing figures, thresholds JSON, open items |

### Done when

- [ ] A wrong frontmatter field (for example, a metric with no `context`) fails `npm run build` with the file and field named.
- [ ] Deleting `Diya_Shrivastava.pdf` fails the build; an image without alt text fails the build.
- [ ] All seven MDX files match the Content doc word for word, with no invented numbers.

## PR 3 — Home page

**Branch:** `pr-3-home` · **Result:** the finished Home page, matching the laptop and phone mock-ups, with real copy and the four featured project cards.

### What it does

1. Replaces the placeholder Home with seven sections in the Design Source order: hero with the Now card beside it, featured work, how I try to work (band), how I approach a problem, certifications (band, `id="certifications"`), toolkit, and the closing contact (band).
2. Builds the hero: the rising-line SVG motif, the headline from the Content doc with the plum highlighter under "people can rely on.", subline, availability badge with its dot, **See my work** and **Download résumé** (opens the latest PDF in a new tab), and Email · GitHub · LinkedIn links. The heading carries the id the header watches to fade in its mark.
3. Builds the project card used on Home and Work: label, title and subtitle, "who it helps" line, stack line, "Read case study →", and the metric panel — big mono number with its double underline, the mini-chart from `viz` (31 dots, two lift bars, an activation bar or a baseline scale), its context line, and the second metric under a hairline. The whole card is one link; mini-charts are `aria-hidden` because the context line says the same in words.
4. Builds the values list, the four-step approach strip (arrows across on desktop, down on phones), the toolkit table, and the certification cards (four Microsoft, three more), each with **Verify →** and a **View certificate** link only when the PDF exists.
5. Adds the fade-and-rise on scroll (once per section, 400ms, off under reduced motion).

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `app/page.tsx` | Modify | Compose the seven Home sections; page metadata |
| `components/home/Hero.tsx` | Create | Motif, headline, subline, badge, buttons, links |
| `components/home/NowCard.tsx` | Create | "What I'm doing these days" card |
| `components/home/FeaturedWork.tsx` | Create | Heading, four cards, "All projects →" |
| `components/home/Values.tsx` | Create | Three values (reused on About) |
| `components/home/ApproachStrip.tsx` | Create | Four connected steps |
| `components/home/CertificationsShowcase.tsx` | Create | Major and more certification cards |
| `components/home/Toolkit.tsx` | Create | Grouped toolkit rows |
| `components/home/ClosingContact.tsx` | Create | "Let's build something useful." band |
| `components/work/ProjectCard.tsx` | Create | Featured project card (reused on Work) |
| `components/work/MetricViz.tsx` | Create | `dots`, `lift`, `bar` and `scale` mini-charts |
| `components/ui/Reveal.tsx` | Create | Client: fade-and-rise on scroll |
| `tests/smoke.spec.ts` | Modify | Hero, four cards in order, no learning projects on Home |
| `tests/a11y.spec.ts` | Modify | Axe on the full Home page |
| `CHANGELOG.md` | Modify | PR 3 line |
| `TODO.md` | Modify | Any open Home items |

### Done when

- [ ] At 390px, the résumé button and the email link are visible without scrolling (asserted in the smoke test).
- [ ] Cards appear in the order ClauseCheck, ChargebackLens, StreakForge, DeliverIQ; none of the learning projects appear.
- [ ] axe reports zero violations, and every colour on the page comes from the tokens.

## PR 4 — Work page and case studies

**Branch:** `pr-4-work-case-studies` · **Result:** `/work` and all seven `/work/[slug]` pages, rendered from the MDX files with the fixed case-study structure.

### What it does

1. Builds `/work`: H1 and lead, the four featured cards (reusing PR 3's card), the learning-projects toggle, and the Forage learning-record table (scrolls sideways on phones).
2. Builds the learning-projects toggle as a `<button aria-expanded aria-controls>` over a region with the `hidden` attribute. It starts closed on every load, reads "Show 3 earlier learning projects" / "Hide learning projects", and its rows can't be reached by keyboard while closed.
3. Builds `/work/[slug]` with `generateStaticParams` for all seven slugs and no others. Featured pages get: back link, label, title, summary, the 誠 sincerity stamp, the Role / Stack / Context details table, links (with "Demo may take \~30 seconds to wake up." beside live demos), demo video when present, the At-a-glance grid, the MDX body, documents list, and previous / next cards. Learning pages get the same header and body, but no At-a-glance or prev / next.
4. Renders the At-a-glance grid responsively: result numbers with their dot mini-charts on the left, the note linking to Limitations, and scale numbers on the right; it stacks into one column on phones.
5. Adds the MDX components the bodies use: `<Figure>` (renders nothing until the PNG exists), `<Decision>`, `<Callout type="note|limitation">` and `<MetricBlock>`. Headings get stable ids for the sticky "On this page" list, shown only at 1024px and up.
6. Previous / next cycles through the four featured projects only, wrapping around (ClauseCheck's previous is DeliverIQ).
7. Draws the 誠 stamp as inline SVG, so no Japanese font is downloaded.

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `app/work/page.tsx` | Create | Work index; page metadata |
| `app/work/[slug]/page.tsx` | Create | Case-study template; static params; metadata |
| `lib/mdx.tsx` | Create | Compile MDX with the component map; heading ids and TOC list |
| `components/work/LearningProjects.tsx` | Create | Client: collapsed learning section |
| `components/work/ProjectRow.tsx` | Create | Compact learning-project row |
| `components/work/LearningRecordTable.tsx` | Create | Forage simulations table |
| `components/work/CaseStudyHeader.tsx` | Create | Label, title, summary, details table, links |
| `components/work/SincerityStamp.tsx` | Create | Inline-SVG 誠 stamp with its accessible label |
| `components/work/AtAGlance.tsx` | Create | Responsive glance grid with mini-charts |
| `components/work/TableOfContents.tsx` | Create | Client: sticky "On this page", current section marked |
| `components/work/Figure.tsx` | Create | Figure from the manifest, caption and alt text |
| `components/work/DemoVideo.tsx` | Create | MP4 with poster, or click-to-load YouTube (nocookie) |
| `components/work/DocumentList.tsx` | Create | "Documents" list from `documents/projects/<slug>/` |
| `components/work/Decision.tsx` | Create | "Chose X over Y because Z" panel |
| `components/work/PrevNextNav.tsx` | Create | Previous / next featured project and back link |
| `components/ui/Callout.tsx` | Create | Note and limitation callouts |
| `components/ui/MetricBlock.tsx` | Create | Number, label and required context line |
| `tests/smoke.spec.ts` | Modify | All slugs render; toggle; prev / next order |
| `tests/a11y.spec.ts` | Modify | Axe on `/work` (toggle open and closed) and every slug |
| `CHANGELOG.md` | Modify | PR 4 line |
| `TODO.md` | Modify | Figures still missing per project |

### Done when

- [ ] All seven slugs render, and an unknown slug returns the 404.
- [ ] Every featured case study shows the Limitations callout.
- [ ] Prev / next runs ClauseCheck → ChargebackLens → StreakForge → DeliverIQ → ClauseCheck.
- [ ] The learning section is closed on load, and opens and closes with Enter and Space.
- [ ] A missing figure, video or document leaves no gap or broken link.

## PR 5 — About, Résumé, 404 and the threshold explorer

**Branch:** `pr-5-about-resume-explorer` · **Result:** every remaining page is built, and the ChargebackLens case study gets its interactive threshold explorer.

### What it does

1. Builds `/about`: H1 and lead, the three-paragraph story with its bold phrases and a link on "ClauseCheck", the "My path" band, the values (reusing PR 3's component), the certifications table (`id="certifications"`, **Verify** plus **PDF** when the file exists), and education with course-group cards and a "Studying now" card. Ends with "All résumé versions →".
2. Builds "My path": the "Elevation gained" chart with Now / 1 month / 3 months / 6 months buttons, a running count, and tiles for Projects, Certifications and Simulations. Every count and checkpoint note is computed from `content/data/timeline.ts`, so no new copy is invented. Below it, the winding dotted trail lists the timeline newest first, with a summit flag on 2028, a start flag on the first row, and a "Currently" badge on Now.
3. Builds `/resume`: heading and lead, an embedded preview of the latest PDF with **Download PDF** (just the button on phones), and "Earlier versions" rows labelled "Version of {D Month YYYY}" from the file names, newest first.
4. Builds the 404: "This page doesn't exist — but these do:" with Home, Work and About links.
5. Builds the threshold explorer per Build Spec §8: two native range sliders (review can never drop below step-up), a stacked allow / step-up / review bar, disputes caught and net savings in ₹ lakh, "Reset to chosen policy" showing the Content doc's chosen-policy line, fixed markers at the exact chosen thresholds, `aria-valuetext` on both sliders, results in an `aria-live="polite"` region, and the always-visible footnote. It is lazy-loaded so it doesn't weigh on the page's first load.
6. Placeholder mode: until `public/media/data/chargebacklens-thresholds.json` exists and passes validation, the page shows "Interactive explorer coming soon" — never made-up data.
7. Adds the "Try the thresholds yourself" section to the ChargebackLens MDX, using the Content doc's heading and intro.

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `app/about/page.tsx` | Create | About page; metadata |
| `app/resume/page.tsx` | Create | Résumé page; metadata |
| `app/not-found.tsx` | Create | Friendly 404 |
| `components/about/Story.tsx` | Create | Lead and three story paragraphs |
| `components/about/ElevationChart.tsx` | Create | Client: checkpoint chart, count and tiles |
| `components/about/TrailTimeline.tsx` | Create | Winding trail timeline, newest first |
| `components/about/CertificationsTable.tsx` | Create | Certifications with Verify and PDF links |
| `components/about/Education.tsx` | Create | Degree, course groups, studying now |
| `components/resume/ResumeViewer.tsx` | Create | PDF preview and download button |
| `components/resume/ResumeArchiveList.tsx` | Create | Dated earlier versions |
| `components/interactive/ThresholdExplorer.tsx` | Create | Server: loads and validates the JSON; placeholder or explorer |
| `components/interactive/ThresholdExplorerClient.tsx` | Create | Client: sliders, bar, outputs, reset |
| `lib/mdx.tsx` | Modify | Register `<ThresholdExplorer />` |
| `content/work/chargebacklens.mdx` | Modify | Add the explorer section |
| `tests/smoke.spec.ts` | Modify | About, Résumé, 404; explorer keyboard flow or placeholder |
| `tests/a11y.spec.ts` | Modify | Axe on About, Résumé, 404 and the explorer |
| `CHANGELOG.md` | Modify | PR 5 line |
| `TODO.md` | Modify | Thresholds JSON status, certificate PDFs |

### Done when

- [ ] About shows no robotics, no school or pre-degree details, and its counts match the timeline data.
- [ ] The Résumé page lists archived versions newest first; a missing archive shows no empty heading.
- [ ] The explorer works with the keyboard alone, announces changes to screen readers, and shows the placeholder when the JSON is removed.

## PR 6 — SEO, Writing and launch

**Branch:** `pr-6-seo-launch` · **Result:** the site is ready for production at diya-shrivastava-portfolio.vercel.app, with search and sharing text, link-preview images, analytics, hidden Writing pages and every budget checked in CI.

### What it does

1. Generates link-preview images (1200×630, Literata on the sage background): a site default plus one each for Work, About, Résumé and every project. Project images show the title, description and first card metric, per Content §10.
2. Adds JSON-LD: `Person` on Home (name, URL, email, GitHub and LinkedIn in `sameAs`, `alumniOf` LPU) and `CreativeWork` on each case study.
3. Adds `sitemap.ts` (all pages and all seven projects; no drafts, no Writing while the flag is off) and `robots.ts`.
4. Builds `/writing` and `/writing/[slug]` (title, date, reading time, summary). While `SHOW_WRITING` is off they return the 404 and stay out of the nav and sitemap; turning the flag on in `content/site.ts` is the only change needed later.
5. Adds Vercel Analytics (cookie-free, no banner) — the only third-party script.
6. Adds a link checker that requests every external URL in the content and data files (repos, demos, certificates, Forage) and fails CI on any error.
7. Adds Lighthouse CI on the mobile Home page with the Build Spec budgets as hard limits.
8. Finishes `README.md` with how to update copy, swap the résumé, add figures and videos, and turn on Writing.

### Files

| File | Action | Purpose |
| --- | --- | --- |
| `app/layout.tsx` | Modify | Add Vercel Analytics |
| `app/page.tsx` | Modify | Add `Person` JSON-LD |
| `app/work/[slug]/page.tsx` | Modify | Add `CreativeWork` JSON-LD |
| `app/sitemap.ts` | Create | Sitemap |
| `app/robots.ts` | Create | Robots rules and sitemap link |
| `app/opengraph-image.tsx` | Create | Default preview image |
| `app/work/opengraph-image.tsx` | Create | Work preview image |
| `app/work/[slug]/opengraph-image.tsx` | Create | One preview image per project |
| `app/about/opengraph-image.tsx` | Create | About preview image |
| `app/resume/opengraph-image.tsx` | Create | Résumé preview image |
| `app/writing/page.tsx` | Create | Post list (behind the flag) |
| `app/writing/[slug]/page.tsx` | Create | Single post (behind the flag) |
| `lib/og.tsx` | Create | Shared preview-image layout |
| `assets/fonts/Literata-SemiBold.ttf` | Create | Font file for preview images |
| `assets/fonts/PublicSans-Regular.ttf` | Create | Font file for preview images |
| `components/seo/JsonLd.tsx` | Create | Renders a JSON-LD script tag |
| `scripts/check-links.ts` | Create | External link checker |
| `lighthouserc.json` | Create | Lighthouse CI budgets |
| `package.json` | Modify | Add `@vercel/analytics`, `@lhci/cli`; `check:links` and `lhci` scripts |
| `package-lock.json` | Modify (generated) | Lockfile |
| `.github/workflows/ci.yml` | Modify | Add link check and Lighthouse jobs |
| `tests/seo.spec.ts` | Create | Titles, descriptions, canonicals, preview images, JSON-LD |
| `tests/smoke.spec.ts` | Modify | `/writing` returns 404 while the flag is off |
| `README.md` | Modify | Final maintenance guide |
| `CHANGELOG.md` | Modify | PR 6 line |
| `TODO.md` | Modify | Only items you still have to supply |

### Done when

- [ ] Lighthouse scores 95+ in all four categories on mobile Home; LCP under 2.0 s, CLS under 0.05, INP under 150 ms, first-load JS under 120 KB gzipped.
- [ ] Every page title and description matches Content §10, and every external link passes.
- [ ] The production URL passes every check above, and `TODO.md` lists only files you still need to drop in.

## Final file structure after all 6 PRs

The repo ends with 127 files from Claude Code (including generated files and the 15 caption files), plus your docs and media. Each entry shows the PR that created it; `you` marks files you add by hand.

```text
portfolio/
├── .github/workflows/ci.yml                 PR1 (PR6 adds link check + Lighthouse)
├── app/
│   ├── layout.tsx                           PR1 (PR6 adds analytics)
│   ├── page.tsx                             PR1 → PR3 Home, PR6 JSON-LD
│   ├── globals.css                          PR1
│   ├── icon.svg                             PR1
│   ├── not-found.tsx                        PR5
│   ├── sitemap.ts                           PR6
│   ├── robots.ts                            PR6
│   ├── opengraph-image.tsx                  PR6
│   ├── work/
│   │   ├── page.tsx                         PR4
│   │   ├── opengraph-image.tsx              PR6
│   │   └── [slug]/
│   │       ├── page.tsx                     PR4 (PR6 JSON-LD)
│   │       └── opengraph-image.tsx          PR6
│   ├── about/
│   │   ├── page.tsx                         PR5
│   │   └── opengraph-image.tsx              PR6
│   ├── resume/
│   │   ├── page.tsx                         PR5
│   │   └── opengraph-image.tsx              PR6
│   └── writing/
│       ├── page.tsx                         PR6
│       └── [slug]/page.tsx                  PR6
├── assets/fonts/
│   ├── Literata-SemiBold.ttf                PR6
│   └── PublicSans-Regular.ttf               PR6
├── components/
│   ├── layout/   Header, HeaderMark, NavLinks, MobileMenu, Footer,
│   │             Container, Section, SkipLink                     PR1
│   ├── ui/       Button, TextLink, DsMonogram                     PR1
│   │             Reveal                                           PR3
│   │             Callout, MetricBlock                             PR4
│   ├── home/     Hero, NowCard, FeaturedWork, Values, ApproachStrip,
│   │             CertificationsShowcase, Toolkit, ClosingContact  PR3
│   ├── work/     ProjectCard, MetricViz                           PR3
│   │             LearningProjects, ProjectRow, LearningRecordTable,
│   │             CaseStudyHeader, SincerityStamp, AtAGlance,
│   │             TableOfContents, Figure, DemoVideo, DocumentList,
│   │             Decision, PrevNextNav                            PR4
│   ├── about/    Story, ElevationChart, TrailTimeline,
│   │             CertificationsTable, Education                   PR5
│   ├── resume/   ResumeViewer, ResumeArchiveList                  PR5
│   ├── interactive/ ThresholdExplorer, ThresholdExplorerClient    PR5
│   └── seo/      JsonLd                                           PR6
│                 (every component is a .tsx file)
├── content/
│   ├── site.ts                              PR1
│   ├── data/
│   │   ├── certifications.ts                PR2
│   │   ├── forage.ts                        PR2
│   │   ├── timeline.ts                      PR2
│   │   ├── values.ts                        PR2
│   │   ├── toolkit.ts                       PR2
│   │   └── education.ts                     PR2
│   ├── work/
│   │   ├── clausecheck.mdx                  PR2
│   │   ├── chargebacklens.mdx               PR2 (PR5 adds the explorer)
│   │   ├── streakforge.mdx                  PR2
│   │   ├── deliveriq.mdx                    PR2
│   │   ├── healthops.mdx                    PR2
│   │   ├── parkease.mdx                     PR2
│   │   └── craftbridge.mdx                  PR2
│   └── writing/.gitkeep                     PR2
├── docs/                                    you (read-only for Claude Code)
│   ├── build-spec.md
│   ├── content.md
│   └── design-source.md
├── lib/
│   ├── fonts.ts                             PR1
│   ├── seo.ts                               PR1
│   ├── schemas.ts                           PR2
│   ├── content.ts                           PR2
│   ├── media.ts                             PR2
│   ├── media-manifest.generated.ts          PR2 (generated, git-ignored)
│   ├── mdx.tsx                              PR4 (PR5 registers the explorer)
│   └── og.tsx                               PR6
├── public/media/
│   ├── resume/
│   │   ├── Diya_Shrivastava.pdf             you (always the latest)
│   │   └── archive/Diya_Shrivastava_YYYY-MM-DD.pdf   you
│   ├── images/<slug>/
│   │   ├── fig-<name>.png                   you
│   │   ├── fig-<name>.png.meta.json         PR2 (15 caption files)
│   │   └── cover.png                        you (optional)
│   ├── videos/<slug>/demo.mp4, demo-poster.jpg   you (optional)
│   ├── documents/certificates/<cert-slug>.pdf    you (optional)
│   ├── documents/projects/<slug>/*.pdf            you (optional)
│   └── data/chargebacklens-thresholds.json        you
├── scripts/
│   ├── build-media-manifest.ts              PR2
│   ├── validate-content.ts                  PR2
│   └── check-links.ts                       PR6
├── tests/
│   ├── smoke.spec.ts                        PR1 (extended in PR3–PR6)
│   ├── a11y.spec.ts                         PR1 (extended in PR3–PR5)
│   └── seo.spec.ts                          PR6
├── .gitignore  .nvmrc  .prettierrc.json  .prettierignore            PR1
├── eslint.config.mjs  next.config.ts  postcss.config.mjs  tsconfig.json   PR1
├── next-env.d.ts  package.json  package-lock.json  playwright.config.ts  PR1
├── lighthouserc.json                        PR6
├── README.md                                PR1 (finished in PR6)
├── CHANGELOG.md                             PR1 (one line per PR)
└── TODO.md                                  PR1 (updated every PR)
```
