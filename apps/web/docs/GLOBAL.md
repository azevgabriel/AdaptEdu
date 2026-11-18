# Frontend (Next.js + React 19) — Global Index

This document serves as the **Local Context Entry Point** for coding agents and developers working on `apps/web/`.

---

## 🎯 Role and Responsibilities

The AdaptEdu **Frontend** is the primary interactive user interface designed to empower Brazilian public school educators. It provides accessible, intuitive, and practical tools to support the inclusion of neurodivergent students (including autism, ADHD, dyslexia, dyscalculia, and Tourette syndrome), assisting teachers with classroom routine adjustments, pedagogical adaptations, and lesson planning.

### Monorepo Architectural Boundaries

- **UI & Presentation Isolation:** Rendering components, client state management, form handling, and user interaction belong exclusively to `apps/web/`.
- **No Direct Database Access:** PostgreSQL, Prisma schemas, migrations, and database queries belong strictly to `apps/api/` (NestJS). The frontend never imports Prisma or connects to the database directly.
- **No Direct AI / LLM Orchestration:** LangChain pipelines, prompt engineering, embedding models, and spatial reasoning belong strictly to `apps/engine/` (FastAPI). The frontend interacts with AI features mediated by the NestJS backend API.
- **Backend Communication:** All business logic, authentication, persistence, and AI job requests are dispatched via HTTP requests to `apps/api/` (e.g., using `NEXT_PUBLIC_API_URL` or server-side `API_URL`).

---

## 📖 Architecture & Local Guidelines

