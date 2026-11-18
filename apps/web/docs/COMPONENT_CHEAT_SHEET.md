# Component Construction Cheat Sheet

Concise, non-negotiable frontend rules for rapid agent onboarding and UI construction (< 100 lines).

---

### 🎨 1. Design Tokens & Colors ([COLORS.md](apps/web/docs/COLORS.md))
- **Token Purity:** Always use official CSS variables (`--bg-*`, `--border-*`, `--text-*`, `--color-brand-*`, `--subject-*`). Never hardcode raw hex, RGB, or HSL values.
- **Contrast Ratios:** Normal text $\ge 4.5:1$ (target $\ge 7:1$ AAA); UI borders and large text $\ge 3:1$.
- **Photophobia Shield:** Pure white (`#ffffff`) surfaces are banned; use soft slate/zinc (`#f8fafc` / `#121212`).
- **"Never Color Alone":** Color must never be the sole conveyor of information; always pair with an icon and visible text.
- **CVD Modes:** Support all 4 CVD modes (`data-cvd="deuteranopia|protanopia|tritanopia|achromatopsia"`).

---

### 🔤 2. Typography & Reading Ergonomics ([FONTS.md](apps/web/docs/FONTS.md))
- **Dual-Font Architecture:** Headings in **Nunito** (`--font-family-headings`); UI controls and body in **Inter** (`--font-family-body`).
- **Dyslexia Invariant (NO Italics):** Never use `font-style: italic` for emphasis or accessibility hints. Use bold (`600/700`), badges, or borders instead.
- **Cognitive Ergonomics:** Line length $\le 65\text{ch}$, line-height $\ge 1.5$, strictly left-aligned (never justified).
- **No All-Caps Blocks:** Limit uppercase strictly to short acronyms (`BNCC`, `PEI`, `TDAH`, `TEA`).

---

### ♿ 3. Semantics & Universal Accessibility ([ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md))
- **First Rule of ARIA:** Use native HTML5 elements (`<button>`, `<nav>`, `<dialog>`). Never `<div onClick>`.
- **Touch Target:** Minimum $44\times44\text{px}$ clickable area for all interactive controls (buttons, switches, radios).
- **Tactile Focus Ring:** `outline: 2px solid var(--color-brand-primary); outline-offset: 2px;` on `:focus-visible`.
- **Form Association:** Every input must have an explicit `<label htmlFor="...">` and error via `aria-describedby`.
- **High Contrast Support:** Enforce `@media (forced-colors: active)` using system keywords (`ButtonBorder`, `Highlight`).
- **Reduced Motion:** Honor `prefers-reduced-motion: reduce` and `[data-reduced-motion="true"]` with `transition: none`.

---

### ✍️ 4. UX Writing & Non-Diagnostic Rule ([DESIGN_GUIDELINES.md](apps/web/docs/DESIGN_GUIDELINES.md))
- **Language:** User-facing strings must be strictly in Brazilian Portuguese (PT-BR). Source code in English.
- **Hypothesis-Only:** The platform must **NEVER** state a clinical diagnosis. Always frame insights as pedagogical hypotheses.

---

### 📚 Deep Architecture References
- Design Guidelines & Anti-Slop: [DESIGN_GUIDELINES.md](apps/web/docs/DESIGN_GUIDELINES.md)
- Component Catalog: [DESIGN_SYSTEM.md](apps/web/docs/DESIGN_SYSTEM.md)
- Testing & Vitest RTL: [TESTING.md](apps/web/docs/TESTING.md)
- Playwright CLI Verification: [PLAYWRIGHT_CLI.md](apps/web/docs/PLAYWRIGHT_CLI.md)
- Audit & Test Generator Skill: [skills/component-a11y-audit](apps/web/docs/skills/component-a11y-audit/SKILL.md)
