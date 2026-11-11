
# Portfolio Website — Build Spec for Claude Code
 
Nov 11, 2026 · @Diya Shrivastava
 
## 0. How to use this spec (instructions to Claude Code)
 
Build Diya Shrivastava's personal portfolio website exactly as specified below, in the phases listed in Section 11. Read the whole spec before writing any code.
 
1. Read every section, then write a short implementation plan (files, components, phases) and confirm it before coding.
2. Build one phase at a time. At the end of each phase, run `npm run lint`, `npm run typecheck`, `npm run build` and the Playwright tests, and fix every error before moving on.
3. Treat the design tokens in Section 3 and the copy in Sections 6–7 as fixed. Do not invent new colours, fonts, metrics or claims.
4. Never fabricate content. Every number on this site is a real result. Where a value, link or asset is missing, insert a visible `TODO:` placeholder and list it in `TODO.md`. Never fill gaps with plausible-looking numbers.
5. Prefer simple, readable code over clever abstractions. Server Components by default; add `"use client"` only where interaction needs it.
6. If something in this spec is ambiguous or conflicts with a library's current API, stop and ask instead of guessing.
7. Keep a `CHANGELOG.md` with one line per completed phase.
The guiding feeling for every decision: **open, trustworthy and sincere** — a person who wants to make a space in the world and add real value to it. Light, warm, spacious, honest. Never dark, flashy or boastful.
 
## 1. Project overview
 
A light, editorial-style personal site that proves one thesis: **Diya builds ML and GenAI systems whose outputs can be trusted and acted on.** It replaces a résumé skim with evidence: case studies, honest metrics and one interactive demo.
 
**Owner:** Diya Shrivastava — third-year B.Tech CSE (Software Product Engineering), Lovely Professional University, CGPA 9.10/10, based in Ahmedabad, India.
 
**Primary goal:** win AI/ML, Data Science and Data Analysis internship interviews, with fintech and research-oriented roles as a strong secondary focus.
 
### Audiences, in priority order
 
| Audience | Time on site | What they need |
| --- | --- | --- |
| Recruiter / HR screener | 10–30 seconds, often on a phone | Who she is, what she does, résumé button, contact |
| Hiring manager / ML engineer | 3–8 minutes | Real problems, design decisions, evaluation rigour, code links |
| Interviewer preparing questions | 10+ minutes | Case-study depth, trade-offs, limitations |
| Research supervisors (e.g., summer research programmes) | 3–5 minutes | Curiosity, rigour, honest reporting, learning trajectory |
 
### Success criteria
 
- A recruiter can find the résumé PDF and email within **one screen** on a 375px-wide phone.
- Every featured project has a full case study with problem, data, approach, evaluation, results, limitations and next steps.
- Lighthouse scores of **95+** for Performance, Accessibility, Best Practices and SEO on the home page (mobile).
- All text meets **WCAG 2.2 AA** contrast; the site is fully keyboard-navigable.
- No fabricated or unverified numbers anywhere.
- The site feels warm, open and sincere at first glance — never dark, flashy or boastful.
## 2. Tech stack and tooling
 
Use the latest stable versions at build time and check each library's current docs before using its API.
 
| Area | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js, App Router | Static generation for every page (`generateStaticParams` for dynamic routes). No server runtime needed. |
| Language | TypeScript, `strict: true` | No `any`. Typed content schemas. |
| Styling | Tailwind CSS (v4) | Design tokens from Section 3 defined as CSS variables and mapped into the Tailwind theme. |
| Content | MDX files in `/content` | Frontmatter parsed with `gray-matter`, validated with `zod`; compiled with `next-mdx-remote/rsc` (or `@next/mdx` if simpler). |
| Fonts | `next/font/google` | Fraunces (headings), Inter (body), JetBrains Mono (metrics). Self-hosted, `display: swap`. |
| Icons | `lucide-react` | 1.5px stroke, used sparingly. |
| Charts | Hand-built SVG components or `visx` | Only for case-study figures and the interactive explorer. No heavy chart libraries. |
| Motion | CSS transitions; `motion` package only if needed | Must respect `prefers-reduced-motion`. |
| OG images | `next/og` (`ImageResponse`) | One generated image per page and per project. |
| Analytics | Vercel Analytics | Cookie-free; no consent banner needed. |
| Code quality | ESLint, Prettier, `tsc --noEmit` | Run on every phase. |
| Testing | Playwright + `@axe-core/playwright` | Smoke tests for every route and automated accessibility checks. |
| CI | GitHub Actions | Lint, typecheck, build and Playwright on every push to `main` and on pull requests. |
| Hosting | Vercel | Vercel project diya-shrivastava-portfolio, served at https://diya-shrivastava-portfolio.vercel.app. |
 
**Do not add:** a CMS, a database, authentication, a UI component kit (shadcn/MUI/Chakra), Three.js, particle backgrounds, or a dark-mode toggle. The site is light-only by design.
 
## 3. Design system
 
The look is a well-lit study with the window open: warm paper background, deep ink text, one calm teal accent, generous space, and a serif voice for headings. Light theme only.
 
### 3.1 Colour tokens
 
Define these as CSS variables in `app/globals.css` and map them into the Tailwind theme. Use no other colours.
 
```css
:root {
  --bg: #FAF8F4;          /* warm paper, page background */
  --surface: #FFFFFF;     /* cards, case-study panels */
  --surface-muted: #F3F0EA; /* alternating sections, code blocks */
  --border: #E8E4DC;      /* hairline borders and dividers */
  --ink: #1F2A37;         /* headings and body text */
  --ink-muted: #5B6472;   /* secondary text, captions, metadata */
  --accent: #1F6F6B;      /* links, primary button, focus ring */
  --accent-hover: #185956;
  --accent-tint: #E7F0EC; /* soft background behind key metrics */
  --warn-tint: #FBF1E4;   /* "Limitations" callouts */
  --warn-ink: #8A5A1F;
}
```
 
| Rule | Detail |
| --- | --- |
| Accent use | Links, primary button, focus ring, small section labels. Never large accent-coloured blocks. |
| Contrast | Body text `--ink` on `--bg`; secondary text no lighter than `--ink-muted`. Verify AA with axe. |
| Forbidden | Gradients, glows, glassmorphism, neon, pure black `#000`, pure white page background. |
 
### 3.2 Typography
 
