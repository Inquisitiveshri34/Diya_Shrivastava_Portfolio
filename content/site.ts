// Single source for site-wide words and contact details.
// Source: docs/content.md (sections 1, 2.5, 2.8 and 10). Do not invent values here.
// Anything missing from content.md must be a visible TODO and listed in TODO.md.

export const HERO_HEADING_ID = "hero-heading";

/** Writing is built but hidden until a post is published (content.md, section 1). */
export const SHOW_WRITING = false;

export const NAME = "Diya Shrivastava";

export const CONTACT = {
  email: "diyashrivastava34@gmail.com",
  github: { label: "GitHub", href: "https://github.com/Inquisitiveshri34" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/diyashrivastava34" },
  leetcode: { label: "LeetCode", href: "https://leetcode.com/u/Inquisitiveshri" },
} as const;

export const AVAILABILITY = "Open to AI/ML and Data Science internships — available now.";

export const FOOTER_SIGN_OFF = "Built with care by Diya Shrivastava.";

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Résumé", href: "/resume" },
] as const;

export const NOW = {
  label: "Now",
  heading: "What I'm doing these days.",
  items: [
    "Third year of B.Tech CSE at Lovely Professional University, currently studying Design & Analysis of Algorithms and DevOps.",
    "Practising data structures and algorithms in Java on Codeforces.",
  ],
} as const;
