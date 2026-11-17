# Frontend Security Guidelines (`apps/web`)

This document outlines the security architecture, client-side threat models, and best practices enforced across the AdaptEdu Next.js frontend application.

---

## 🎯 Role & Client Security Model

The Next.js frontend (`apps/web/`) runs in an untrusted client environment (the user's browser). While public school teachers interact with this interface to support neurodivergent students, malicious actors or compromised client environments can intercept, inspect, and modify any client-side operation.

As defined in root [AGENTS.md](AGENTS.md), client-side validation is strictly an enhancement for user experience and cognitive accessibility—**it is never a security boundary**.

---

## 🛡️ Critical Threat Vectors & Invariants

### 1. Client-Side Validation Fallacy

- **Do Not Trust Browser Constraints:**
  - HTML5 attributes (`required`, `maxlength`, `min`, `max`, `type="email"`, `pattern`) and client-side JavaScript form validators can be effortlessly bypassed using proxy tools (such as Burp Suite Repeater or curl).
  - Never design business logic or authorization assuming that client form restrictions were respected.

### 2. Cross-Site Scripting (XSS) Prevention

- **Default React Escaping:**
  - React automatically escapes values embedded in JSX (`{userInput}`). Always prefer standard JSX rendering over raw HTML injection.
- **Strictly Audit `dangerouslySetInnerHTML`:**
  - Avoid `dangerouslySetInnerHTML`. If pedagogical Markdown or formatted text must be rendered, sanitize the markup using an audited sanitizer (such as `DOMPurify` / `isomorphic-dompurify`) with a strict tag whitelist.
- **URI & Link Sanitization:**
  - When rendering dynamic links (`<a href={link}>`), validate that the URL protocol is strictly `http:`, `https:`, or `mailto:`. Never allow `javascript:` or `data:` URIs, which execute arbitrary code upon click.

### 3. Sensitive Data Exposure & HTTP History

- **No Secret Leakage in Client Bundles:**
  - Never place server secrets, API keys (e.g., OpenAI API keys), or JWT private keys in frontend source files or environment variables.
  - Only non-sensitive public configuration (e.g., public API URL) may use the `NEXT_PUBLIC_` prefix.
- **No Hidden-in-UI Data Leaks:**
  - Do not fetch full database entities containing sensitive fields (e.g., hashed credentials, internal tokens, administrative metadata) and then simply hide them visually with CSS (`display: none`) or conditional React rendering.
  - Anything delivered in an HTTP JSON response is visible in browser DevTools and proxy histories. Ensure backend endpoints only send the minimal data necessary for the view.

### 4. Parameter & Flow Tampering

- **No Hidden Privilege Fields:**
  - Never submit role or permission flags (`role: 'TEACHER'`, `isAdmin: false`) from hidden form inputs or client-side request bodies. The server must derive permissions exclusively from the verified session identity.
- **Multi-Step Flow Bypasses:**
  - Step wizards or progressive forms (e.g., multi-step behavioral screening) must not rely on client-side routing redirects alone to enforce completion of earlier steps. The backend must independently enforce state requirements.

### 5. Cookies, Tokens & Session Storage

- **Cookie Security:**
  - Prefer secure, `HttpOnly`, `SameSite=Lax` (or `Strict`), and `Secure` cookies for session tokens. Storing sensitive JWT tokens in `localStorage` or `sessionStorage` leaves them vulnerable to exfiltration via XSS.
- **Route Protection Middleware:**
  - Enforce private route interception using Next.js Edge Middleware (`middleware.ts`), redirecting unauthenticated sessions to `/login` before rendering protected pages.

### 6. Dependency Vulnerability Auditing

- **Automated Dependency Checks:**
  - Keep npm dependencies monitored for known CVEs using `npm audit`.
  - Auditing is integrated into the CI/CD pipeline via `.github/workflows/ci.yml`.

---

## 📚 References
- [10 JavaScript Security Vulnerabilities and How to Fix Them](https://medium.com/@zaid.zrf/10-javascript-security-vulnerabilities-and-how-to-fix-them-00cf976a95ff)
- [Snyk - JavaScript Security Best Practices](https://snyk.io/articles/javascript-security/)
- [OWASP Cross-Site Scripting (XSS) Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