| Use | Font | Size (mobile → desktop) | Weight / line-height |
| --- | --- | --- | --- |
| Display (hero name/line) | Fraunces | 40px → 60px | 500 / 1.1, slight negative tracking |
| H1 (page titles) | Fraunces | 34px → 46px | 500 / 1.15 |
| H2 (section titles) | Fraunces | 26px → 32px | 500 / 1.25 |
| H3 | Inter | 19px → 21px | 600 / 1.35 |
| Body | Inter | 17px → 18px | 400 / 1.65 |
| Small / captions | Inter | 14px → 15px | 400 / 1.5, `--ink-muted` |
| Section eyebrow labels | Inter | 13px, uppercase, 0.08em tracking | 600, `--accent` |
| Metrics and code | JetBrains Mono | 15px → 16px | 500 |
 
Use fluid sizes with `clamp()`. Prose blocks max out at about 68 characters per line.
 
### 3.3 Layout and spacing
 
- **Reading column:** `max-width: 720px` for prose. **Wide column:** `max-width: 1120px` for project grids and figures. Side gutter 20px on mobile, 32px on desktop.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Space between home-page sections: 96px mobile, 128px desktop.
- **Radius:** 10px for cards, 8px for buttons, 6px for tags.
- **Borders over shadows:** 1px `--border` on cards. Optional single soft shadow on hover only: `0 2px 12px rgba(31,42,55,0.06)`.
- **Breakpoints:** 375px (base), 640px, 1024px, 1280px. Design mobile-first.
### 3.4 Core components
 
| Component | Spec |
| --- | --- |
| Header | Name as text wordmark (Fraunces) on the left; links Work, Writing, About, Résumé on the right. Sticky, `--bg` at 90% opacity with a hairline bottom border after scrolling. Mobile: simple disclosure menu, no full-screen overlay. |
| Primary button | `--accent` background, white text, 8px radius, 12px × 20px padding. |
| Secondary button | Transparent, 1px `--ink` border at 20% opacity, `--ink` text. |
| Text link | `--accent`, underline offset 3px, underline thickens on hover. |
| Project card | White surface, hairline border; small eyebrow (domain), Fraunces title, one-sentence "who it helps" line, two key metrics in mono on `--accent-tint`, 3–5 tech tags, "Read case study →". Whole card is one link. |
| Metric block | Large mono number, one-line label, and a mandatory context line (baseline or denominator) in `--ink-muted`. |
| Callout | Left 3px border. Variants: `note` (accent), `limitation` (`--warn-tint`/`--warn-ink`). |
| Tag | 13px Inter, `--surface-muted` background, `--ink-muted` text. |
| Footer | Email, GitHub, LinkedIn, LeetCode; "Last updated: {date}" generated at build time; a one-line sign-off. |
 
### 3.5 Motion
 
- Fade-and-rise on scroll (opacity 0→1, translateY 8px→0, 400ms ease-out), applied once per section.
- Hover transitions 150–200ms.
- Nothing that loops, bounces, follows the cursor or auto-plays.
- Under `prefers-reduced-motion: reduce`, disable all transforms and animations.
### 3.6 Imagery
 
- No portrait photo for now. The hero is typographic.
- Project figures are Diya's own screenshots and charts, restyled to the site palette where possible, with descriptive alt text.
- Use a small hand-drawn-style SVG motif (for example, a simple open-window or rising-line mark in `--accent`) at most once, in the hero or favicon.
- No stock photos, robot or brain illustrations, or AI-generated art.
- Favicon: "DS" monogram in Fraunces, `--accent` on `--bg`.
## 4. Voice and copy guidelines
 
Write the way Diya would explain her work to a mentor she respects: first person, plain words, specific, warm, and honest about limits.
 
| Do | Don't |
| --- | --- |
| Start each project with **who it helps** and the problem they have | Start with the tech stack |
| Give every metric its context ("93.5% recall@5 — 29 of 31 questions") | Show bare or rounded-up numbers |
| Name what didn't work and what's unfinished | Hide limitations or claim production use that didn't happen |
| Say "I" for own work and "we" with named teammates for team work | Claim sole credit for team projects |
| Use short sentences (under 25 words) and short paragraphs (3 sentences max) | Write long, dense blocks |
| Use plain verbs: built, tested, measured, shipped | Use "passionate", "ninja", "rockstar", "cutting-edge", "revolutionary", "leveraging synergies" |
| Indian conventions: ₹ and lakh (₹11.99L) where the project used them; British/Indian spelling (optimise, analyse) | Mix spellings across pages |
 
The three values the site expresses, in this exact wording wherever they appear:
 
1. **Honest numbers.** Every metric shown with its baseline and its limits.
2. **Decisions, not just predictions.** A model is only useful when its output is something someone can act on.
3. **Work that lasts beyond the demo.** Tests, documentation, and saying what's unfinished.
## 5. Information architecture and routes
 
Six routes plus generated files. Keep navigation to four items so a recruiter never has to think.
 
| Route | Purpose | Notes |
| --- | --- | --- |
| `/` | Home: thesis, featured work, values, now, contact | Must answer "who, what, résumé, contact" in the first screen |
| `/work` | All projects: 4 featured + collapsed "Learning projects" + learning record | Featured first; learning projects hidden behind a toggle |
| `/work/[slug]` | Case study per project | Slugs: `clausecheck`, `chargebacklens`, `deliveriq`, `healthops`, `parkease`, `craftbridge` |
| `/writing` | Short technical notes | Hidden from nav and sitemap until at least one post is published (`SHOW_WRITING` flag) |
| `/writing/[slug]` | Individual post | MDX |
| `/about` | Professional story, degree timeline, values, certifications, education | — |
| `/resume` | Latest résumé (embedded PDF preview + download) and *Earlier versions* list | Built from `public/media/resume/` (Section 9.5); linked from the footer and About as "All résumé versions" |
| `/media/resume/Diya_Shrivastava.pdf` | The latest résumé file | Header "Résumé" link and Home button open this directly in a new tab |
| `not-found` | Friendly 404 | "This page doesn't exist — but these do:" + links to Home and Work |
| `sitemap.xml`, `robots.txt`, `opengraph-image` | Generated | See Section 10 |
 
**Header nav:** Work · Writing (once live) · About · Résumé.
 
**Contact** is a section on Home and in the footer, not a separate page. No contact form — a plain `mailto:` link is more trustworthy and has no spam risk. Do not publish the phone number anywhere on the site.
 
## 6. Page-by-page specification
 
Use the copy below verbatim. Sections are listed top to bottom.
 
### 6.1 Home (`/`)
 
**1. Hero** — reading column, generous top padding (96px desktop).
 
