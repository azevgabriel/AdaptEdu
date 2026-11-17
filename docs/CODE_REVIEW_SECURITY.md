# Security Code Review Guide (`CODE_REVIEW_SECURITY.md`)

This document defines the mandatory **Security Code Review Protocol** for AI coding agents and human reviewers when inspecting Pull Requests (PRs) across the AdaptEdu monorepo (`apps/web`, `apps/api`, `apps/engine`).

---

## 🎯 Purpose & Reviewer Role

Every pull request must be thoroughly audited through a security lens before approval. The reviewer's primary objective is to detect access control flaws, injection vectors, data leaks, and configuration oversights before they reach `main`.

When conducting a PR review, follow the structured checklist below and formulate actionable feedback adhering to the provided report format.

---

## 📋 Security Review Checklist

### 1. Access Control & Authorization (IDOR / BOLA)
- [ ] **Ownership Verification:** Does any endpoint take a resource identifier (`id`, `studentId`, `userId`, `classroomId`) from route parameters or request body?
  - Verify that the service explicitly checks whether the authenticated user (`req.user.id`) owns the resource or has authorized access.
  - Reject code that trusts client-provided IDs without server-side ownership queries.
- [ ] **Role & Scope Boundaries:** Are administrative or privileged actions guarded by explicit guards and role checks?

### 2. Parameter Tampering & Mass Assignment
- [ ] **Payload Whitelisting:** Are input payloads validated through strongly-typed DTOs (NestJS `class-validator` / Standard Schema) or Pydantic v2 schemas?
  - Ensure unknown properties cannot be injected (e.g., `whitelist: true`, `forbidNonWhitelisted: true`).
- [ ] **No Client-Supplied Permissions:** Verify that attributes such as `role`, `isAdmin`, status overrides, or computational limits cannot be supplied or manipulated by the client.

### 3. Business Logic & Flow Bypasses
- [ ] **Server-Side State Enforcement:** For multi-step workflows (e.g., pedagogical screenings, onboarding flows, consent forms), verify that the backend independently validates completion of prerequisite steps in the database before proceeding.
- [ ] **No Client Redirection Reliance:** Reject any logic that relies on client-side routing redirects or hidden UI fields to enforce business state transitions.

### 4. Authentication, Session & Rate Limiting
- [ ] **Rate Limiting:** Are authentication routes (`/auth/login`, `/auth/google/callback`, password recovery) and resource-heavy endpoints rate-limited via `@nestjs/throttler` or equivalent?
- [ ] **Token Validation:** Are JWTs signed with strong secrets and properly validated (signature, expiration, audience)?
- [ ] **Server-Side Invalidation:** Does logout perform server-side invalidation or session revocation rather than simply deleting the client cookie?
- [ ] **Timing Attack Defense:** In Python (`apps/engine`) and Node.js (`apps/api`), are cryptographic comparisons (hashes, tokens, signatures) performed using constant-time comparison (`secrets.compare_digest()` or `crypto.timingSafeEqual()`)?

### 5. Sensitive Data Exposure & Privacy (LGPD)
- [ ] **Response Entity Pruning:** Are API endpoints returning raw database models that leak password hashes, tokens, or internal flags?
  - Require explicit Prisma `select` projections, DTO mapping, or `@Exclude()` serialization.
- [ ] **No Secrets in Frontend Bundles:** Confirm that no private API keys, database connection strings, or JWT secrets are exposed in `apps/web/` source code or `NEXT_PUBLIC_*` environment variables.
- [ ] **Synthetic Test Data:** Ensure all automated tests and seeds use synthetic mock data (`@faker-js/faker`). No real names, CPFs, or medical records are permitted.

### 6. Injection & Input Sanitization
- [ ] **Server-Side Validation Independence:** Ensure no validation logic relies exclusively on browser HTML5 attributes (`maxlength`, `type="email"`) or frontend scripts.
- [ ] **SQL Injection:** Confirm all database interactions use Prisma's parameterized queries. Strictly reject dynamic SQL string interpolation (`$queryRawUnsafe` with templates).
- [ ] **Cross-Site Scripting (XSS):**
  - Verify that user inputs rendered in React use standard JSX escaping.
  - Strictly audit any use of `dangerouslySetInnerHTML`; require audited HTML sanitization (`DOMPurify`) if markup is unavoidable.
  - Verify dynamic links (`<a href={url}>`) do not allow `javascript:` or `data:` schemes.
