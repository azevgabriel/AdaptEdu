# GitHub & MCP Guidelines

This document defines the agent permissions, issue tracking standards, label taxonomy, pull request workflow, and semantic versioning rules for the AdaptEdu repository.

---

## 🤖 Agent Permissions (GitHub MCP)

When interacting with the GitHub Model Context Protocol (MCP) server or GitHub APIs:

- **Strict Permission Boundary:** The agent is **only authorized to create issues when explicitly requested by the user**.
- **No Autonomous Writes:** The agent must never create issues, close issues, open pull requests, merge code, or delete resources autonomously without direct user authorization.

---

## 🏷️ Issue Labels & Classification

All issues must be classified using the standardized repository labels:

### 1. Scope / Domain Labels
- `back-end (apps/api)`: Tasks affecting the NestJS API, Prisma schema, PostgreSQL database, or business rules.
- `front-end (apps/web)`: Tasks affecting the Next.js frontend, React components, teacher UI, or accessibility.
- `IA tasks (apps/engine)`: Tasks affecting the FastAPI AI engine, LangChain pipelines, prompts, or pedagogical reasoning.

> **Multi-Domain Rule:** When an issue involves both the API and the web interface, apply both `front-end (apps/web)` and `back-end (apps/api)` labels.

### 2. Type Labels
- `feature`: A purposeful improvement or new capability with a well-defined objective that does not alter unrelated secondary parts of the codebase.
- `bug`: A targeted fix for something broken or not functioning correctly.
- `refactor`: Structural changes across numerous files without altering core end-user functionality (e.g., framework/dependency updates for security requiring broad code adaptation).

---

## 🔄 Issue Resolution & Pull Request Workflow

When the user requests the resolution of an issue:

1. **Implementation:** Develop the solution adhering strictly to the architecture guidelines in `apps/<domain>/docs/GLOBAL.md`.
2. **Pull Request (PR):** Create a Pull Request that explicitly references and links the issue (e.g., `Resolves #<id>`).
3. **Changelog Entry:** Document the new feature, bug fix, or refactor in [`docs/CHANGELOG.md`](docs/CHANGELOG.md).
4. **Version Bump:** Increment the version of the modified application(s) according to the Semantic Versioning rules below.

---

## 🔢 Versioning Strategy (Scoped per Application)

Each application in the monorepo maintains independent versioning with a base starting at `v1.0.0`:

| Change Type | Version Increment | Example Transition |
| :--- | :--- | :--- |
| **`feature`** | Minor | `v1.0.0` ➔ `v1.1.0` |
| **`bug`** | Patch | `v1.0.0` ➔ `v1.0.1` |
| **`refactor`** | Major | `v1.0.0` ➔ `v2.0.0` |

### Application Context Scope:
- **Frontend changes:** Update version in `apps/web/package.json`.
- **API changes:** Update version in `apps/api/package.json`.
- **AI Engine changes:** Update version in `apps/engine/pyproject.toml`.

---

## 📝 Changelog (`docs/CHANGELOG.md`)

Whenever a new change is integrated, an entry must be appended to [`docs/CHANGELOG.md`](docs/CHANGELOG.md), grouped by application and version, specifying:
- Issue and PR reference links
- Summary of changes
- Date of release