- Eyebrow: `APPLIED ML & GENAI · AHMEDABAD, INDIA`
- Display line: **I'm Diya. I build machine-learning systems people can rely on.**
- Subline: *Models that know how confident they are, and AI assistants that show their sources — or say "I don't know." I care about work that's useful beyond the demo.*
- Availability line (small, with a soft accent dot): *Open to AI/ML and Data Science internships — available now.*
- Buttons: **See my work** (primary → `/work`) and **Download résumé** (secondary → `/media/resume/Diya_Shrivastava.pdf`, new tab).
- Small text links underneath: Email · GitHub · LinkedIn.
**2. Featured work** — eyebrow `SELECTED WORK`, H2 *Latest problems I've worked on.* Four project cards in this order: ClauseCheck, ChargebackLens, StreakForge, DeliverIQ (content in Section 7). Desktop: a 2 × 2 grid; mobile: one column. The learning projects never appear on Home. Link under the grid: *All projects →*
 
**3. What I care about** — eyebrow `WHAT I CARE ABOUT`, H2 *How I try to work.* The three values from Section 4, as three short columns on desktop and stacked on mobile. No icons, or one small line icon each.
 
**4. How I approach a problem** — a horizontal four-step strip (vertical on mobile), connected by a thin line:
 
1. **Understand the decision** — who will act on the output, and what a mistake costs them.
2. **Respect the data** — clean it, question it, and split it the way time actually flows.
3. **Evaluate honestly** — baselines, calibration, and the cases where it fails.
4. **Ship something usable** — tested, documented, and clear about its limits.
**5. Now** — eyebrow `NOW`, H2 *What I'm doing these days.* Two short bullets plus "Updated {month year}". Use exactly these:
 
- Third year of B.Tech CSE at LPU, currently studying Design & Analysis of Algorithms and DevOps.
- Practising data structures and algorithms in Java on Codeforces.
**6. Toolkit** — eyebrow `TOOLKIT`, compact grouped tag lists, no skill bars or percentages:
 
| Group | Items |
| --- | --- |
| Core | Python, Java, SQL |
| Machine learning | Scikit-learn, feature engineering, model calibration, NLP |
| GenAI | RAG, embeddings, hybrid retrieval (BM25 + RRF), cross-encoder re-ranking, LLM evaluation |
| Data | NumPy, Pandas, Plotly, Matplotlib, Seaborn, Tableau, Excel, Streamlit |
| Engineering | Git, GitHub Actions, pytest, Docker, FastAPI, Azure, Databricks |
 
**7. Credentials strip** — one quiet line of text, not badge images: *Microsoft Certified: PL-200, PL-900, AI-900, GH-900 · Databricks Fundamentals · Anthropic Academy: AI Fluency, Claude 101.* Link → `/about#certifications`.
 
**8. Closing / contact** — on `--surface-muted` background, centred, reading width.
 
- H2: *Let's build something useful.*
- Body: *I'm looking for a place where I can learn fast and contribute to problems that matter. If that sounds like your team, I'd love to hear from you.*
- Primary button: **Email me** (`mailto:diyashrivastava34@gmail.com`), plus GitHub and LinkedIn links.
### 6.2 Work (`/work`)
 
- H1: *Work* · Lead: *Projects where I owned the path from raw data to something people could use.*
- Featured: the four cards, same order as Home, 2 × 2 on desktop.
- **Learning projects (collapsed):** below the featured grid, only a toggle button is visible: *Show 3 earlier learning projects*. Clicking it reveals the heading, lead and compact rows (title, one line, period, tags, link) for HealthOps, ParkEase and CraftBridge; the button then reads *Hide learning projects*. Build it as a `<button aria-expanded aria-controls>` controlling a region with the `hidden` attribute (or a native `<details>`), so the rows are not visible or focusable until opened. It starts closed on every page load — don't remember the state. The three pages stay reachable by URL and in the sitemap, but prev/next links on case studies cycle only through the four featured projects.
- **Learning record:** a compact table of Forage job simulations — British Airways (Data Science, May 2026), BCG (Data Science, Apr 2026), Commonwealth Bank (Intro to Data Science, Apr 2026), JPMorgan Chase (Quantitative Research, Apr 2026), Deloitte (Data Analytics, Apr 2026) — each with one plain-language line from Section 7.7. Label clearly as *job simulations*.
### 6.3 Case study (`/work/[slug]`)
 
One MDX file per project, rendered with this fixed structure:
 
1. **Header:** eyebrow (domain · year), H1 title, one-sentence summary, meta row (role · team · duration · stack), links (GitHub, live demo, video).
2. **At a glance:** 3–4 metric blocks, each with its context line.
3. **The problem** — who has it and why it matters.
4. **The data** — source, size, what was messy and how it was cleaned.
5. **Approach** — key design decisions, each with the alternative considered and why it was rejected.
6. **Evaluation** — how success was measured; figures with captions.
7. **Results.**
8. **Limitations** — rendered in the `limitation` callout. Mandatory.
9. **What I'd do next.**
10. **Footer nav:** previous / next project, back to Work.
Add a sticky "On this page" table of contents on desktop (≥1024px) only. Live-demo links show a small note: *Demo may take \~30 seconds to wake up.* Each case study embeds `the demo video from public/media/videos/<slug>/ when one is present (Section 9.5`).
 
### 6.4 About (`/about`)
 
- H1: *About* · Lead: **I build machine-learning systems that are honest about what they know.**
- **My story** — professional only; no personal details, no robotics. Use this text verbatim, with the bold phrases bolded:
  - *Most of my projects end with a question that isn't about the model: **what will someone actually do with this output?** A dispute-risk score is only useful once it becomes a decision — allow, challenge or review — with a rupee cost attached. A contract assistant is only useful if a procurement team can check every answer against the clause it came from.*
  - *That question shapes how I work. I split data the way time actually flows, so a model never learns from the future. I **calibrate** scores so that a 10% risk really means 10%. And I test what a system does when it doesn't know: ClauseCheck **refuses rather than guesses**, and ChargebackLens shows the segments where it **shouldn't be deployed at all**. Some of my most important results are the ones that say no.*
  - *I study Computer Science (Software Product Engineering) at Lovely Professional University, where I hold a 9.10 CGPA. I started out building full-stack and mobile apps before moving into machine learning and GenAI. I'm looking for a team that has shipped models into the real world, and where being careful is treated as part of being good.*
