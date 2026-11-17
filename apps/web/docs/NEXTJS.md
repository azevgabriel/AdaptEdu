# Next.js — High-Level Architecture & Guidelines

This document provides a comprehensive architectural overview for **Next.js** in `apps/web/`. It guides coding agents and human developers on conventions, modern APIs, execution workflows, and architectural boundaries, incorporating the official Next.js guidance from [How Next.js supports AI coding agents](https://nextjs.org/docs/app/guides/ai-agents).

---

## 🤖 AI Coding Agent Guidance (Official Next.js Architecture)

Official Documentation Reference: [https://nextjs.org/docs/app/guides/ai-agents](https://nextjs.org/docs/app/guides/ai-agents)  
Local Bundled Mirror: [ai-agents.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/node_modules/next/dist/docs/01-app/02-guides/ai-agents.md)

Next.js provides dedicated built-in architecture for AI coding agents to overcome training data cutoff limitations and ensure accurate usage of current framework features:

### 1. Version-Matched Bundled Documentation

Framework knowledge is bundled directly inside `node_modules/next/dist/docs/` to guarantee that agents reference the exact APIs supported by the installed version without external lookups:

- **Local Docs Tree:** [node_modules/next/dist/docs/](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/node_modules/next/dist/docs/)
  - [01-app](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/node_modules/next/dist/docs/01-app): App Router core concepts (layouts, pages, Server/Client components, data fetching, mutations, caching, fonts, images).
  - [02-guides](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/node_modules/next/dist/docs/01-app/02-guides): Guides on AI agents, Partial Prefetching, Cache Components, MCP, and instant navigation.
  - [03-api-reference](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/node_modules/next/dist/docs/01-app/03-api-reference): Reference manual for components, hooks, functions, and `next.config.ts`.
- **Managed `AGENTS.md` Block:** `next dev` automatically injects and maintains the `<!-- BEGIN:nextjs-agent-rules -->` block in [AGENTS.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/AGENTS.md). According to Vercel's evaluations, always-available context in `AGENTS.md` achieves a 100% pass rate compared to 79% for Skill-based retrieval.
- **Network Documentation Fallbacks:** For network-enabled lookups, [nextjs.org/docs/llms.txt](https://nextjs.org/docs/llms.txt) and [nextjs.org/docs/llms-full.txt](https://nextjs.org/docs/llms-full.txt) follow the standard `llms.txt` format.

### 2. Runtime Visibility & Inspection

Agents have access to both framework and browser state through structured interfaces:

- **Next.js MCP Server (`/_next/mcp`):** Exposes running dev server endpoints, route compilation (`compile_route`), and build diagnostics (`get_compilation_issues`), allowing instant verification without running a full `next build`.
- **Browser-to-Terminal Logging:** `next dev` forwards client-side console errors and warnings directly to the terminal via `logging.browserToTerminal`.
- **Dev Server Lockfile:** `.next/dev/lock` tracks the active server PID, port, and URL to prevent duplicate servers and collisions.
- **Browser & Component Inspection:** The [`next-dev-loop`](https://www.skills.sh/vercel/next.js/next-dev-loop) skill works alongside `agent-browser` to inspect the DOM, console, network, and React DevTools tree (`react tree`).

### 3. Built-In Guidance for Errors

When Cache Components or prerendering errors occur, Next.js outputs structured, labeled options directly in the terminal and browser overlay:

```txt
Route "/example": Next.js encountered uncached data during prerendering.
Ways to fix this:
  - [stream] Provide a placeholder with <Suspense fallback={...}> around data access
  - [cache] Cache data access with "use cache"
  - [block] Set export const instant = false to allow a blocking route
```

- Each error links to a dedicated guide under `https://nextjs.org/docs/messages/*` with canonical patterns and tradeoffs.
- For prerendering troubleshooting, run `next build --debug-prerender` to keep server source maps and inspect failures across routes.

### 4. Reusable Workflow Skills (`vercel/next.js`)

Framework knowledge comes from bundled docs, while multi-step tasks are driven by official skills (installable via `npx skills add vercel/next.js --skill <name>` or from [skills.sh](https://www.skills.sh/vercel/next.js)):

| Skill Name                           | Purpose                                                            | Suggested Trigger Prompt                                                                    |
| :----------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `next-dev-loop`                      | Runtime inspect, edit, and verify loop via MCP & browser           | _"After every edit, verify the page still works at runtime using the next-dev-loop Skill."_ |
| `next-bundle-optimizer`              | Analyzes Turbopack client bundle size and initial load performance | _"Use the next-bundle-optimizer skill to produce a report of initial load performance."_    |
| `next-cache-components-adoption`     | Incremental route-by-route migration to Cache Components           | _"Adopt Cache Components in this project using the next-cache-components-adoption Skill."_  |
| `next-cache-components-optimizer`    | Expands static shell UI for instant initial page loading           | _"Optimize the static shell for /dashboard using next-cache-components-optimizer."_         |
| `next-partial-prefetching-adoption`  | Migrates app routes to Partial Prefetching (PPR)                   | _"Adopt Partial Prefetching in this project using next-partial-prefetching-adoption."_      |
| `next-partial-prefetching-optimizer` | Builds contracts and prefetching tests before user click           | _"Make navigation instant using next-partial-prefetching-optimizer."_                       |

### 5. Agent-Guided Upgrades & Feedback

- **Automated Upgrades:** Run `npx next@canary upgrade --agent=latest` to have an agent check for upgrades, read migration guides, apply changes, and verify.
- **Automatic Feedback (`experimental.agentFeedback`):** When enabled in `next.config.ts`, agents retain anonymized friction points (unexpected CLI crashes, broken diagnostics, missing docs) and run `npx --no-install next internal agent-feedback-instructions` during the reporting pass.

---

## 🚀 Execution & Scripts

All commands must be executed within `apps/web/`:

- **Local Development:** `npm run dev` (starts development server on `http://localhost:3000`)
- **Production Build:** `npm run build` (compiles and prerenders the application, checking types and routes)
- **Production Run:** `npm run start` (serves the production build)
- **Linting:** `npm run lint` (runs ESLint 9 with `eslint-config-next`)

---

## 📐 Key Architectural Principles

### 1. App Router & Server Components by Default

- All components inside `src/app/` are **React Server Components (RSC)** by default.
- Keep components as Server Components to reduce client bundle size and optimize page rendering.
- Mark interactive components explicitly with `'use client'` at the top only when requiring client state (`useState`, `useReducer`), effects (`useEffect`), event handlers (`onClick`, `onChange`), or browser APIs.

### 2. React 19 & Async Request APIs

- Next.js 16 uses React 19.
- Dynamic request APIs such as `params`, `searchParams`, `cookies()`, and `headers()` are **asynchronous** and must be awaited:

  ```tsx
  interface PageProps {
    params: Promise<{ id: string }>;
  }

  export default async function Page({ params }: PageProps) {
    const { id } = await params;
    return <div>Item ID: {id}</div>;
  }
  ```

### 3. Cache Components & Partial Prefetching (PPR)

- `apps/web/next.config.ts` has `cacheComponents: true` and `partialPrefetching: true` enabled.
- Wrap uncached dynamic data access in `<Suspense fallback={<LoadingSkeleton />}>` to enable immediate shell prerendering and fast streaming.
- Use `"use cache"` directives where appropriate for caching reusable data computations.

### 4. Data Fetching & Backend Communication

- **No Direct Database Access:** Never import Prisma or database drivers into `apps/web/`.
- **API Communication:** All data operations communicate with the backend API (`apps/api`) via HTTP requests (using `fetch` or a dedicated API client) or Server Actions.
- **Environment Variables:** Use `NEXT_PUBLIC_API_URL` for URLs accessed by client-side code and `API_URL` for server-side fetches.

### 5. Path Aliases & Directory Organization

- Path alias `@/*` is mapped to `./src/*` in `tsconfig.json`.
- Recommended folder structure:
  - `src/app/`: Route definitions, layouts, error boundaries (`error.tsx`), and loading states (`loading.tsx`).
  - `src/components/`: Reusable UI components (buttons, cards, modals, navigation).
  - `src/hooks/`: Custom React hooks for client-side state and browser interactions.
  - `src/lib/`: Shared utilities, API client helpers, and constants.
  - `src/types/`: TypeScript type definitions, DTOs, and interface declarations.

### 6. Accessibility (a11y) & UX for Public School Realities

- Design for educators who may be working on low-spec hardware or intermittent internet connections.
- Ensure semantic HTML, proper ARIA attributes, keyboard navigability, and high color contrast (WCAG 2.1 AA).
- Optimize image assets with `next/image` and typography with `next/font`.

### 7. Strict Language Separation

- **User-Facing UI (PT-BR):** All labels, button texts, tooltips, dialogs, form validation messages, and error notifications displayed to teachers **MUST** be in Brazilian Portuguese (PT-BR).
- **Code & Comments (English):** All component names, variable names, functions, hooks, types, CSS classes, comments, and commit messages **MUST** be written in English.
