# FastAPI — High-Level Architecture & Guidelines

This document provides a concise architectural overview for **FastAPI** in `apps/engine/`. For detailed coding patterns, syntax rules, and reference implementations, consult the bundled official skill in [docs/skills/fastapi/SKILL.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/engine/docs/skills/fastapi/SKILL.md).

---

## 🤖 AI Guidelines & Official Skill

FastAPI provides official agent skills bundled with its package, as documented in [FastAPI - Develop with AI](https://fastapi.tiangolo.com/ai-development/).

- **Full Skill & Reference Guides:** [docs/skills/fastapi/SKILL.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/engine/docs/skills/fastapi/SKILL.md)
  - Parameter & dependency injection conventions (`Annotated[..., Depends(...)]`)
  - Pydantic v2 best practices (avoiding `...` and `RootModel`)
  - Server-Sent Events (SSE) and token streaming
  - Routing patterns, return types, and SDK generation

---

## 🚀 Execution & CLI

The service uses the official FastAPI CLI and Uvicorn:

- **Local Development:** `fastapi dev main.py` or `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- **Production / Docker:** `uvicorn main:app --host 0.0.0.0 --port 8000`
- **Entrypoint:** Configured via `[tool.fastapi] entrypoint = "main:app"` in `pyproject.toml` pointing to `app` in [main.py](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/engine/main.py).
- **Interactive Documentation:** Available locally at `http://localhost:8000/docs` (Swagger UI) and `http://localhost:8000/redoc`.

---

## 📐 Key Architectural Principles

1. **Strict Type Annotations:** Always use `typing.Annotated` for path parameters, query parameters, headers, and dependencies.
2. **Schema Contracts (Pydantic v2):** Use Pydantic models for request bodies and response contracts consumed by the NestJS backend and frontend.
3. **Async for AI Workloads:** Use `async def` for I/O-bound LLM invocations and token streaming (`StreamingResponse` / SSE). Use standard `def` only for CPU-bound or blocking synchronous operations.
4. **Modern Lifespan:** Manage application startup and shutdown (e.g., initializing LLM clients, connection pools) via an `@asynccontextmanager` `lifespan` handler instead of deprecated event decorators.
5. **Client-Facing Language (PT-BR):** All AI-generated pedagogical output and client-facing error messages must strictly be in Brazilian Portuguese (PT-BR), while all code and docstrings remain in English.