- [NAMING_CONVENTIONS.md](apps/web/docs/NAMING_CONVENTIONS.md): Code standards, strict `kebab-case` folder structure, standardized component anatomy (global in `src/components/` and internal page components in `src/app/**/components/`), barrel exports, and identifier conventions.
- [DESIGN_SYSTEM.md](apps/web/docs/DESIGN_SYSTEM.md): Component catalog, reusable UI patterns, props specifications, accessibility accommodations, and component directory anatomy.
- [TESTING.md](apps/web/docs/TESTING.md): Vitest and React Testing Library architecture, co-located test specs (`index.spec.tsx`), and realistic synthetic mocking with `@faker-js/faker` under LGPD data protection compliance.
- [NEXTJS.md](apps/web/docs/NEXTJS.md): Modern Next.js patterns (App Router, React 19, Server & Client Components, async request APIs, Cache Components, Partial Prefetching, and AI agent integration based on [How Next.js supports AI coding agents](https://nextjs.org/docs/app/guides/ai-agents)).
- [SECURITY.md](apps/web/docs/SECURITY.md): Frontend security guidelines (client validation limits, XSS prevention, sensitive data exposure, and dependency auditing).
- [COLORS.md](apps/web/docs/COLORS.md): Design tokens, accessibility contrast standards (WCAG 2.1 AA/AAA), neurodiversity visual accommodations (ADHD, ASD, dyslexia, dyscalculia), and pedagogical Color Code system (disciplines and content hierarchy).
- [FONTS.md](apps/web/docs/FONTS.md): Typography system, dual-font architecture (Nunito for headings, Inter for body/interface), cognitive readability, neurodiversity accommodations, and WCAG typographic scales.
- [ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md): Universal Design, cognitive accommodations, the Three Visual States (Inadequate vs. CVD Simulation vs. Accessible Mode), the 4 Cardinal Pillars (Expansion, Attention, Innovation, Action), and review checklists.
- [skills/component-a11y-audit](apps/web/docs/skills/component-a11y-audit/SKILL.md): Automated verification protocol and Vitest unit test generator across the 3 core UI pillars (Colors, Fonts, Accessibility).

---

## 🤖 Agent Guidance & Core Next.js Resources

Next.js provides an integrated ecosystem for AI coding agents:

- **Official AI Agents Guide:** [https://nextjs.org/docs/app/guides/ai-agents](https://nextjs.org/docs/app/guides/ai-agents) (Local copy: [ai-agents.md](apps/web/node_modules/next/dist/docs/01-app/02-guides/ai-agents.md)).
- **Bundled Version-Matched Docs:** Located in [apps/web/node_modules/next/dist/docs/](apps/web/node_modules/next/dist/docs/). Agents should consult these local docs for current API references, App Router guides, and migration instructions.
- **Next.js MCP Server:** Runs during `next dev` at `/_next/mcp`, exposing server logs, compilation diagnostics, and route verification tools (`compile_route`, `get_compilation_issues`).
- **Official Vercel Workflow Skills:** Reusable agent workflow skills available via `npx skills add vercel/next.js --skill <name>`:
  - `next-dev-loop`: Runtime inspect, edit, and verify loop with MCP and browser.
  - `next-bundle-optimizer`: Turbopack bundle analysis for initial load optimization.
  - `next-cache-components-adoption`: Incremental route adoption of Cache Components.
  - `next-cache-components-optimizer`: Static shell expansion and instant load tests.
  - `next-partial-prefetching-adoption`: Partial Prefetching (PPR) audit and adoption.
  - `next-partial-prefetching-optimizer`: Prefetching contracts and instant navigation optimization.

### 🎨 Mandatory Pre-Construction Reading Gate (Colors, Fonts & Accessibility)

Before creating, refactoring, or styling any component, layout, or page in `apps/web/`, coding agents and developers **MUST ALWAYS** read and verify the requirements in the following triad of core design specifications:

1. **[COLORS.md](apps/web/docs/COLORS.md) (Interface & Pedagogical Color System):**
   - **Token Integrity:** Use official design tokens (`--bg-*`, `--border-*`, `--text-*`, `--color-brand-*`, `--subject-*`, `--hierarchy-*`). Never hardcode raw hex values.
   - **WCAG AAA Contrast Standard:** Normal text must meet $\ge 4.5:1$ (target $\ge 7:1$ AAA); large text and UI boundaries must meet $\ge 3:1$.
   - **The "Never Color Alone" Rule:** Every chromatic indicator must be reinforced by an icon, text label, or structural marker.
   - **CVD & Photophobia Support:** Account for the 4 CVD modes (`data-cvd`) and ensure risky color pairings in default mode (História/Geografia - orange/green, Matemática/Ciências - blue/purple) are always distinguished by persistent icons (⏳ vs. 🌍, 🧮 vs. 🧪).
2. **[FONTS.md](apps/web/docs/FONTS.md) (Typography & Cognitive Reading System):**
   - **Dual-Font Pairings:** Headings set in Nunito (`--font-family-headings`), body prose and interactive controls set in Inter (`--font-family-body`).
   - **Cognitive Ergonomics:** Line length $\le 65\text{ch}$, line height $\ge 1.5$, left-aligned text (never justified), and ALL CAPS limited strictly to short acronyms (`PEI`, `BNCC`).
   - **Dyslexia Invariant (No Italics):** Never use `font-style: italic` as an emphasis substitute or accessibility highlight; use bold, underline, or borders instead.
   - **Legend Size Resilience:** Color tags, discipline badges, and chart legends must never rely on bare micro-text (`.text-xs` / 12px) without distinct iconography; maintain at least `.text-label` (14px).
3. **[ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md) (Universal Design, WAI-ARIA & Inclusive Components):**
   - **First Rule of ARIA:** Prefer native HTML5 elements (`<button>`, `<dialog>`, `<nav>`, `<main>`) before reaching for ARIA roles on `<div>` elements.
   - **Inclusive Patterns:** Implement battle-tested patterns for toggle buttons (`aria-pressed`), switches (`role="switch"`, `aria-checked`), and menus (keyboard navigation, `Esc` closing with focus return).
   - **Forms & Error Feedback:** Explicit `<label for="...">` mapping (never placeholder-as-label), grouping with `<fieldset>`/`<legend>`, and error announcements via `aria-invalid="true"` and `aria-describedby`.
   - **Keyboard & Focus:** Minimum target size of $44\times44\text{px}$ (minimum $24\times24\text{px}$ per WCAG 2.2 Criterion 2.5.8), and prominent focus ring (`outline: 2px solid var(--color-brand-primary); outline-offset: 2px;`).

---

## 🧠 Technologies & Stack Components

1. **Next.js (16.4.x):** Modern App Router framework featuring React Server Components, Cache Components, and Partial Prefetching.
2. **React (19.3.x):** React 19 primitives, Server Components, Server Actions, and enhanced hooks.
3. **TypeScript (5.x):** Strict type safety with path aliasing (`@/*` -> `./src/*`).
4. **CSS & Styling:** CSS Modules and global CSS variables configured in `src/app/globals.css`.
5. **ESLint (v9):** Configured via flat config (`eslint.config.mjs`) extending `eslint-config-next`.

---

## 🛡️ Invariants & Domain Rules

All developers and agents must adhere strictly to the global invariants defined in root [AGENTS.md](AGENTS.md). In addition, `apps/web/` enforces:

1. **Mandatory Component Pre-Construction Reading Gate (Colors, Fonts, Accessibility):** When building or modifying any UI component, page, or stylesheet, the agent must strictly read and adhere to [COLORS.md](apps/web/docs/COLORS.md), [FONTS.md](apps/web/docs/FONTS.md), and [ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md). Every component must comply with WCAG 2.1/2.2 AA/AAA, Universal Design, native-first WAI-ARIA, dyslexia-safe typography (no italics for emphasis), and the "Never Color Alone" rule. Ensure high color contrast, full keyboard navigation, screen reader accessibility, and resilience on low-bandwidth public school networks.
2. **Client Environment Variables & Secret Hygiene:** Client-exposed environment variables must strictly use the `NEXT_PUBLIC_` prefix and never contain secrets, private credentials, or API keys.
3. **Frontend Security Model & Client Boundary:** Adhere strictly to [SECURITY.md](apps/web/docs/SECURITY.md). The browser is an untrusted environment; client-side validation is strictly for user experience and accessibility—never rely on HTML5 form attributes or client scripts as a security boundary.
4. **Cross-Site Scripting (XSS) Prevention:** Rely on React's automatic JSX escaping. Avoid `dangerouslySetInnerHTML` unless explicitly sanitized via audited libraries (such as `DOMPurify`). Sanitize dynamic link protocols to allow only `http:`, `https:`, and `mailto:` schemes.
5. **Sensitive Data Exposure & Privilege Tampering:** Never fetch sensitive attributes (e.g., internal tokens, administrative metadata) to conceal them visually in CSS/UI. Never submit user roles or permissions from client form inputs; authorization is determined server-side from verified sessions.
6. **Session & Route Protection:** Store authentication tokens exclusively in secure, `HttpOnly` cookies. Enforce private route boundaries using Next.js Edge Middleware (`middleware.ts`).
7. **Dependency Auditing:** Continuously monitor and audit npm dependencies against known CVEs using `npm audit`, integrated into the automated CI pipeline.
