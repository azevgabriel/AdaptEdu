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

## 🌿 Branch Naming Conventions & Workflow

Direct commits and development on the primary branch (`main`) are **strictly forbidden**.

Whenever an issue is selected for implementation, a dedicated branch MUST be created from `main` using the following standardized pattern:

| Issue Type | Branch Pattern | Example |
| :--- | :--- | :--- |
| **`feature`** | `feat/[issue_number]` | `feat/3` |
| **`bug`** | `fix/[issue_number]` | `fix/14` |
| **`refactor`** | `refactor/[issue_number]` | `refactor/21` |

---

## 🔄 Issue Resolution & Pull Request Workflow

When resolving an issue:

1. **Branch Checkout:** Create and check out the dedicated branch following the table above (`feat/<id>`, `fix/<id>`, or `refactor/<id>`). Never implement directly on `main`.
2. **Implementation:** Develop the solution adhering strictly to the architecture guidelines in `apps/<domain>/docs/GLOBAL.md`.
3. **Testing & Coverage:** Ensure all automated test suites pass and satisfy the required coverage thresholds (>= 90%) across affected domains.
4. **Version Bump:** Increment the version of the modified application(s) according to the Semantic Versioning rules below.
5. **Changelog Entry:** Document the new feature, bug fix, or refactor in [`docs/CHANGELOG.md`](docs/CHANGELOG.md).
6. **Checklist & Scope Verification:** Before creating or finalizing the PR, read the target issue description and ensure all requirements, deliverables, and checkboxes are 100% fulfilled.
7. **User Confirmation & Pull Request (PR):** Upon explicit instruction and approval from the user, push the dedicated branch and create a Pull Request on GitHub. The PR description MUST reference the issue using auto-closing syntax (e.g., `Resolves #<id>`).
8. **Automated Lifecycle on Merge:**
   - **Automatic Issue Closing:** When the PR is merged into `main`, GitHub automatically transitions the linked issue to `Closed` via the `Resolves #<id>` keyword.
   - **Automatic Branch Cleanup:** Upon merge, the head branch (`feat/<id>`, `fix/<id>`, `refactor/<id>`) is automatically deleted via the cleanup workflow (`.github/workflows/cleanup-branch.yml`) and repository settings.

---

## 🔢 Versioning Strategy (Scoped per Application)

Each application in the monorepo maintains independent versioning with a base starting at `v1.0.0`:

| Change Type | Version Increment | Example Transition |
| :--- | :--- | :--- |
| **`feature`** | Minor | `v1.0.0` ➔ `v1.1.0` |
| **`bug`** | Patch | `v1.0.0` ➔ `v1.0.1` |
| **`refactor`** | Major | `v1.0.0` ➔ `v2.0.0` |

### Application Context Scope & Version Synchronization:
Whenever a version is incremented, update its configuration file **AND** update the corresponding version badge in the root [`README.md`](README.md):
- **Frontend changes:** Update version in `apps/web/package.json` and update the `web-v*` badge in `README.md`.
- **API changes:** Update version in `apps/api/package.json` and update the `api-v*` badge in `README.md`.
- **AI Engine changes:** Update version in `apps/engine/pyproject.toml` (and `apps/engine/version.py`) and update the `engine-v*` badge in `README.md`.

---

## 📝 Changelog (`docs/CHANGELOG.md`)

Whenever a new change is integrated, an entry must be appended to [`docs/CHANGELOG.md`](docs/CHANGELOG.md), grouped by application and version, specifying:
- Issue and PR reference links
- Summary of changes
- Date of release
