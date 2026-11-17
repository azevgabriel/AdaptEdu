# AI & Reasoning Engine (FastAPI + LangChain) — Global Index

This document serves as the **Local Context Entry Point** for coding agents and developers working on `apps/engine/`.

---

## 🎯 Role and Responsibilities

The AdaptEdu **AI Engine** is responsible for centralizing all intelligent processing, prompt engineering, LLM chain orchestration, accessibility reasoning, and pedagogical constraint satisfaction for the inclusion of neurodivergent students.

### Monorepo Architectural Boundaries

- **AI Isolation:** The entire LangChain ecosystem, OpenAI API calls, embedding models, and pedagogical/spatial adaptation logic belong exclusively to `apps/engine/`.
- **No Direct Database Access:** PostgreSQL and Prisma logic belong strictly to `apps/api/` (NestJS). The engine exposes HTTP endpoints that are consumed by the NestJS backend via the `ENGINE_URL` environment variable (e.g., `http://engine:8000`).
- **No UI Rendering:** The end-user interface is solely the responsibility of `apps/web/` (Next.js).

---

## 📖 Architecture & Local Guidelines

- [FASTAPI.md](apps/engine/docs/FASTAPI.md): Modern FastAPI patterns (FastAPI CLI, `lifespan`, strict typing with `Annotated`, Pydantic v2, token streaming, and the official [Develop with AI](https://fastapi.tiangolo.com/ai-development/) guide).

---

## 🤖 Agent Skills & Core Concepts

Official FastAPI AI instructions and skills are located at:

- [fastapi](apps/engine/docs/skills/fastapi/SKILL.md): Official skill providing conventions, CLI commands, dependency injection, Pydantic models, SSE/token streaming, and detailed reference guides.

---

## 🧠 Technologies & Stack Components

1. **FastAPI (>= 0.128):** High-performance asynchronous web framework for REST routes and SSE streaming.
2. **LangChain & LangChain-Core (>= 0.3):** Prompt structuring, pedagogical reasoning chains, and transformation pipelines.
3. **LangChain-OpenAI & OpenAI SDK:** Foundation model integrations for generating and tailoring lesson adaptations.
4. **LangSmith:** Traceability, observability, and debugging for LLM chain executions.
5. **Pydantic v2:** Strict validation and serialization for input and output schemas.
6. **PEP 621 (`pyproject.toml`):** Standard Python project configuration and versioning specification, serving as the direct equivalent of `package.json`.

---

## 🛡️ Invariants & Domain Rules

All developers and agents must adhere strictly to the global invariants defined in root [AGENTS.md](AGENTS.md). All AI prompt engineering, reasoning pipelines, and generated pedagogical outputs must comply with the language, privacy, and security standards established there.
