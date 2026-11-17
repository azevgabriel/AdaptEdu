# Changelog

All notable changes to the AdaptEdu monorepo applications are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) scoped per application.

---

## [Unreleased]

---

## Releases

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