- **Timeline** — vertical, newest last. Everything before the degree stays vague; the degree years are exact.
  - **Before 2024** — School education (CBSE, Science stream) and foundational studies.
  - **2024** — Began B.Tech CSE (Software Product Engineering) at Lovely Professional University, batch 2024–2028.
  - **Jan–Feb 2026** — Built ParkEase, a full-stack smart parking platform.
  - **Feb 2026** — Microsoft Azure AI Fundamentals (AI-900) and GitHub Foundations (GH-900).
  - **Feb–Mar 2026** — Built CraftBridge, a marketplace app for local artisans.
  - **Mar 2026** — Anthropic Academy: AI Fluency and Claude 101.
  - **Mar–Apr 2026** — Built HealthOps, hospital resource analytics.
  - **Apr–May 2026** — Five Forage job simulations (BCG, JPMorgan Chase, Deloitte, Commonwealth Bank, British Airways); built DeliverIQ.
  - **Jun 2026** — Completed four semesters, CGPA 9.10/10.
  - **Aug 2026** — Microsoft Power Platform PL-900 and PL-200.
  - **Aug–Sep 2026** — Built ChargebackLens for the Razorpay AI Buildathon.
  - **Sep 2026** — Databricks Fundamentals.
  - **Sep–Oct 2026** — Built ClauseCheck (group project).
  - **Now** — Third year; available for internships.
  - **2028** — Expected graduation.
- **What I care about** — the three values again.
- **Certifications** (`id="certifications"`): the table in Section 7.8.
- **Education:** B.Tech CSE (Software Product Engineering), Lovely Professional University, 2024–2028, CGPA 9.10/10; relevant courses (Data Structures & Algorithms, Database Management Systems, Operating Systems, Object-Oriented Programming, Discrete Mathematics, Design & Analysis of Algorithms, DevOps Fundamentals, Full-Stack Development). School details are not shown.
- Link at the end: *All résumé versions →* `/resume`.
### 6.5 Writing (`/writing`)
 
List of posts: title, date, reading time, one-line summary. Behind the `SHOW_WRITING` flag until the first post exists. Suggested first titles (Diya writes them): *Why I shipped a calibrated Logistic Regression instead of XGBoost*; *What actually moved recall in hybrid retrieval*; *Temporal splits: how I nearly leaked the future into a fraud model.*
 
## 7. Project content
 
The separate "Portfolio Website — Content" doc is the single source of truth for every word, figure, caption and alt text on the site, including a seventh project, StreakForge (slug streakforge). Where this section differs from it, the content doc wins. Put each project in `content/work/<slug>.mdx`. `Items marked "from repo analysis" are filled during the build by the step in Section 13`.
 
### 7.1 ClauseCheck — Procurement RAG Assistant (featured #1)
 
- **Slug / domain / dates:** `clausecheck` · Legal & procurement · Sep–Oct 2026
- **Role:** Group project (team of 2); teammates are not named on the site. Diya owned ingestion, retrieval, end-to-end integration and the v1–v3 releases.
- **Stack:** Python, ChromaDB, BM25, Sentence-Transformers, Groq, Gemini, SQLite, FastAPI, Streamlit
- **Card line (who it helps):** *Procurement teams lose hours hunting through supplier contracts. ClauseCheck answers their questions with the exact clause cited — and refuses when the contracts don't say.*
- **Card metrics:** `93.5% recall@5` (gold clause in top 5 for 29 of 31 questions) · `100% correct refusals` (3.2% false refusals)
- **At a glance:** 158 contracts · 69 suppliers · \~8K clause chunks · 375 passing tests · 1–5 s answers
- **Approach (known decisions):**
  - Clause-aware chunking instead of fixed-size chunks, so each retrieved unit is a meaningful clause.
  - Hybrid retrieval: vector search + BM25, fused with Reciprocal Rank Fusion; cross-encoder re-ranking on top.
  - Amendment expansion, so a clause's later amendments are retrieved with it.
  - Deterministic citation and figure verification after generation; answers that fail verification become refusals.
  - `Alternatives considered and why each was rejected: from repo analysis.`
- **Integration story:** resolved 37 cross-module defects while leading end-to-end integration.
- **Evaluation:** 31-question gold set for retrieval; refusal tests for unanswerable questions. `How the gold set was built: from repo analysis.`
- **Figures:** from repo analysis — export the evaluation charts and app screenshots the repo already contains (for example, retrieval recall by method, a cited answer and a correct refusal) into `public/media/images/clausecheck/`. Show only figures the repo can produce.
- **Limitations and what I'd do next:** from repo analysis.
- **Context line on the page:** *Built during a simulated industry sprint, as a group project.*
- **Links:** GitHub `https://github.com/kalviumcommunity/S66-0926-DY-RAG-ClauseCheck · no live demo · video from public/media/videos/clausecheck/ when present`
### 7.2 ChargebackLens — Transaction Dispute Risk & Decision Engine (featured #2)
 
- **Slug / domain / dates:** `chargebacklens` · Payments & fintech risk · Aug–Sep 2026 · Built for the Razorpay AI Buildathon, Track 02: AI Risk Manager
- **Role:** `Solo project.`
- **Stack:** Python, NumPy, Pandas, Scikit-learn, Plotly, Streamlit
- **Card line:** *Payment teams have to decide, transaction by transaction, whether to allow, challenge or review. ChargebackLens turns dispute risk into the rupee-optimal decision.*
- **Card metrics:** `16.2× lift` in the top 1% of the review queue · `₹11.99L net savings` (39.1% of exposure)
- **At a glance:** 119,988 transactions × 24 features · 0.875% dispute rate · test PR-AUC 0.0872 · calibration error 0.00185 · 43.2% recall when reviewing 5% of volume
- **Data:** five CSVs cleaned and merged into one master table; 5-notebook pipeline (cleaning/merging, EDA, feature engineering, modelling, evaluation).
- **Approach:**
  - Leakage-safe, time-gated features under a "knowability contract": a feature is used only if it would be known at decision time.
  - Temporal train/test split instead of a random split.
  - Four scorers benchmarked; final model is unweighted Logistic Regression with prefit sigmoid calibration, chosen because calibrated probabilities drive the economics.
  - Scores mapped to a three-band policy — allow / step-up (3DS) / manual review — with jointly optimised thresholds.
  - Segment economics showing where the policy should *not* be deployed.
