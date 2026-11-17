# FastAPI Best Practices & Design Conventions — AdaptEdu AI Engine

This document establishes the official design patterns, coding conventions, and architectural best practices for the AdaptEdu **AI & Reasoning Engine** (`apps/engine/`).

These guidelines are adapted from community standards, primarily inspired by [zhanymkanov/fastapi-best-practices](https://github.com/zhanymkanov/fastapi-best-practices) and official FastAPI guidance, tailored to the specific needs of an asynchronous AI reasoning engine.

---

## 🏗️ 1. Project Organization & Modular Structure

As the AI Engine expands to accommodate RAG vector stores, similarity screening, and adaptive questionnaires, code must follow clear separation of concerns:

```
apps/engine/
├── docs/                   # Architecture, guidelines, and skills
│   ├── BEST_PRACTICES.md   # This document
│   ├── FASTAPI.md          # Framework conventions
│   └── GLOBAL.md           # Entry point index
├── scripts/                # Utility & CI automation scripts
│   ├── lint.sh             # Ruff linter and format validation
│   ├── test.sh             # Pytest test execution
│   └── test_cov.sh         # Test coverage runner (>= 90%)
├── tests/                  # Automated test suites
│   ├── __init__.py
│   ├── test_main.py        # Endpoint and lifecycle integration tests
│   └── test_version.py     # Version resolution unit tests
├── main.py                 # FastAPI application instantiation & routing
├── version.py              # Single source of truth version resolver
├── pyproject.toml          # PEP 621 metadata, tool configs (Ruff, Pytest, Coverage)
└── requirements.txt        # Pinned production & development dependencies
```

### Module Responsibilities:
- **Routers (`api/` or endpoints in `main.py`):** Handle HTTP transport, route parameter validation, and status code dispatching. Routers should not contain heavy AI logic.
- **Schemas (`schemas/`):** Pure Pydantic v2 models defining strict input payloads and output representations.
- **Chains & Services (`services/`):** LangChain reasoning pipelines, vector store retrievers, and prompt orchestrations.
- **Core / Config (`core/`):** App configuration, lifespan lifecycle handlers, and shared utilities.

---

## ⚡ 2. Async vs. Synchronous Endpoints

Understanding Python's event loop is critical for AI engine performance:

```python
# ✅ CORRECT: Use async def for non-blocking I/O (HTTP calls to LLM APIs, async streaming)
@app.get("/screening/{id}")
async def get_screening_analysis(id: str, service: Annotated[ScreeningService, Depends()]):
    return await service.analyze_student_async(id)

# ✅ CORRECT: Use def for CPU-intensive synchronous operations (FastAPI executes it in a worker thread pool)
@app.post("/vector/compute")
def compute_local_embedding(text: str):
    return local_tokenizer_cpu_heavy(text)

# ❌ WRONG: Calling blocking synchronous I/O inside an `async def` blocks the whole event loop!
@app.get("/bad")
async def bad_endpoint():
    time.sleep(5)  # BLOCKS all concurrent requests! Use asyncio.sleep(5) instead.
```

---

## 📋 3. Pydantic v2 Best Practices

All data exchange must adhere strictly to Pydantic v2 validation:

1. **Separation of Input vs. Output Models:** Never reuse a single model for both request input and response output when field requirements differ.
2. **Explicit Field Definitions:** Use explicit type hints with default values or `Field(...)` describing validation rules:
   ```python
   from pydantic import BaseModel, Field

   class ObservationRequest(BaseModel):
       student_synthetic_id: str = Field(..., min_length=3, description="Anonymized student ID")
       classroom_context: str = Field(..., max_length=500)
       intensity_score: int = Field(ge=1, le=5)
   ```
3. **Avoid Deprecated Constructs:** Do not use `...` as default in optional fields, and prefer native typed dictionaries or models over raw untyped dictionaries.

---

## 💉 4. Modern Dependency Injection with `Annotated`

Decouple route handlers from concrete implementations using `typing.Annotated` and FastAPI `Depends`:

```python
from typing import Annotated
from fastapi import Depends, APIRouter

def get_screening_service() -> ScreeningService:
    return ScreeningService()

ScreeningDep = Annotated[ScreeningService, Depends(get_screening_service)]

@router.post("/screening/match")
async def run_screening(payload: ObservationRequest, service: ScreeningDep):
    return await service.process(payload)
```

---

## 🛡️ 5. Error Handling & Standardized Responses

1. **HTTP Exceptions:** Raise FastAPI's built-in `HTTPException` with meaningful HTTP status codes (`status.HTTP_404_NOT_FOUND`, `status.HTTP_422_UNPROCESSABLE_ENTITY`).
2. **User-Facing Error Copy (PT-BR):** In accordance with root [`AGENTS.md`](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/AGENTS.md), user-facing error messages must be strictly in Brazilian Portuguese:
   ```python
   raise HTTPException(
       status_code=status.HTTP_404_NOT_FOUND,
       detail="Estudante não encontrado no registro pedagógico.",
   )
   ```
3. **Internal Logs in English:** All logger output, stack traces, and internal debugging metadata must be written in English.

---

## 🔍 6. Modern Python Linting & Formatting with Ruff

As emphasized in [The FastAPI Tutorial Never Told You to Add a Linter](https://medium.com/@patrickduch93/the-fastapi-tutorial-never-told-you-to-add-a-linter-dec76ca65a3f), codebases require consistent, automated linting:

- **Linter Choice:** We use **Ruff** (high-speed, Rust-based linter and formatter).
- **FastAPI-Specific Rule Handling:**
  - `B008` is ignored globally: Allows FastAPI's signature dependency pattern `Depends(...)` in argument defaults without warnings.
  - `E402` is ignored globally: Permits lazy or conditional imports when resolving cyclic dependencies.
- **Automation Commands:**
  ```bash
  # Check for lint errors
  ruff check .

  # Automatically fix fixable issues
  ruff check --fix .

  # Format files
  ruff format .

  # Verify formatting without modifying files (used in CI)
  ruff format --check .
  ```

---

## 🧪 7. Automated Testing & Coverage Gate

Follow official FastAPI testing practices ([FastAPI Testing Tutorial](https://fastapi.tiangolo.com/pt/tutorial/testing/)):

1. **Test Runner:** `pytest` paired with `httpx` (`TestClient`).
2. **Test Isolation:** Co-locate tests in `tests/` directory with `test_*.py` naming.
3. **Coverage Enforcement:** Automated test coverage must meet or exceed **90%** (`--cov-fail-under=90`).
4. **Execution Scripts:**
   - `./scripts/test.sh`: Runs the full pytest suite.
   - `./scripts/test_cov.sh`: Runs tests with coverage calculation and fails if under 90%.
