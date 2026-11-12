# Diya Shrivastava — Portfolio

Personal portfolio for Diya Shrivastava: applied machine learning and GenAI case studies, a résumé, and an About page. Live at [diya-shrivastava-portfolio.vercel.app](https://diya-shrivastava-portfolio.vercel.app).

## Stack

- Next.js (App Router), React and TypeScript (`strict`)
- Tailwind CSS v4, with design tokens defined as CSS variables in `app/globals.css`
- Fonts via `next/font`: Literata, Public Sans, Roboto Mono
- Link previews generated with `next/og` from static Literata and Public Sans files in `assets/fonts/`
- Vercel Analytics (`@vercel/analytics`), the only third-party script
- Playwright and `@axe-core/playwright` for end-to-end and accessibility tests; Lighthouse CI for budgets
- Hosted on Vercel; every route is prerendered as static HTML

## Getting started

Requires Node 26 (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Scripts

| Command                | What it does                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                                    |
| `npm run build`        | Production build (prerenders every route and the preview images)                |
| `npm run start`        | Serve the production build                                                      |
| `npm run lint`         | ESLint                                                                          |
| `npm run typecheck`    | TypeScript with `--noEmit`                                                      |
| `npm run format`       | Prettier, write changes                                                         |
| `npm run format:check` | Prettier, check only                                                            |
| `npm run test:e2e`     | Playwright at 390px and 1280px, including axe and SEO checks                    |
| `npm run check:links`  | Request every external URL in `content/` and fail on any error                  |
| `npm run lhci`         | Lighthouse CI on the mobile Home page against `lighthouserc.json` (build first) |

First time running the tests, install the browser once:

```bash
npx playwright install chromium
```

## Testing

Two Playwright projects run every test: `mobile-390` (390×844, touch) and `desktop-1280` (1280×800). Tests live in `tests/`:

- `tests/smoke.spec.ts`: page shell, header, footer, skip link, phone menu, and `/writing` returning 404
- `tests/a11y.spec.ts`: zero WCAG 2.2 AA axe violations on Home and the 404 page
- `tests/seo.spec.ts`: titles, descriptions and canonicals against docs/content.md §10, preview images (200, PNG), JSON-LD, sitemap and robots

CI (`.github/workflows/ci.yml`) runs lint, typecheck, build and the end-to-end tests on every push to `main` and on every pull request. After the build, two more jobs run: the external link check and Lighthouse CI.

## Deployment

Vercel builds the site from `main`, and every pull request gets a preview deployment. No environment variables are needed.

## How to update the site

### Copy

- **Home, About, Work and Résumé text** lives in the page files under `app/` and the components under `components/`. The text follows `docs/content.md`; change that document first.
- **Name, contact details, availability, the Now card and the navigation** are in `content/site.ts`.
- **Each case study** is one MDX file in `content/work/`. Its frontmatter holds the card text, the metrics, the "At a glance" table and the links. The search and preview description for each project is different from its card summary, and lives in `PROJECT_DESCRIPTIONS` in `lib/og.tsx`, copied from `docs/content.md` §10.
- **Certifications, education, timeline and toolkit** are in `content/data/`.
- The build fails with a message that names the file and the field when content is invalid (`npm run validate:content`).

### Page titles and descriptions

Every page calls `pageMetadata()` in `lib/seo.ts`. Titles follow _Page · Diya Shrivastava_; the home title is the default. Change the words in the page file and in `docs/content.md` §10, then run `npm run test:e2e`: the SEO tests fail if a page drifts from §10.

### Swap the résumé

1. Move the current PDF to the archive, named with the date it was **replaced**: `public/media/resume/archive/Diya_Shrivastava_YYYY-MM-DD.pdf`. The date must be `YYYY-MM-DD`, or the build fails.
2. Put the new PDF at `public/media/resume/Diya_Shrivastava.pdf` (the file name is fixed).
3. Run `npm run build`. The résumé page and the "Earlier versions" list update from the archive folder.

### Add figures

1. Put the PNG in `public/media/images/<project-slug>/`, with a kebab-case name such as `fig-funnel.png`.
2. Add a sidecar `fig-funnel.png.meta.json` beside it with `alt` (required), and optionally `caption`, `title` and `date`.
3. Reference it from the project's MDX file. A PNG without its sidecar, or a sidecar without its PNG, is skipped with a warning at build time.

### Add a demo video

Put the video at `public/media/videos/<project-slug>/demo.mp4`. An optional `demo-poster.jpg` beside it becomes the poster frame. A `demo.mp4.meta.json` with `externalUrl` links to a YouTube copy.

### Add the ChargebackLens thresholds

Export the thresholds JSON from the ChargebackLens repository to `public/media/data/chargebacklens-thresholds.json`. The build validates it when present. The threshold explorer on the ChargeBack case study reads this file. Without it, the section shows "Interactive explorer coming soon".

### Turn on Writing

1. In `content/site.ts`, set `SHOW_WRITING = true`.
2. Add a post as an MDX file in `content/writing/` with `title`, `date` (`YYYY-MM-DD`), `summary` and optional `tags`. Set `draft: true` to keep a post out of production.
3. **Still to do:** Writing is not yet in the header or footer navigation. The `NAV_LINKS` list in `content/site.ts` needs a Writing entry when the flag turns on. It is pending a decision (see the pull request).
4. Writing's own page description is a placeholder (`TODO` in `app/writing/page.tsx`) because `docs/content.md` §10 does not have one yet. Replace it before publishing.

## Where things come from

- Design (colours, fonts, spacing, layout): `docs/design-source.md`
- Words and numbers: `docs/content.md`
- Stack, rules and performance budgets: `docs/build-spec.md`
- Build plan and PR checklists: `docs/Portfolio Website — Development Plan (6 PRs).md`

## Performance budgets

`lighthouserc.json` holds the budgets, which are hard limits in CI: Performance, Accessibility, Best Practices and SEO at 95 or above; LCP under 2.0 s; CLS under 0.05; Total Blocking Time under 150 ms (a lab proxy for INP, which Lighthouse cannot measure); and the transferred script size of the Home page at 120 KiB gzipped. Lower a budget only with a written reason in the pull request.

## Fonts and licences

The two preview-image fonts are static instances of the variable fonts from Google Fonts, which are licensed under the SIL Open Font License 1.1:

- `assets/fonts/Literata-SemiBold.ttf` (from Literata, by the Literata Project Authors)
- `assets/fonts/PublicSans-Regular.ttf` (from Public Sans, by the Public Sans Project Authors)

The licence texts are in `assets/fonts/LICENSE-Literata.txt` and `assets/fonts/LICENSE-PublicSans.txt`. The page fonts are loaded by `next/font` from Google Fonts at build time.

## Folder map

```
app/                  Routes (App Router), global styles and the root layout
  globals.css         Design tokens, @theme mapping, base styles, reduced motion
  layout.tsx          Fonts, skip link, header, main, footer, analytics, default metadata
  page.tsx            Home
  opengraph-image.tsx Default link-preview image (also one per route, see below)
  sitemap.ts          Sitemap (no drafts; Writing only while SHOW_WRITING is on)
  robots.ts           Robots rules and the sitemap link
  work/[slug]/opengraph-image.tsx  One preview image per project
  writing/            Post list and single post, hidden behind SHOW_WRITING
components/
  layout/             Header, header mark, navigation, phone menu, footer, containers, sections
  seo/JsonLd.tsx      Person (Home) and CreativeWork (case studies) JSON-LD
  ui/                 Buttons, text links, DS monogram
assets/fonts/         Static Literata and Public Sans for preview images, with licences
content/
  site.ts             Name, contact details, availability, Now items, nav, SHOW_WRITING
  work/               Seven project MDX files
  writing/            Posts (none yet)
  data/               Certifications, education, timeline, toolkit, values, Forage
lib/
  og.tsx              Preview-image layout, colour tokens, project descriptions (docs/content.md §10)
  seo.ts              pageMetadata() helper and the site URL
scripts/
  check-links.ts      External link checker (content/ and content/data/)
  build-media-manifest.ts, validate-content.ts
tests/                Playwright smoke, accessibility and SEO tests
lighthouserc.json     Lighthouse CI budgets
docs/                 Read-only project references (Build Spec, Content, Design Source, mock-ups); excluded from the build, lint, types and formatting
public/media/         Images, résumé PDF and other media (added by hand; not tracked for formatting)
```

## Project files

- [CHANGELOG.md](CHANGELOG.md): one line per pull request
- [TODO.md](TODO.md): the files still to be supplied