- [ ] **Server-Side Request Forgery (SSRF):** If the application fetches external URLs, verify that protocol schemes (`https:` only) are whitelisted and loopback/private IP ranges (RFC 1918, `127.0.0.1`, `localhost`, `169.254.169.254`) are blocked.

### 7. Configurations, CORS & Error Masking
- [ ] **CORS Configuration:** Reject wildcard `Access-Control-Allow-Origin: *` when credentials are permitted (`Access-Control-Allow-Credentials: true`). Verify allowed origins match trusted frontend domains.
- [ ] **Error Masking:** Ensure production HTTP 500 error responses do not leak database exceptions, stack traces, or framework versions. Internal logging must capture traces securely.
- [ ] **Security Headers:** Verify HTTP security headers (Helmet / Next.js headers) are present.

### 8. Python & AI Engine Security (`apps/engine`)
- [ ] **Prohibited Execution Builtins:** Confirm that `eval()`, `exec()`, and `os.system()` are completely absent from the codebase.
- [ ] **No Insecure Deserialization:** Confirm that Python `pickle` is never used to parse untrusted or external data.
- [ ] **Token Generation:** Confirm that `secrets` is used instead of `random` for token or credential generation.
- [ ] **Prompt Injection & LLM Output Parsing:** Verify that user inputs to prompts are sanitized and outputs are strictly parsed with Pydantic v2 models before downstream use.

### 9. Dependency Vulnerability Audits
- [ ] **NPM & Pip Audits:**
  - Verify that newly added or modified dependencies in `apps/web/package.json`, `apps/api/package.json`, and `apps/engine/requirements.txt` do not introduce high or critical CVEs.
  - Consult CI audit logs (`npm audit` and `pip-audit`).

---

## 📝 PR Security Review Response Template

When delivering security review comments on a PR, structure your evaluation as follows:

```markdown
### 🛡️ Security Code Review Summary
- **Verdict:** [APPROVE / REQUEST_CHANGES / COMMENT]
- **Audited Areas:** [e.g., apps/api auth routes, apps/web login form]

#### 🔍 Checklist Evaluation
- [x] Access Control & IDOR: PASSED / FAILED / N/A
- [x] Parameter Tampering & DTO Whitelisting: PASSED / FAILED / N/A
- [x] Authentication & Rate Limiting: PASSED / FAILED / N/A
- [x] Sensitive Data Exposure: PASSED / FAILED / N/A
- [x] Injection & Sanitization: PASSED / FAILED / N/A
- [x] Configuration & Error Masking: PASSED / FAILED / N/A
- [x] Python AI Engine Invariants: PASSED / FAILED / N/A
- [x] Dependency Audits: PASSED / FAILED / N/A

#### ⚠️ Security Findings & Vulnerabilities
*(If vulnerabilities are identified, detail each item below)*

- **Finding [1]:** [Descriptive title, e.g., IDOR in Student Observation Endpoint]
  - **Severity:** [Critical | High | Medium | Low | Informational]
  - **Location:** `apps/api/src/students/students.service.ts#L42`
  - **Description:** [Explain the flaw, attack scenario, and potential impact]
  - **Vulnerable Snippet:**
    ```typescript
    // code snippet
    ```
  - **Recommended Remediation:**
    ```typescript
    // corrected code snippet
    ```

#### 💡 Hardening Opportunities
- [Actionable best practice or defense-in-depth improvement]
```

---

## 📚 Core References
- [10 JavaScript Security Vulnerabilities and How to Fix Them](https://medium.com/@zaid.zrf/10-javascript-security-vulnerabilities-and-how-to-fix-them-00cf976a95ff)
- [Snyk - JavaScript Security Best Practices](https://snyk.io/articles/javascript-security/)
- [Python Security Best Practices & pip-audit](https://nhimg.org/glossary/python-security/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