- **Scope note (show it):** defence-only — the system scores and routes; it does not block customers automatically.
- **App:** Streamlit with Score, Review Queue and Economics Explorer views. `Deployed on Streamlit Community Cloud (link below).`
- **Interactive:** the threshold explorer in Section 8 lives on this page.
- **Verify before publishing:** the résumé says "9.7× the base rate in PR-AUC". Show it only after Diya confirms it against the notebook, with the base rate beside it.
- **Limitations and what I'd do next:** from repo analysis (including the data source and the cost assumptions behind the ₹ figures). **Figures:** calibration curve, lift chart and app screenshots exported from the repo into `public/media/images/chargebacklens/`.
- **Links:** GitHub `https://github.com/Inquisitiveshri34/ChargeBackLens-Transaction-Dispute-Risk-Decision-Engine · live demo https://chargebacklens-transaction-dispute-risk-decision-engine.streamlit.app/ · video from public/media/videos/chargebacklens/ when present`
### 7.3a StreakForge — Fitness Engagement & Retention Insight Platform (featured #3)
 
Full case study, card text and metrics are in the content doc (Work page 3.1 and case study 7.1). Team project: the header shows the role line from the content doc.
 
### 7.3 DeliverIQ — Delivery ETA Predictor (featured #4)
 
- **Slug / domain / dates:** `deliveriq` · Logistics · Apr–May 2026
- **Stack:** Python, NumPy, Pandas, Scikit-learn, Plotly, Streamlit
- **Card line:** *Customers and dispatchers need delivery times they can plan around. DeliverIQ predicts urban delivery ETAs from traffic, weather and road data.*
- **Card metrics:** `7.83 min MAE` · `55% better` than baseline
- **At a glance:** 250K+ delivery trips · multi-source data (traffic, weather, road network)
- **Data:** fixed missing values, invalid foreign keys, outliers and inconsistent timestamps; target skewness of 8.47 handled with a log1p transform.
- **Approach:** Random Forest regression inside Scikit-learn Pipelines, tuned with GridSearchCV. `The baseline behind the 55% figure: from repo analysis.`
- **App:** Streamlit dashboard for forecasting, model metrics and feature importance.
- **Limitations and what I'd do next:** from repo analysis. **Figures:** error analysis and feature-importance charts exported from the repo into `public/media/images/deliveriq/`.
- **Links:** GitHub `https://github.com/Inquisitiveshri34/DeliverIQ-Travel-Time-Predictor · live demo https://deliveriq-v0.streamlit.app/`
### 7.4 HealthOps (learning project)
 
- **Slug / domain / dates:** `healthops` · Healthcare operations · Mar–Apr 2026
- **Full title:** HealthOps — Data-Driven Hospital Resource Intelligence
- **Stack:** Python, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook, Streamlit
- **One line:** *Hospitals need to see resource pressure before it becomes a crisis. HealthOps analyses 5,000+ patient records to surface trends in inflow, ICU demand, oxygen use and bed occupancy.*
- **Highlights:** end-to-end analytics pipeline (cleaning, validation, preprocessing, feature engineering, EDA) identifying resource-demand drivers across severity, admissions, ICU utilisation and bed occupancy, plus seasonal disease trends; Streamlit dashboard for monitoring and capacity planning.
- **Links:** GitHub https://github.com/Inquisitiveshri34/HealthOps\_Data-Driven\_Hospital\_Resource\_Intelligence · live demo https://healthops.streamlit.app/
### 7.5 ParkEase (learning project)
 
- **Slug / domain / dates:** `parkease` · Urban mobility · Jan–Feb 2026
- **Full title:** ParkEase — Smart Parking Management System
- **Stack:** Next.js, PostgreSQL, Prisma ORM, Node.js, Redis, REST APIs, Vercel
- **One line:** *Drivers lose time circling for parking, and booking systems break when two people book the same spot. ParkEase handles real-time concurrent bookings without double-booking.*
- **Highlights:** Redis caching layer for real-time concurrent booking; transactional REST pipeline that validates, processes and confirms each booking in strict sequence, preventing double-booking under simultaneous requests; role-based access control enforced across frontend, backend and PostgreSQL.
- **Links:** GitHub https://github.com/kalviumcommunity/S66-0126-Diya-NextJS-ParkEase · live demo https://parkease-sage.vercel.app/
### 7.6 CraftBridge (learning project)
 
- **Slug / domain / dates:** `craftbridge` · Marketplace · Feb–Mar 2026 · Solo, built across 51 pull requests
- **Full title:** CraftBridge — Marketplace for Local Artisans
- **Stack:** Flutter, Dart, Firebase Auth, Firestore, Firebase Cloud Messaging (push notifications), Google Maps SDK
- **One line:** *Local artisans struggle to reach nearby buyers. CraftBridge is a mobile marketplace with location-based discovery and real-time notifications.*
- **Highlights:** owned end-to-end development of a multi-sided marketplace; role-based access control across Admin, Seller and Buyer; Firestore real-time sync for low-latency interactions.
- **Links:** GitHub https://github.com/Inquisitiveshri34/craft\_bridge · no live demo (mobile app)
### 7.7 Forage job simulations (Learning record)
 
