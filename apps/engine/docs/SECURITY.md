# AI Engine Security Guidelines (`apps/engine`)

This document outlines the Python, FastAPI, and LangChain security standards and defensive practices enforced across the AdaptEdu AI & Reasoning Engine.

---

## 🎯 Role & AI Security Model

The AdaptEdu **AI Engine** (`apps/engine/`) processes teacher observations, manages RAG retrievals, and orchestrates LLM chains for neurodivergence screening hypotheses. As defined in root [AGENTS.md](AGENTS.md), the engine must never formulate definitive medical diagnoses, and all processing must uphold strict data privacy (LGPD) and execution security.

Security in Python requires protecting against unauthorized execution, code/prompt injections, data leakage, and insecure dependencies.

---

## 🛡️ Critical Threat Vectors & Invariants

### 1. Input Validation & Prohibited Execution Functions

- **Strict Ban on Dangerous Builtins:**
  - **NEVER** use `eval()`, `exec()`, or `os.system()` with untrusted, external, or user-influenced data.
  - If dynamic subprocess execution is strictly required, use `subprocess.run()` with argument lists (never `shell=True`) and explicit timeouts.
- **Prompt Injection Defense:**
  - Sanitize and encapsulate raw user text before feeding it into LangChain prompt templates.
  - Clearly delineate system instructions from user observations using structured message roles (`SystemMessage`, `HumanMessage`).
  - Validate and parse all LLM outputs using strict Pydantic v2 schemas; never treat raw LLM text as executable code.

### 2. Safe Deserialization (No `pickle`)

- **Prohibition of Insecure Pickling:**
  - **DO NOT** use Python's `pickle`, `shelve`, or `marshal` modules to deserialize data received from external sources, API requests, or cache layers. Deserializing untrusted `pickle` payloads allows arbitrary code execution (RCE).
  - Use standard JSON (`orjson`, `json`) or Pydantic models for serialization and deserialization.

### 3. Secrets Management & Environment Isolation

- **Zero Hardcoded Credentials:**
  - Never commit, display, or hardcode API keys (such as `OPENAI_API_KEY`, `LANGCHAIN_API_KEY`), tokens, or secrets into source code or test files.
  - Manage all configuration via `.env` files using `pydantic-settings` or `python-dotenv`.
  - Ensure `.env` is listed in `.gitignore` and `.dockerignore`.

### 4. Cryptography, Tokens & Timing Attack Mitigation

- **Cryptographically Secure Randomness:**
  - Use Python's built-in `secrets` module (e.g., `secrets.token_urlsafe()`, `secrets.token_hex()`) instead of the pseudo-random `random` module for generating authentication tokens, salt values, or session IDs.
- **Constant-Time Comparison:**
  - When comparing hashes, tokens, or webhook signatures, use `secrets.compare_digest()` to prevent timing attacks.
  ```python
  import secrets

  # ❌ VULNERABLE: Susceptible to timing attacks
  is_valid = user_token == expected_token

  # ✅ SECURE: Constant-time comparison
  is_valid = secrets.compare_digest(user_token, expected_token)
  ```

### 5. Static Analysis & Security Protection Tools

- **SAST (Static Application Security Testing):**
  - **Bandit:** Run Bandit (`bandit -r .`) to identify common security flaws (such as hardcoded passwords, insecure imports, and unsafe temp file creation) in Python code.
  - **Ruff:** Use Ruff to enforce linting, code hygiene, and identify deprecated or insecure patterns.
- **Dependency Auditing:**
  - **`pip-audit` / `safety`:** Regularly audit installed dependencies against known vulnerability databases (CVEs).
  - Dependency vulnerability scans are integrated into the continuous integration workflow (`.github/workflows/ci.yml`).
- **Python Security Reporting:**
  - In the event a zero-day or vulnerability in the CPython runtime itself is discovered, report it through the official [Python Security Response Team](https://www.python.org/dev/security/).

---

## 📚 References
- [Python Security Best Practices (nhimg.org)](https://nhimg.org/glossary/python-security/)
- [Safety & pip-audit: Vulnerability Management in Python](https://www.getsafety.com/blog-posts/python-security-best-practices-for-developers)
- [Snyk Python Security Best Practices Cheat Sheet](https://snyk.io/blog/python-security-best-practices-cheat-sheet/)
- [Bandit: Security linter for Python](https://github.com/PyCQA/bandit)
