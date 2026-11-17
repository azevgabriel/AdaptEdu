# AdaptEdu — Instructions for Coding Agents

This repository contains AdaptEdu, an open-source web platform designed to support public school teachers in including the growing number of neurodivergent students (including those with autism, ADHD, dyslexia, Tourette syndrome, dyscalculia, among others).

Recognizing that the Brazilian education system faces a lack of basic resources and that educators are often overburdened, this software was created to simplify—not complicate—the teaching process. The platform offers practical, accessible tools, ranging from minor adjustments to classroom routines to support with lesson planning, all while respecting the specific reality of each individual school.

The project’s core impact is twofold: efficiently empowering teachers and combating school dropout rates. By supporting students during their most vulnerable stages—childhood and adolescence—AdaptEdu’s ultimate goal is to ensure that these young people reach adulthood aware of their own aptitudes, possessing the autonomy to express themselves, and prepared to enter the job market.

Read these rules before beginning any work. You are acting as an autonomous programming agent. The human user makes the decisions; you take on the role of the executor.

## Always

- **Credentials:** Never display, log, or commit API keys (such as OpenAI keys or JWT secrets) or database URIs. Always use `.env` files.
- **User-Facing Language (PT-BR):** The end-users are Brazilian public school teachers. All UI text, frontend components, client-facing error messages, and AI-generated pedagogical reports **MUST** be strictly in Brazilian Portuguese (PT-BR).
- **Code & Agent Instructions Language (English):** All source code, function names, variable names, type definitions, docstrings, commit messages, technical documentation, and agent instructions/skills/rules **MUST** be written strictly in English.
- **Data Privacy & Mocking:** Never use real names, ID numbers (CPF/RG), or real medical/psychological records in tests, database seeds, or AI prompts. Always use synthetic/mocked data (e.g., Faker) to comply with data protection laws (LGPD).
- **Hypothesis-Only & Non-Diagnostic Principle:** The platform must **NEVER** formulate, claim, or present a clinical or medical diagnosis, nor definitively state that a student has a neurodivergence or clinical condition. Technological assistance does not replace human diagnosis certified by qualified healthcare professionals. All screening metrics, similarity percentages, and AI-generated pedagogical insights must be treated strictly as observational hypotheses based on scientific literature of symptoms and behaviors. The software must always urge educators to liaise with school coordination, engage parents or guardians, and advise specialized medical or psychological follow-up.
- **Respect Boundaries (Monorepo Layout):** Never mix responsibilities across the defined domains. Do not write direct database queries or Prisma logic inside the frontend (`apps/web/`). Do not put UI rendering or LLM prompts inside the backend API (`apps/api/`). Keep all LangChain, OpenAI, and AI spatial reasoning strictly isolated within the Python engine (`apps/engine/`).
- **Documentation DRY (Don't Repeat Yourself):** Root `AGENTS.md` is the single source of truth for all global invariants above. Never copy, re-declare, or duplicate these rules in subordinate markdown files (`apps/*/docs/*` or `docs/*`). Sub-documents must focus exclusively on domain-specific concerns and reference root documentation when necessary.
- **Root-Relative Paths:** All file paths, markdown links, and cross-references MUST be written starting from the project root directory (e.g., `apps/web/docs/NAMING_CONVENTIONS.md`, `apps/api/docs/NESTJS.md`, `AGENTS.md`). Never use machine-specific absolute paths (such as `file:///Users/...`) or fragile relative traversal (such as `../../`).
- **Decoupled Issue Creation & Implementation:** Creating a GitHub issue is strictly an issue tracking and specification step; **creating an issue does NOT mean implementing it**. Creating an issue (`"Criar uma issue no GitHub"`) and implementing an issue (`"Implementar a issue [link/id]"`) are two distinct, independent actions. The agent must never autonomously begin implementation when an issue is created or discussed; implementation must only begin upon an explicit user instruction.
- **Mandatory Review Gate Before Commit & Push:** When the agent finishes implementing an issue and passes all automated test suites, the agent must **NEVER** autonomously create a git commit or push changes to the remote branch. The agent must stop and present the code for collaborative review with the user. The agent is only authorized to create a commit and push once the user explicitly signs off on the code package (e.g., `"Finalizado esse pacote de código"`).
- **Explicit Pull Request (PR) Command:** Opening a Pull Request is never automated. The agent must only create a Pull Request when explicitly instructed by the user (e.g., `"agora podemos subir o PR"`).

## Layout

The monorepo is divided into strict domains. Before modifying any application, the agent **MUST** read the entry point document indicated in the table below.

| Path           | Tech Stack & Role                                                                                    | Local Context Entry Point                      |
| :------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| `docs/`        | **Repository Governance & Releases:** GitHub workflows, issue/PR management, and project changelog.  | 📖 Read `docs/GITHUB.md` & `docs/CHANGELOG.md` |
| `apps/api/`    | **Backend Core (NestJS + Prisma + PostgreSQL):** Business logic and asynchronous task orchestration. | 📖 Read `apps/api/docs/GLOBAL.md`              |
| `apps/engine/` | **AI & Reasoning (FastAPI + LangChain):** LLM processing and constraint satisfaction.                | 📖 Read `apps/engine/docs/GLOBAL.md`           |
| `apps/web/`    | **Frontend (Next.js):** Teacher-facing interactive UI.                                               | 📖 Read `apps/web/docs/GLOBAL.md`              |

## Repository Governance & Versioning (`docs/`)

The root `docs/` directory maintains global tracking and repository standards:

- **[CHANGELOG.md](docs/CHANGELOG.md):** Central record for all project update contexts, version progressions, and release history across all monorepo applications.
- **[GITHUB.md](docs/GITHUB.md):** Rules and constraints for GitHub MCP agent permissions (strictly user-requested issue creation, explicit separation of issue creation vs. implementation, mandatory code review gate prior to commits, explicit PR authorization), label classification (`feature`, `bug`, `refactor`, domain scopes), pull request linkage, and per-app semantic version increments (`v1.0.0` base).
- **[CODE_REVIEW_SECURITY.md](docs/CODE_REVIEW_SECURITY.md):** Mandatory security review protocol, vulnerability checklist (IDOR, parameter tampering, data exposure, sanitization, and dependency audits), and PR feedback template for AI coding agents and reviewers.