| Company | Track | Date | One line | Certificate |
| --- | --- | --- | --- | --- |
| British Airways | Data Science | May 2026 | Analysed customer reviews for sentiment drivers; modelled factors behind buying behaviour | [View](https://www.theforage.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_68d50351e8c126991b09a501_1778056600894_completion_certificate.pdf) |
| BCG | Data Science | Apr 2026 | Scoped a churn investigation; tuned a random-forest churn model to 50% recall; wrote an executive summary | [View](https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_68d50351e8c126991b09a501_1776932461943_completion_certificate.pdf) |
| Commonwealth Bank | Intro to Data Science | Apr 2026 | Built aggregation pipelines, anonymised personal data, designed a database schema | [View](https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/smwfytX3mcLboA9bf_2sNmYuurxgpFYawco_68d50351e8c126991b09a501_1775818566330_completion_certificate.pdf) |
| JPMorgan Chase | Quantitative Research | Apr 2026 | Estimated probability of default on a loan book; bucketed FICO scores with dynamic programming | [View](https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_68d50351e8c126991b09a501_1776590566447_completion_certificate.pdf) |
| Deloitte | Data Analytics | Apr 2026 | Built a Tableau dashboard for a forensic-technology investigation | [View](https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_68d50351e8c126991b09a501_1776756223512_completion_certificate.pdf) |
 
### 7.8 Certifications (About page table)
 
The "Verify" column is the primary link; a PDF in `public/media/documents/certificates/<slug>.pdf` adds a second "PDF" link when present.
 
| Certification | Issuer | Date | Slug | Verify |
| --- | --- | --- | --- | --- |
| Databricks Fundamentals (Accredited) | Databricks | Sep 2026 | `databricks-fundamentals` | [Verify](https://credentials.databricks.com/55d56f43-1318-44b7-b5d1-679c2edbcffe#acc.tpWSvmVU) |
| Power Platform Functional Consultant Associate (PL-200) | Microsoft | Aug 2026 | `pl-200` | [Verify](https://learn.microsoft.com/api/credentials/share/en-us/DiyaShrivastava3/9B0CAB19E4A1527E?sharingId=EFE7584354ADC986) |
| Power Platform Fundamentals (PL-900) | Microsoft | Aug 2026 | `pl-900` | [Verify](https://learn.microsoft.com/api/credentials/share/en-us/DiyaShrivastava3/D6372555284278A?sharingId=EFE7584354ADC986) |
| Azure AI Fundamentals (AI-900) | Microsoft | Feb 2026 | `ai-900` | [Verify](https://learn.microsoft.com/api/credentials/share/en-gb/DiyaShrivastava3/29C1A09C4E7DEE9?sharingId=EFE7584354ADC986) |
| GitHub Foundations (GH-900) | Microsoft | Feb 2026 | `gh-900` | [Verify](https://learn.microsoft.com/api/credentials/share/en-us/DiyaShrivastava3/537E8541AA097BAD?sharingId=EFE7584354ADC986) |
| AI Fluency | Anthropic Academy | Mar 2026 | `ai-fluency` | [Verify](https://verify.skilljar.com/c/kujhj7ubfwhb) |
| Claude 101 | Anthropic Academy | Mar 2026 | `claude-101` | [Verify](https://verify.skilljar.com/c/r3cdmzak8923) |
 
The build tests every external link (repos, demos, certificates) and fails if any returns an error.
 
## 8. Interactive: ChargebackLens threshold explorer
 
One interactive component on the ChargebackLens case study lets a reader drag two thresholds and see how review load, disputes caught and net savings change. It runs entirely in the browser on precomputed data — no model runs on the site.
 
### 8.1 Data contract
 
In the repo-analysis step (Section 13), Claude Code runs the evaluation code in the ChargebackLens repo and writes one JSON file to `public/media/data/chargebacklens-thresholds.json`. Every value must come from running that code; never estimate or invent values.
 
```json
{
  "meta": {
    "source": "test split, temporal",
    "n_transactions": 0,
    "base_rate": 0,
    "currency": "INR",
    "cost_assumptions": "from the notebook's cost settings"
  },
  "grid": [
    {
      "stepUp": 0.01,
      "review": 0.05,
      "pctAllowed": 0,
      "pctStepUp": 0,
      "pctReview": 0,
      "recall": 0,
      "netSavingsINR": 0
    }
  ],
  "chosen": { "stepUp": 0, "review": 0 }
}
```
 
`grid` holds every combination on a fixed step (for example, 0.005) where `stepUp < review`. Validate the file with `zod` at build time.
 
### 8.2 Behaviour
 
- Two range sliders: **Step-up threshold** and **Review threshold**. The review slider can never go below the step-up slider.
- Live outputs: a stacked horizontal bar of allow / step-up / review shares; disputes caught (recall); net savings in ₹ lakh.
- A "Reset to chosen policy" button shows the values stored in `chosen` (which holds the full outputs, because the chosen thresholds 0.0244 and 0.0824 fall between grid steps), labels them "Chosen policy", and moves each slider to its nearest grid step. A small fixed marker shows the exact chosen threshold on each slider at all times. Ship the JSON minified.
- Under the outputs, always visible: *Computed on the held-out test split ({n\_transactions} transactions, {base\_rate} dispute rate). Savings depend on these cost assumptions: {cost\_assumptions}.*
### 8.3 Build rules
 
- Client component, lazy-loaded with `next/dynamic` so it doesn't affect the page's initial load.
- Native `<input type="range">` with visible labels, keyboard support and `aria-valuetext` (for example, "Review threshold 0.12, 3.4% of transactions reviewed").
- Outputs update in an `aria-live="polite"` region.
- Numbers in JetBrains Mono; bar colours from the token palette only.
- **Placeholder mode:** until the real JSON exists, render a card that says *Interactive explorer coming soon* — never demo it with made-up data.
## 9. Content model, folder structure and components
 
All content lives in typed MDX files so Diya can update the site by editing text, without touching components.
 
### 9.1 Project frontmatter schema (zod)
 
```ts
const Project = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),          // e.g. "Procurement RAG Assistant"
  domain: z.string(),            // e.g. "Legal & procurement"
  period: z.string(),            // e.g. "Sep–Oct 2026"
  featured: z.boolean(),
  order: z.number(),
  role: z.string(),
  team: z.string().optional(),   // e.g. "Group project (team of 2)"
  stack: z.array(z.string()),
  summary: z.string(),           // the "who it helps" card line
  metrics: z.array(z.object({
    value: z.string(),           // "93.5%"
    label: z.string(),           // "recall@5"
    context: z.string(),         // "gold clause in top 5 for 29 of 31 questions" — required
  })).max(4),
  links: z.object({
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    video: z.string().optional(),
  }),
  cover: z.string().optional(),  // /media/images/<slug>/cover.png
  draft: z.boolean().default(false),
});
```
 
Posts use a similar schema: `title`, `slug`, `date`, `summary`, `tags`, `draft`. Drafts never render in production.
 
### 9.2 Folder structure
 
```text
/app
  layout.tsx            # fonts, header, footer, metadata defaults
  page.tsx              # Home
  work/page.tsx
  work/[slug]/page.tsx
  writing/page.tsx
  writing/[slug]/page.tsx
  about/page.tsx
  resume/page.tsx       # latest résumé + earlier versions
  not-found.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx
  globals.css           # tokens from Section 3
/components
  layout/   Header, Footer, Container, Section
  ui/       Button, Tag, Callout, MetricBlock, Eyebrow
  home/     Hero, FeaturedWork, Values, ApproachStrip, NowSection, Toolkit, Contact
  work/     ProjectCard, ProjectRow, CaseStudyHeader, TableOfContents, Figure, DemoVideo, DocumentList
  about/    Timeline, CertificationsTable
  resume/   ResumeViewer, ResumeArchiveList
  interactive/ ThresholdExplorer
/content
  work/*.mdx
  writing/*.mdx
  site.ts               # name, email, social links, availability line, "now" items
/lib
  content.ts            # load, validate and sort MDX
  schemas.ts
  media-manifest.generated.ts   # written by the script below; git-ignored
/scripts
  build-media-manifest.ts       # Section 9.5
/public
  media/                # resume/, documents/, videos/, images/, data/ — Section 9.5
/tests
  smoke.spec.ts
  a11y.spec.ts
TODO.md
CHANGELOG.md
```
 
### 9.3 MDX components available inside case studies
 
`<Callout type="note|limitation">`, `<Figure src alt caption>`, `<MetricBlock>`, `<Decision chosen="" rejected="" why="">` (renders a small "chose X over Y because Z" panel), and `<ThresholdExplorer />` (ChargebackLens only).
 
### 9.4 Single source of truth
 
`content/site.ts` holds the name, email (`diyashrivastava34@gmail.com`), GitHub (`Inquisitiveshri34`), LinkedIn (`diyashrivastava34`), LeetCode (`Inquisitiveshri`), the availability line and the Now items. No component hard-codes any of these.
 
Full URLs: GitHub https://github.com/Inquisitiveshri34 · LinkedIn https://www.linkedin.com/in/diyashrivastava34 · LeetCode https://leetcode.com/u/Inquisitiveshri · Email mailto:diyashrivastava34@gmail.com.
 
### 9.5 Media folders (Diya drops files in; the site picks them up)
 
Diya uploads documents, videos and images into fixed folders under `public/media/`. A build script scans them and generates a typed manifest, so the site shows whatever is there without code changes. Build this in Phase 2.
 
```text
/public/media
  resume/
    Diya_Shrivastava.pdf                     # ALWAYS the latest résumé
    archive/
      Diya_Shrivastava_2026-08-15.pdf        # earlier versions, dated YYYY-MM-DD
  documents/
    certificates/<cert-slug>.pdf             # e.g. pl-200.pdf, ai-900.pdf
    projects/<project-slug>/<name>.pdf       # reports, slides, write-ups
  videos/
    <project-slug>/demo.mp4                  # walkthrough video
    <project-slug>/demo-poster.jpg           # still frame shown before play
  images/
    <project-slug>/cover.png                 # card and OG image source
    <project-slug>/fig-<name>.png            # case-study figures
  data/
    chargebacklens-thresholds.json           # Section 8
```
 
**Naming rules:** lowercase, hyphens, no spaces, except résumé files, which keep the exact names above. Project folders use the slugs from Section 5.
 
**Optional captions:** any file can have a sidecar `<filename>.meta.json` with `title`, `alt` (required for images), `caption` and `date`. Example: `fig-calibration.png.meta.json`.
 
**Manifest script (`scripts/build-media-manifest.ts`):**
 
- Runs before `next build` and `next dev` (`prebuild` / `predev` npm scripts).
- Walks `public/media/`, reads sidecar metadata, and writes `lib/media-manifest.generated.ts` (git-ignored).
- Fails the build if an image has no `alt`, a file name breaks the naming rules, or `resume/Diya_Shrivastava.pdf` is missing.
- Sorts archived résumés newest first, using the date in the file name.
**Where each folder shows up:**
 
| Folder | Displayed on |
| --- | --- |
| `resume/Diya_Shrivastava.pdf` | Header "Résumé" link and Home "Download résumé" button (opens in a new tab) |
| `resume/archive/*` | `/resume` page, under *Earlier versions*, newest first, each labelled with its date |
| `documents/certificates/*` | "View certificate" link in the About page certifications table |
| `documents/projects/<slug>/*` | "Documents" list at the end of that case study |
| `videos/<slug>/demo.mp4` | Top of that case study, using `<video controls preload="none" playsInline poster=…>` |
| `images/<slug>/*` | Project card cover, case-study figures, per-project OG image |
 
**Video limits:** MP4 (H.264), 1080p or lower, under 25 MB each, so the repo stays small and GitHub's 100 MB file limit is never hit. For anything longer, upload it unlisted to YouTube and put its URL in the sidecar as `"externalUrl"`; the site then embeds it with `youtube-nocookie.com`, loaded only after a click.
 
**Missing files:** a component whose file doesn't exist renders nothing (or the explorer's placeholder card) — never a broken link or empty frame.
 
## 10. SEO, accessibility and performance
 
These are hard requirements; a phase isn't done until they pass.
 
### 10.1 SEO and sharing
 
- Default title: *Diya Shrivastava — Applied ML & GenAI*; page titles follow *{Page} · Diya Shrivastava*.
- Default description: *Third-year CSE student building ML and GenAI systems people can rely on — calibrated risk models and RAG assistants that cite their sources.*
- `metadataBase` set to https://diya-shrivastava-portfolio.vercel.app, canonical URLs on every page.
- `next/og` images: a site default plus one per project (title, one-line summary, one key metric, on `--bg` with Fraunces). 1200×630.
- JSON-LD `Person` on Home (name, url, email, `sameAs` GitHub/LinkedIn, `alumniOf` LPU) and `CreativeWork` on each case study.
- `sitemap.ts` and `robots.ts`; drafts and the hidden Writing section excluded.
### 10.2 Accessibility (WCAG 2.2 AA)
 
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, no skipped heading levels.
- "Skip to content" link as the first focusable element.
- Visible focus ring on everything: 2px `--accent` outline, 2px offset.
- All images have meaningful alt text; decorative SVGs get `aria-hidden`.
- Charts and figures carry a text summary in the caption.
- Touch targets at least 44×44px; text resizes to 200% without loss.
- Automated axe checks in Playwright on every route must report zero violations.
### 10.3 Performance budgets (mobile, home page)
 
| Metric | Budget |
| --- | --- |
| Largest Contentful Paint | under 2.0 s |
| Cumulative Layout Shift | under 0.05 |
| Interaction to Next Paint | under 150 ms |
| First-load JavaScript | under 120 KB gzipped |
| Lighthouse (all four categories) | 95+ |
 
Static generation for all routes, `next/image` with explicit sizes, fonts via `next/font` with only the weights used, the explorer lazy-loaded, and no third-party scripts other than Vercel Analytics.
 
## 11. Build phases
 
Six phases, each ending with lint, typecheck, build and tests passing. Stop after each phase and summarise what was built and any open questions.
 
1. **Foundation** — scaffold Next.js + TypeScript + Tailwind; add tokens, fonts, `Container`/`Section`, Header, Footer, `site.ts`, ESLint/Prettier, Playwright and the GitHub Actions workflow.
   - *Done when:* an empty styled page builds and deploys to a Vercel preview; header and footer work on 375px and 1280px; CI is green.
2. **Content layer** — zod schemas, MDX loading in `lib/content.ts`, `the media manifest from Section 9.5, the repo-analysis step from Section 13, and all project MDX files from Section 7 filled with its output`.
   - *Done when:* an invalid frontmatter field fails the build with a clear message.
3. **Home page** — all eight sections from 6.1 with real copy.
   - *Done when:* résumé button and email are visible in the first screen at 375px; axe reports zero violations; the page matches the tokens exactly.
4. **Work, case studies and About** — `/work`, `/work/[slug]` with the fixed structure, MDX components, table of contents, `/about` with timeline and certifications, `not-found`.
   - *Done when:* every slug renders; Limitations callouts appear on all featured case studies; prev/next navigation works across the four featured case studies; the learning-projects section is closed on load and opens and closes with the keyboard.
5. **Interactive explorer** — `ThresholdExplorer` per Section 8, including placeholder mode.
   - *Done when:* it works with keyboard only, announces changes to screen readers, and shows placeholder mode when the JSON is missing.
6. **Polish and launch** — metadata, OG images, JSON-LD, sitemap, robots, analytics, Writing behind its flag, Lighthouse and performance budgets met, final `TODO.md` review.
   - *Done when:* every item in Section 10 passes on the production URL and `TODO.md` is empty.
## 12. Content checklist for Diya, and things to avoid
 
The site can be built before these are ready, but it shouldn't launch until the first group is done.
 
### 12.1 Needed before launch
 
Everything else in this spec is final. The only files Diya supplies:
 
- [ ] `public/media/resume/Diya_Shrivastava.pdf` (latest) and earlier versions in `public/media/resume/archive/` as `Diya_Shrivastava_YYYY-MM-DD.pdf`
**Decided:** seven projects (four featured — ClauseCheck, ChargebackLens, StreakForge, DeliverIQ; three learning projects hidden behind a toggle — HealthOps, ParkEase, CraftBridge); ClauseCheck is a group project with no names; ChargebackLens is solo and live; availability reads "available now"; the About page has no personal details, no robotics and no pre-degree specifics; Now section shows two bullets; Writing is built but hidden; Vercel Analytics on; "DS" monogram favicon; site at `diya-shrivastava-portfolio.vercel.app`.
 
### 12.2 Nice to have soon after
 
- Demo videos in `public/media/videos/<slug>/` — they appear automatically
- Certificate PDFs in `public/media/documents/certificates/` — a "PDF" link appears beside "Verify"
- Project documents in `public/media/documents/projects/<slug>/` — listed at the end of the case study
- A first post — turn on the `SHOW_WRITING` flag
### 12.3 Things Claude Code must avoid
 
- Dark backgrounds, dark mode, gradients, glows, neon, glassmorphism
- Particle or 3D backgrounds, cursor effects, typing animations, auto-playing anything
- Skill bars, percentages or star ratings for skills
- Walls of tool logos or certification badge images
- Stock photos, robot/brain art, AI-generated imagery
- "Coming soon" pages or empty sections in navigation (the explorer's placeholder card is the only exception)
- Contact forms, the phone number, or any personal data beyond what Section 9.4 lists
- Invented metrics, testimonials, employers, users or production claims
- Buzzwords: passionate, ninja, rockstar, cutting-edge, revolutionary, synergy
## 13. Repo-analysis build step (runs in Phase 2)
 
Claude Code reads every project repo during the build and writes the case-study details marked "from repo analysis". All repos are public. StreakForge is the seventh project; its repo link is listed in the content doc once added.
 
| Slug | Repo |
| --- | --- |
| `clausecheck` | https://github.com/kalviumcommunity/S66-0926-DY-RAG-ClauseCheck |
| `chargebacklens` | https://github.com/Inquisitiveshri34/ChargeBackLens-Transaction-Dispute-Risk-Decision-Engine |
| `deliveriq` | https://github.com/Inquisitiveshri34/DeliverIQ-Travel-Time-Predictor |
| `healthops` | https://github.com/Inquisitiveshri34/HealthOps\_Data-Driven\_Hospital\_Resource\_Intelligence |
| `parkease` | https://github.com/kalviumcommunity/S66-0126-Diya-NextJS-ParkEase |
| `craftbridge` | https://github.com/Inquisitiveshri34/craft\_bridge |
 
### 13.1 Procedure
 
1. Shallow-clone each repo into `.analysis/<slug>/` (git-ignored; never deployed).
2. Read each repo thoroughly: README, notebooks including outputs, source, configs, tests, evaluation scripts and commit history.
3. Write `content/analysis/<slug>.md` with these sections:
   1. **Summary** — problem, who has it, what the project does (3 sentences).
   2. **Key decisions** (4–6) — decision, alternative(s), why, and evidence (file path and cell, function or commit). If no alternative was actually tried, write "Not tried — the obvious alternative" rather than implying it was evaluated.
   3. **Results check** — every headline metric with its exact value, the split or dataset, and the source file. Flag any number that is inconsistent or can't be reproduced.
   4. **Limitations** (4–6) — specific weaknesses and why they matter.
   5. **What I'd do next** (3–5) — concrete improvements tied to the limitations.
   6. **Evaluation details** — how the evaluation set or baseline was built.
4. Export figures the repo already produces (plots, app screenshots) into `public/media/images/<slug>/` with `.meta.json` sidecars (alt text and caption).
5. **ChargebackLens only:** run the evaluation code to produce `public/media/data/chargebacklens-thresholds.json` (Section 8), and check the "9.7× the base rate in PR-AUC" claim against the test PR-AUC (0.0872) and test dispute rate, showing the calculation. If the repo gives a different multiple, the site uses the repo's value.
6. Fill each project's MDX from its analysis file: decisions use the `<Decision>` component; Limitations go in the `limitation` callout.
7. Stop and show Diya a summary of every metric that changed or couldn't be verified before continuing to Phase 3.
### 13.2 Rules
 
- Use only facts the repository supports. Never invent numbers, users, deployments or results.
- If a detail can't be determined from the repo, leave that sub-section out of the page and log it in `TODO.md`. Never publish a placeholder.
- Write in first person as Diya, in plain professional language, short sentences, British/Indian spelling.
- Group projects (ClauseCheck, and ParkEase if the repo shows other contributors) use "we" for shared work and never name teammates.
- Don't modify the cloned repos.
 
