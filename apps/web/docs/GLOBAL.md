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

- [ACCESSIBILITY_GUIDELINES.md](docs/ACCESSIBILITY_GUIDELINES.md): Centralized Brazilian educational legislation and accessibility guidelines (LBI 13.146/2015, LDB 9.394/1996, Lei 12.764/2012, Lei 10.436/2002, Dec. 6.949/2009, Dec. 9.099/2017) and platform architectural mapping matrix.
- [LGPD.md](docs/LGPD.md): Centralized Brazilian General Data Protection Law (LGPD) guidelines, data minimization, cookie hygiene, and client privacy protocols.
- [COMPONENT_CHEAT_SHEET.md](apps/web/docs/COMPONENT_CHEAT_SHEET.md): **Default Quick Entry Point (< 100 lines)** — Essential non-negotiables (tokens, contrast, dual-font, Never Color Alone, First Rule of ARIA, 44px target) for rapid, token-efficient agent onboarding.
- [DESIGN_GUIDELINES.md](apps/web/docs/DESIGN_GUIDELINES.md): Visual identity, anti-slop art direction (Leonxlnx/taste-skill & Vercel Labs standards), sensory-friendly surfaces, and PT-BR UX writing.
- [DESIGN_SYSTEM.md](apps/web/docs/DESIGN_SYSTEM.md): Component catalog, reusable UI patterns, props specifications, accessibility accommodations, and component directory anatomy.
- [PLAYWRIGHT_CLI.md](apps/web/docs/PLAYWRIGHT_CLI.md): Token-efficient Playwright CLI browser inspection, accessibility tree verification, and interactive UI testing.
- [NAMING_CONVENTIONS.md](apps/web/docs/NAMING_CONVENTIONS.md): Code standards, strict `kebab-case` folder structure, standardized component anatomy, barrel exports, and identifier conventions.
- [TESTING.md](apps/web/docs/TESTING.md): Vitest and React Testing Library architecture, co-located test specs (`index.spec.tsx`), and realistic synthetic mocking with `@faker-js/faker` under LGPD compliance.
- [NEXTJS.md](apps/web/docs/NEXTJS.md): Modern Next.js patterns (App Router, React 19, Server & Client Components, async request APIs, Cache Components, Partial Prefetching, and AI agent integration).
- [SECURITY.md](apps/web/docs/SECURITY.md): Frontend security guidelines (client validation limits, XSS prevention, sensitive data exposure, and dependency auditing).
- [COLORS.md](apps/web/docs/COLORS.md): Deep reference for design tokens, contrast standards (WCAG AAA), CVD modes, and pedagogical Color Code system.
- [FONTS.md](apps/web/docs/FONTS.md): Deep reference for typography system, dual-font architecture (Nunito/Inter), cognitive readability, and dyslexia accommodations.
- [ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md): Deep reference for Universal Design, WAI-ARIA standards, Inclusive Components, and WCAG 2.2 criteria.
- [skills/component-a11y-audit](apps/web/docs/skills/component-a11y-audit/SKILL.md): Automated verification protocol and Vitest unit test generator across the 3 core UI pillars.
- [skills/playwright-cli](apps/web/docs/skills/playwright-cli/SKILL.md): Token-efficient Playwright CLI browser inspection skill.

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

### 🎨 Tiered Pre-Construction Reading Protocol

To conserve context window budget and prevent reasoning degradation:

1. **For routine component tasks, minor styling, or bug fixes:**
   Consult **[COMPONENT_CHEAT_SHEET.md](apps/web/docs/COMPONENT_CHEAT_SHEET.md)** (< 100 lines). It contains all non-negotiable rules (token purity, contrast minimums, dual-font pairing, "Never Color Alone", ARIA First Rule, 44px touch target) without context drag.
2. **For visual identity, styling choices, or microcopy:**
   Consult **[DESIGN_GUIDELINES.md](apps/web/docs/DESIGN_GUIDELINES.md)**.
3. **For new architectural primitives, complex composite patterns, or deep calibrations:**
   Consult the deep reference specifications: [COLORS.md](apps/web/docs/COLORS.md), [FONTS.md](apps/web/docs/FONTS.md), and [ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md), and verify statutory pedagogical mandates against [ACCESSIBILITY_GUIDELINES.md](docs/ACCESSIBILITY_GUIDELINES.md).

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

1. **Mandatory Component Quality Gate:** Every component must comply with WCAG 2.1/2.2 AA/AAA, Universal Design, native-first WAI-ARIA, dyslexia-safe typography (no italics for emphasis), and the "Never Color Alone" rule. Verify via [COMPONENT_CHEAT_SHEET.md](apps/web/docs/COMPONENT_CHEAT_SHEET.md) and [skills/component-a11y-audit](apps/web/docs/skills/component-a11y-audit/SKILL.md).
2. **Client Environment Variables & Secret Hygiene:** Client-exposed environment variables must strictly use the `NEXT_PUBLIC_` prefix and never contain secrets, private credentials, or API keys.
3. **Frontend Security Model & Client Boundary:** Adhere strictly to [SECURITY.md](apps/web/docs/SECURITY.md). The browser is an untrusted environment; client-side validation is strictly for user experience and accessibility—never rely on HTML5 form attributes or client scripts as a security boundary.
4. **Cross-Site Scripting (XSS) Prevention:** Rely on React's automatic JSX escaping. Avoid `dangerouslySetInnerHTML` unless explicitly sanitized via audited libraries (such as `DOMPurify`). Sanitize dynamic link protocols to allow only `http:`, `https:`, and `mailto:` schemes.
5. **Sensitive Data Exposure & Privilege Tampering:** Never fetch sensitive attributes (e.g., internal tokens, administrative metadata) to conceal them visually in CSS/UI. Never submit user roles or permissions from client form inputs; authorization is determined server-side from verified sessions.
6. **Session & Route Protection:** Store authentication tokens exclusively in secure, `HttpOnly` cookies. Enforce private route boundaries using Next.js Edge Middleware (`middleware.ts`).
7. **Dependency Auditing:** Continuously monitor and audit npm dependencies against known CVEs using `npm audit`, integrated into the automated CI pipeline.
