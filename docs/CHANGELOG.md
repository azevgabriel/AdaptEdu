# Changelog

All notable changes to the AdaptEdu monorepo applications are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) scoped per application.

---

## [Unreleased]

---

## Releases

### Brazilian Legislation & Accessibility Guidelines for Inclusive Education - 2026-11-18

Resolves [#9](https://github.com/azevgabriel/AdaptEdu/issues/9).

#### `apps/web` (Frontend) — `v2.1.0`

- Authored centralized legal reference guide in [`docs/ACCESSIBILITY_GUIDELINES.md`](docs/ACCESSIBILITY_GUIDELINES.md), establishing the statutory baseline for inclusive education across the platform.
- Detailed constitutional and infraconstitutional mandates:
  - Right to accessibility services, permanence, and dedicated school support professionals (*profissional de apoio escolar*) under Lei Federal nº 13.146/2015 (LBI, Art. 28), Lei Federal nº 12.764/2012 (TEA, Art. 3º), and Decreto Federal nº 6.949/2009 (CDPD, Art. 24).
  - Early and continuous instruction of Libras, Braille, and assistive technology resources under LBI Art. 28 and Lei Federal nº 9.394/1996 (LDB, Art. 60-A).
  - Complex communication needs & Augmentative and Alternative Communication (AAC / CAA) low-tech priority (communication boards with pictograms) under LBI Art. 28, Inciso XIX.
  - Accessibility requirements in selective admissions, vocational, and higher education under LBI Arts. 28 & 30 and LDB Cap. V-A (public notices in Libras, accessible examination formats, time extensions, and assistive resources).
  - Bilingual education for the deaf recognizing Libras as primary language (L1) and written Portuguese as secondary language (L2) under LDB Cap. V-A, Lei Federal nº 10.436/2002, and LBI Art. 28.
  - National Book and Didactic Material Program (PNLD) accessible format mandates under Decreto Federal nº 9.099/2017 Art. 25.
- Created Platform Architectural Mapping Matrix connecting each statutory mandate to current and planned platform modules across `apps/web`, `apps/api`, and `apps/engine`.
- Contextualized Brazilian inclusive education legislation on the login page (`src/app/login/`): added a supportive note referencing the Lei Brasileira de Inclusão (LBI nº 13.146/15) and LDB right to adapted pedagogical resources, positioning AdaptEdu as a light, practical partner for public school educators.
- Styled the educator login action card (`.cardColumn`) with sticky viewport vertical centering (`top: max(5rem, calc(50vh - 255px))`) on desktop and modernized global overflow to `overflow-x: clip` in `src/app/globals.css`, ensuring the login card remains visible and centered on screen as the teacher scrolls through pedagogical features and legal guidelines.
- Cross-referenced the guidelines in root [`AGENTS.md`](AGENTS.md) and [`apps/web/docs/GLOBAL.md`](apps/web/docs/GLOBAL.md).
- Updated `apps/web` version to `v2.1.0` and synchronized the web version badge in [`README.md`](README.md).

### Composable Design System, Lean Documentation Architecture, Anti-Slop Guidelines & Playwright CLI - 2026-11-18

Resolves [#12](https://github.com/azevgabriel/AdaptEdu/issues/12).

#### `apps/web` (Frontend) — `v2.0.0`

- Modularized radio design primitives into a clean semantic folder architecture under `src/components/radio/`:
  - `radio/group/`: `RadioGroup` and `RadioButton` (`RadioGroup.Item`) with roving `tabIndex` and keyboard cycling.
  - `radio/indicator/`: `RadioIndicator` with size, sensory, and high-contrast support.
  - `radio/card/`: Standardized, composable `RadioCard` supporting prop-driven card layouts (icon, title, badge, description, extra, indicator) as well as compound subcomponents (`RadioCard.Header`, `RadioCard.Title`, `RadioCard.Badge`, `RadioCard.Description`, `RadioCard.Extra`, `RadioCard.Icon`, `RadioCard.Indicator`).
  - `radio/label/`: `RadioLabel` and `RadioDescription`.
  - `radio/context.ts`: Decoupled `RadioGroupContext` and `RadioButtonContext`.
  - `radio/index.ts`: Central barrel export aggregating all sub-primitives.
- Consolidated ad-hoc radio implementations in `/configuracoes/acessibilidade`:
  - Refactored `ThemeSelector` (`components/theme-selector/`) to use the composable `RadioCard` primitive.
  - Refactored `CvdSelector` (`components/cvd-selector/`) to use `RadioCard`, eliminating manually duplicated radio indicator DOM and fixing italicized optical details per Dyslexia invariants.
  - Refactored `ReadingAccommodations` (`components/reading-accommodations/`) font-size selector to use `RadioGroup.Item`.
- Hardened accessibility and sensory ergonomics:
  - Ensured $\ge 44\times44\text{px}$ touch targets across all compound items.
  - Added complete Windows High Contrast Mode (`@media (forced-colors: active)`) and adaptive high-contrast (`[data-high-contrast="true"]`) support for indicators, borders, and cards.
  - Enforced roving `tabIndex` and keyboard cycling (Arrow keys, Home, End, Space, Enter).
- Established lean documentation architecture:
  - Created high-density, low-token `apps/web/docs/COMPONENT_CHEAT_SHEET.md` (< 100 lines) as the primary fast-track entry point for routine agent onboarding.
  - Updated `apps/web/docs/GLOBAL.md` to establish a tiered reading protocol, avoiding context window drag.
  - Eliminated cross-document redundancies across `COLORS.md` and `ACCESSIBILITY.md`.
  - Updated `DESIGN_SYSTEM.md` with compound component documentation.
- Formulated Anti-Slop Web Design Guidelines & Art Direction:
  - Authored `apps/web/docs/DESIGN_GUIDELINES.md` integrating principles from `Leonxlnx/taste-skill` and Vercel Labs' `web-design-guidelines`.
  - Defined explicit sensory-friendly palette rules, tactile active states, Nunito/Inter typography pairing, and Brazilian Portuguese (PT-BR) UX writing standards under the non-diagnostic principle.
- Standardized Primary Brand & Color Tokens:
  - Replaced primary brand purple with pedagogical **Azul Educacional** (`#2563eb`), aligning with clarity and mathematics while harmonizing with other pedagogical color tokens.
- Implemented Compound Design System Primitives:
  - Created generic compound `Breadcrumb` component (`src/components/breadcrumb/`) following W3C WAI-ARIA breadcrumb navigation patterns.
  - Refactored `Drawer` (`src/components/drawer/`) into a semantic compound subcomponent architecture (`Root`, `Body`, `Header`, `Footer`, `Close`, `Content`, `Overlay`, `Title`, `Description`).
  - Created generic compound `Tabs` component (`src/components/tabs/`) with roving `tabIndex`, cyclical keyboard navigation, and generic state support.
- Refactored Navigation & Accessibility Experience:
  - Removed obsolete `/minha-sala` route directory and streamlined Header user dropdown menu down to active settings and logout.
  - Standardized `RadioCard` indicators (`size="md"`, top-aligned flex positioning) across `ThemeSelector`, `CvdSelector`, and `ReadingAccommodations`.
  - Transformed accommodation `toggleCard`s into full-surface clickable controls with tactile hover/active feedback.
  - Increased page bottom spacing to prevent `FloatGroup` floating toolbar overlap collisions.
- Integrated Playwright CLI Verification:
  - Authored `apps/web/docs/PLAYWRIGHT_CLI.md` and created `apps/web/docs/skills/playwright-cli/SKILL.md` documenting token-efficient browser inspection, accessibility tree snapshots (`refs`), and lightweight smoke verification routines.
- Expanded automated unit tests in `src/components/radio-group/index.spec.tsx` and `src/components/index.spec.ts`, achieving 100% test pass rate with 65 test files and 321 automated unit tests in `apps/web`.

### Visual Accessibility Settings, Chromatic Deficiency Matrix, Inclusive Switch & RadioGroup - 2026-11-17

Resolves [#7](https://github.com/azevgabriel/AdaptEdu/issues/7) and [#10](https://github.com/azevgabriel/AdaptEdu/issues/10).

#### `apps/web` (Frontend) — `v1.3.0`

- Created dedicated visual accessibility settings route at `/configuracoes/acessibilidade` (`src/app/configuracoes/acessibilidade/page.tsx`, `page.module.css`, `page.spec.tsx`).
- Created `/configuracoes` entry point redirecting directly to `/configuracoes/acessibilidade` (`src/app/configuracoes/page.tsx`, `page.spec.tsx`).
- Implemented generic `RadioGroup` and `RadioButton` components (`src/components/radio-group/`) following WAI-ARIA APG compound composition guidelines, supporting cyclic arrow navigation, render props, and compound syntax (`RadioGroup.Item`, `RadioGroup.Indicator`).
- Refactored `ThemeSelector`, `CvdSelector`, and `ReadingAccommodations` to use the standardized `RadioGroup` and `RadioButton` components.
- Enhanced `Switch` component (`src/components/switch/`) following Heydon Pickering's Inclusive Components pattern with expanded touch target ($\ge 44\times44\text{px}$), Windows High Contrast (`@media (forced-colors: active)`).
- Implemented generic `Drawer` component (`src/components/drawer/`) providing an accessible lateral slide-out panel with focus management, Escape key dismiss, backdrop click dismiss, body scroll lock, size options (`sm`, `md`, `lg`, `xl`, `full`), positions (`right`, `left`), and modal/non-modal integration.
- Componentized `ChromaticSwatchCard` (`src/app/configuracoes/acessibilidade/components/chromatic-swatch-card/`) eliminating duplicate card markup across hierarchy and discipline lists in `ChromaticMatrix`.
- Refactored `ReadingAccommodations` and `HandoutPreview` to utilize the reusable `Switch` component.
- Integrated interactive lateral validation `Drawer` on `/configuracoes/acessibilidade`: allows teachers to validate color matrix swatches and test pedagogical handout adaptations in real time via a tabbed interface ("Prévia: Roteiro Pedagógico" & "Matriz de Comparação Cromática") as options are toggled, accessible via a launcher card and sticky floating action button (`Validar Cores & Prévia`).
- Implemented `ThemeSelector` component (`components/theme-selector/`) featuring selectable visual option cards for Light Mode and Dark Mode.
- Implemented `CvdSelector` component (`components/cvd-selector/`) supporting Padrão (Tricromático Universal), Deuteranopia (Verde/M), Protanopia (Vermelho/L), Tritanopia (Azul/Amarelo/S), and Acromatopsia (Monocromia Total + Escudo Anti-Ofuscamento).
- Implemented `ChromaticMatrix` component (`components/chromatic-matrix/`) providing side-by-side color perception comparisons across all content hierarchy tiers and school disciplines with ophthalmological axis tooltips.
- Implemented `ReadingAccommodations` component (`components/reading-accommodations/`) providing Font Size Scaling (Normal 100%, Grande 115%, Muito Grande 130%), Adaptive High Contrast (structural outlines without painful glare), Dyslexia & ADHD Reading Spacing, Reduced Motion, and Settings Reset.
- Implemented `HandoutPreview` component (`components/handout-preview/`) offering a realistic classroom handout preview with live token reflection and an interactive Educator Optical Simulation Lens applying SVG deficiency filters (`#sim-deuteranopia`, `#sim-protanopia`, `#sim-tritanopia`, `#sim-achromatopsia`).
- Refactored `Header` component (`src/components/header/`):
  - Removed standalone quick theme toggle button from action bar.
  - Refactored Accessibility button into a direct Next.js `Link` navigating to `/configuracoes/acessibilidade` with active indicator badge when non-default accommodations are active.
  - Retired the legacy inline popover dialog from Header in favor of the dedicated settings page.
- Fixed severe chromatic and sensory contradictions in design tokens (`apps/web/docs/COLORS.md` and `apps/web/src/app/globals.css`):
  - **Tritanopia Dark Mode Fix:** Overrode `--bg-canvas`, `--bg-surface`, and `--bg-subtle` in `[data-cvd="tritanopia"]` with neutral Zinc darks (`#121212`, `#1c1c1c`, `#262626`) instead of short-wavelength blue-tinted slate; remapped brand tokens to Teal/Cyan (`#0891b2`); eradicated all purple/violet reliance from "Dados & Fórmulas" (remapped to Terracotta `#c2410c`) and "Ciências" (remapped to Deep Teal `#0e7490`).
  - **Achromatopsia Anti-Glare & High-Contrast Photophobia Fix:** Eradicated pure white `#ffffff` surfaces in light-mode Achromatopsia, replacing them with soft matte anti-glare neutrals (`--bg-canvas: #e4e4e7`, `--bg-surface: #d4d4d8`); enforced structural contrast (thick 2px/3px borders, dashed/dotted patterns, distinct geometric icons) under High Contrast without photophobic luminance glare.
- Audited and reinforced accessibility across all shared UI components (`GoogleSignInButton`, `Footer`, `Drawer`, `Avatar`, `Switch`, `RadioGroup`) with 153 automated tests passing across 26 test suites.

### Google OAuth 2.0, Route Protection & Security Baseline - 2026-11-17

Resolves [#1](https://github.com/azevgabriel/AdaptEdu/issues/1) and [#6](https://github.com/azevgabriel/AdaptEdu/issues/6).

#### `apps/web` (Frontend) — `v1.2.0`

- Created `/login` presentation and login page (`src/app/login/page.tsx`, `login-auth-card.tsx`, `page.module.css`).
- Presented AdaptEdu's core mission: accessible pedagogical adaptations for neurodivergent students (autism, ADHD, dyslexia, dyscalculia, Tourette syndrome) to reduce teacher overload and prevent school dropout.
- Implemented accessible, WCAG 2.1 AA compliant `GoogleSignInButton` component with Google vector branding and neurodiversity-friendly focus states.
- Created Next.js Edge Middleware (`src/middleware.ts`) intercepting private routes (`/minha-sala`, `/dashboard`, `/turmas`, `/planejamento`) and redirecting unauthenticated users to `/login?returnUrl=...`.
- Implemented client-side `AuthProvider` and `useAuth` hook (`src/contexts/auth-context.tsx`) managing user session, automatic profile sync, Google login redirection, and sign-out.
- Integrated `MinhaSalaHeader` in `minha-sala/layout.tsx` to display real authenticated teacher profile and wire sign-out action.
- Documented frontend security guidelines (client validation limits, XSS prevention, Next.js security headers) in `apps/web/docs/SECURITY.md`.
- Added comprehensive unit and integration test suites reaching 99.51% statement coverage and 100% function coverage.

#### `apps/api` (Backend) — `v1.2.0`

- Added `User` model and `Role` enum to Prisma schema (`prisma/schema.prisma`) with `id`, `email`, `name`, `avatarUrl`, `googleId`, `role`, `createdAt`, and `updatedAt`.
- Authored and applied initial database migration (`20261117000000_init_user_model`).
- Created `PrismaModule` and `PrismaService` extending PrismaClient for PostgreSQL connection lifecycle management.
- Implemented `AuthModule`, `AuthService`, and `AuthController` delivering:
  - `GET /auth/google`: Initiates Google OAuth consent screen.
  - `GET /auth/google/callback`: Verifies Google profile, upserts user in Prisma, generates JWT session, sets HTTP-only cookie, and redirects to frontend.
  - `GET /auth/me`: Returns current authenticated teacher profile.
  - `POST /auth/logout`: Clears session cookie and invalidates session.
- Implemented `JwtAuthGuard`, `@Public()` decorator, and `@CurrentUser()` param decorator for route protection across NestJS controllers.
- Configured CORS with credentials in `main.ts` for frontend communication.
- Documented backend security guidelines (IDOR defenses, NestJS guards, rate limiting, CORS, data serialization) in `apps/api/docs/SECURITY.md`.
- Configured Prisma Client auto-generation in `postinstall` script and GitHub Actions CI.
- Added test suites for Prisma service, JWT guard, auth service, and auth controller with 99.07% statement coverage and 100% function coverage.

#### `apps/engine` (AI & Reasoning Engine)

- Documented AI engine security guidelines (safe deserialization, ban on `eval`/`exec`, constant-time comparisons, Pydantic validation) in `apps/engine/docs/SECURITY.md`.

#### Repository Governance & CI/CD

- Established mandatory AI PR code review security protocol in `docs/skills/code-review-security/SKILL.md` (covering IDOR, parameter tampering, data exposure, sanitization, and dependency audits).
- Integrated automated vulnerability audits (`npm audit` for web/api and `pip-audit` for engine) in `.github/workflows/ci.yml`.

### Testing & CI Coverage Gate - 2026-11-17

Resolves [#3](https://github.com/azevgabriel/AdaptEdu/issues/3).

#### `apps/web` (Frontend) — `v1.1.0`

- Integrated Vitest coverage reporter with `@vitest/coverage-v8`.
- Added test suites for App Router pages and layouts (`page.spec.tsx`, `minha-sala/page.spec.tsx`, `minha-sala/layout.spec.tsx`, `components/index.spec.ts`).
- Enhanced Header component test coverage to 100% across statements, branches, functions, and lines.
- Enforced >= 90% coverage threshold in `vitest.config.ts`.
- Added `test:cov` and `test:coverage` npm scripts in `package.json`.

#### `apps/api` (Backend) — `v1.1.0`

- Added unit test suites for `AppService` and `AppModule`.
- Configured Vitest coverage reporter with v8 provider and coverage thresholds in `vitest.config.ts`.
- Maintained 100% lines, functions, and statements test coverage.

#### `apps/engine` (AI Engine) — `v1.1.0`

- Established official FastAPI testing layer following FastAPI tutorial conventions.
- Added `pytest` and `pytest-cov` test suites for FastAPI routes and version utility.
- Added executable test and coverage scripts (`scripts/test.sh`, `scripts/test_cov.sh`).
- Configured pytest and coverage thresholds (>= 90%) in `pyproject.toml`.

#### Continuous Integration (`.github/workflows/ci.yml`)

- Created automated PR and push workflow for `main` branch.
- Runs parallel jobs validating tests and enforcing >= 90% test coverage across `apps/web`, `apps/api`, and `apps/engine`.

### Initial Setup - 2026-11-17

- Initialized core monorepo architecture with `apps/api`, `apps/engine`, and `apps/web`.
- Initialized container orchestration with Docker Compose.
- Established repository standards, GitHub MCP workflows, and accessibility guidelines.
