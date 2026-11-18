# Backend Core (NestJS + Prisma + PostgreSQL) — Global Index

This document serves as the **Local Context Entry Point** for coding agents and developers working on `apps/api/`.

---

## 🎯 Role and Responsibilities

The AdaptEdu **Backend Core** is the authoritative boundary for business logic, persistence, authentication, and orchestration of asynchronous workflows. It mediates interactions between the teacher-facing web application and the AI reasoning engine.

### Monorepo Architectural Boundaries

- **Business Logic & Persistence:** PostgreSQL, Prisma schemas, migrations, authentication, and core domain services belong strictly to `apps/api/`.
- **No Direct AI / LLM Orchestration:** LangChain pipelines, prompt engineering, embedding models, and spatial reasoning belong strictly to `apps/engine/` (FastAPI). The API interacts with the engine via HTTP (`ENGINE_URL`).
- **No UI Rendering:** The end-user interface is solely the responsibility of `apps/web/` (Next.js).

---

## 📖 Architecture & Local Guidelines

- [LGPD.md](docs/LGPD.md): Centralized Brazilian General Data Protection Law (LGPD) guidelines, data classification, and backend privacy protocols.
- [NESTJS.md](apps/api/docs/NESTJS.md): NestJS standards (ESM, NodeAdapter, Vitest, Standard Schema) and observability via NestJS Observe.
- [SECURITY.md](apps/api/docs/SECURITY.md): Backend security guidelines (defenses against IDOR, sanitization, CORS, rate limiting, and dependency auditing).

---

## 🤖 Agent Skills & Core Concepts

Instructions and skills for the Prisma ecosystem are centralized in `apps/api/docs/skills/`:

- [prisma-composer-core-concepts](apps/api/docs/skills/prisma-composer-core-concepts/SKILL.md): Declarations, compute services (`compute()`), resources, and Prisma Composer architecture.
- [prisma-platform-core-concepts](apps/api/docs/skills/prisma-platform-core-concepts/SKILL.md): Prisma Platform infrastructure, branch management, preview environments, and the Prisma CLI.

---

## 🛡️ Invariants & Domain Rules

All developers and agents must adhere strictly to the global invariants defined in root [AGENTS.md](AGENTS.md). In addition, `apps/api/` enforces:

1. **Authorization & Access Control (IDOR):** Strictly adhere to [SECURITY.md](apps/api/docs/SECURITY.md). Never trust client-provided resource IDs (`student_id`, `classroom_id`); always verify that the authenticated user owns or has authorized access to the requested entity.
2. **Server-Side Validation:** All incoming payloads must be strictly validated and sanitized using DTOs with whitelist stripping (`whitelist: true`, `forbidNonWhitelisted: true`). Client-side validation is never considered a security boundary.
3. **Session & Credential Security:** Store sessions in secure, `HttpOnly` cookies, protect authentication routes with rate limiting via `@nestjs/throttler`, and never return sensitive database attributes (passwords, tokens).
