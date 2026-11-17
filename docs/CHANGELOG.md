# Changelog

All notable changes to the AdaptEdu monorepo applications are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) scoped per application.

---

## [Unreleased]

---

## Releases

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
