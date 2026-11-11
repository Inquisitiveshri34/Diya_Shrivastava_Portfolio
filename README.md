# Diya Shrivastava — Portfolio

Personal portfolio for Diya Shrivastava: applied machine learning and GenAI case studies, a résumé, and an About page. Live at [diya-shrivastava-portfolio.vercel.app](https://diya-shrivastava-portfolio.vercel.app).

## Stack

- Next.js (App Router), React and TypeScript (`strict`)
- Tailwind CSS v4, with design tokens defined as CSS variables in `app/globals.css`
- Fonts via `next/font`: Literata, Public Sans, Roboto Mono
- Playwright and `@axe-core/playwright` for end-to-end and accessibility tests
- Hosted on Vercel; every route is prerendered as static HTML

## Getting started

Requires Node 26 (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Scripts

| Command                | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the development server                         |
| `npm run build`        | Production build (prerenders every route)            |
| `npm run start`        | Serve the production build                           |
| `npm run lint`         | ESLint                                               |
| `npm run typecheck`    | TypeScript with `--noEmit`                           |
| `npm run format`       | Prettier, write changes                              |
| `npm run format:check` | Prettier, check only                                 |
| `npm run test:e2e`     | Playwright at 390px and 1280px, including axe checks |

First time running the tests, install the browser once:

```bash
npx playwright install chromium
```

## Testing

Two Playwright projects run every test: `mobile-390` (390×844, touch) and `desktop-1280` (1280×800). Tests live in `tests/`:

- `tests/smoke.spec.ts`: page shell, header, footer, skip link, phone menu
- `tests/a11y.spec.ts`: zero WCAG 2.2 AA axe violations on Home and the 404 page

CI (`.github/workflows/ci.yml`) runs lint, typecheck, build and the end-to-end tests on every push to `main` and on every pull request.

## Deployment

Vercel builds the site from `main`, and every pull request gets a preview deployment. No environment variables are needed.

## Folder map

```
app/                  Routes (App Router), global styles and the root layout
  globals.css         Design tokens, @theme mapping, base styles, reduced motion
  layout.tsx          Fonts, skip link, header, main, footer, default metadata
  page.tsx            Home
  icon.svg            "DS" favicon
components/
  layout/             Header, header mark, navigation, phone menu, footer, containers, sections
  ui/                 Buttons, text links, DS monogram
content/
  site.ts             Name, contact details, availability, Now items, nav, SHOW_WRITING
lib/
  fonts.ts            next/font setup
  seo.ts              pageMetadata() helper and the site URL
tests/                Playwright smoke and accessibility tests
docs/                 Read-only project references (Build Spec, Content, Design Source, mock-ups); excluded from the build, lint, types and formatting
public/media/         Images, résumé PDF and other media (added by hand; not tracked for formatting)
```

## Where things come from

- Design (colours, fonts, spacing, layout): `docs/design-source.md`
- Words and numbers: `docs/content.md`
- Stack, rules and performance budgets: `docs/build-spec.md`
- Build plan and PR checklists: `docs/Portfolio Website — Development Plan (6 PRs).md`

## Project files

- [CHANGELOG.md](CHANGELOG.md): one line per pull request
- [TODO.md](TODO.md): open placeholders and missing assets
