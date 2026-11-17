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

- [NAMING_CONVENTIONS.md](apps/web/docs/NAMING_CONVENTIONS.md): Code standards, strict `kebab-case` folder structure, standardized component anatomy (`index.tsx`, `index.spec.tsx`, `index.module.css`), and identifier conventions.
- [TESTING.md](apps/web/docs/TESTING.md): Vitest and React Testing Library architecture, co-located test specs (`index.spec.tsx`), and realistic synthetic mocking with `@faker-js/faker` under LGPD data protection compliance.
- [NEXTJS.md](apps/web/docs/NEXTJS.md): Modern Next.js patterns (App Router, React 19, Server & Client Components, async request APIs, Cache Components, Partial Prefetching, and AI agent integration based on [How Next.js supports AI coding agents](https://nextjs.org/docs/app/guides/ai-agents)).
- [SECURITY.md](apps/web/docs/SECURITY.md): Frontend security guidelines (client validation limits, XSS prevention, sensitive data exposure, and dependency auditing).
- [COLORS.md](apps/web/docs/COLORS.md): Design tokens, accessibility contrast standards (WCAG 2.1 AA/AAA), neurodiversity visual accommodations (ADHD, ASD, dyslexia, dyscalculia), and pedagogical Color Code system (disciplines and content hierarchy).
- [FONTS.md](apps/web/docs/FONTS.md): Typography system, dual-font architecture (Nunito for headings, Inter for body/interface), cognitive readability, neurodiversity accommodations, and WCAG typographic scales.

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

1. **Accessibility Standards (a11y):** Built for public school realities, respecting WCAG 2.1 AA standards. Ensure high color contrast, full keyboard navigation, screen reader accessibility, and resilience on low-bandwidth networks.
2. **Client Environment Variables:** Client-exposed environment variables must strictly use the `NEXT_PUBLIC_` prefix and never contain secrets or private credentials.
