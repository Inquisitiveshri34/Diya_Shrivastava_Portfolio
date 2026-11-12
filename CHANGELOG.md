# Changelog

One line per pull request. Newest first.

- **PR 4: Work page and case studies.** `/work` with the four featured cards, a closed-by-default learning toggle and the Forage table; `/work/[slug]` for all seven projects from the MDX files, with the 誠 stamp, Role / Stack / Context table, At a glance (mini-charts where the data supports them), the MDX body with a sticky "On this page" list from 1024px, the Limitations callout, figures, demo video and documents that render only when their files exist, and previous / next across the featured four. Tests cover the seven slugs, the 404, the toggle, prev / next order and axe on each page.

- **PR 3: Home page.** The seven Home sections from the design, with the hero and Now card, four featured project cards and the MetricViz mini-charts, values, approach steps, certifications, toolkit and closing band. Fade-and-rise on scroll that is off under reduced motion. Tests cover the hero, the phone viewport, card order, learning projects, token-only colours and zero axe violations on the full page.
- **PR 2: Content and media layer.** Zod schemas, seven project MDX files and site data copied from `docs/content.md`, the media manifest script with pre-scripts, content validation, and the 15 figure caption sidecars.
- **PR 1: Foundation and design system.** Next.js App Router site with Design Source tokens, fonts, layout shell (header, footer, mobile menu), placeholder Home, Playwright tests at 390px and 1280px with axe checks, and CI.
