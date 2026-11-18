---
name: component-a11y-audit
description: Protocol for auditing React UI components against Colors & CVD, Typography & Dyslexia, and Universal Accessibility standards, generating automated Vitest/RTL unit tests.
---

# UI Component Accessibility & Design Systems Audit Guide (`component-a11y-audit`)

This document establishes the official **Component Review and Test Generation Protocol** for AI coding agents and developers working on the AdaptEdu web application (`apps/web/`).

It unites the triad of core frontend specifications:
1. **[apps/web/docs/COLORS.md](apps/web/docs/COLORS.md):** Design tokens, WCAG contrast standards, and Color Vision Deficiency (CVD / Daltonismo) modes.
2. **[apps/web/docs/FONTS.md](apps/web/docs/FONTS.md):** Typographic hierarchy, dual-font architecture (Nunito/Inter), line length, and dyslexia reading accommodations.
3. **[apps/web/docs/ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md):** Universal Design, WAI-ARIA First Rule, Inclusive Components, and WCAG 2.2 criteria.
4. **[apps/web/docs/TESTING.md](apps/web/docs/TESTING.md):** Co-located unit test standards (`index.spec.tsx`) using Vitest, React Testing Library, and synthetic `@faker-js/faker` data.

---

## 🎯 Purpose & Agent Execution Trigger

Activate this skill when:
- Creating a new React UI component in `src/components/` (global) or `src/app/**/components/` (page-specific).
- Reviewing, refactoring, or optimizing an existing component prior to the user sign-off gate.
- Generating or augmenting co-located unit tests (`index.spec.tsx`) to guarantee regression-proof accessibility.

The agent's mission is twofold:
1. **Audit:** Methodically inspect the component against the **3 Core Pillars** (Colors, Fonts, Accessibility).
2. **Generate Tests:** Synthesize a comprehensive suite of Vitest + React Testing Library unit tests that verify semantics, ARIA states, keyboard interactions, and neurodiversity invariants.

---

## 🔍 The 3 Pillars Review Protocol

```
                        ┌────────────────────────────────────────┐
                        │   Component Analysis: 3 Core Pillars   │
                        └───────────────────┬────────────────────┘
          ┌─────────────────────────────────┼─────────────────────────────────┐
          ▼                                 ▼                                 ▼
┌──────────────────┐              ┌──────────────────┐              ┌──────────────────┐
│ Pillar 1: COLORS │              │ Pillar 2: FONTS  │              │ Pillar 3: A11Y   │
│ Tokens, Contrast │              │ Nunito / Inter,  │              │ WAI-ARIA First   │
│ CVD Modes, Never │              │ Line Ergonomics, │              │ Rule, Semantics, │
│ Color Alone      │              │ No Italics Rule  │              │ Target Size, Form│
└──────────────────┘              └──────────────────┘              └──────────────────┘
```

---

### Pillar 1: Colors & Chromatic Accessibility ([COLORS.md](apps/web/docs/COLORS.md))

- [ ] **Design Token Purity:** Are all colors declared using official CSS variables (`--bg-*`, `--border-*`, `--text-*`, `--color-brand-*`, `--subject-*`, `--hierarchy-*`)?
  - ❌ **Reject:** Raw hexadecimal (`#4338ca`, `#ffffff`), RGB, or HSL strings in CSS modules or inline styles.
  - ✅ **Require:** `color: var(--text-primary);`, `background: var(--bg-surface);`.
- [ ] **WCAG Contrast Ratios:**
  - Normal text (< 18pt or < 14pt bold): minimum **4.5:1** (target **7:1** AAA).
  - Large text (≥ 18pt or ≥ 14pt bold) and active UI boundaries: minimum **3:1**.
  - Photophobia shield: pure `#FFFFFF` background behind `#000000` text is banned; verify soft slate foundation (`#0F172A` on `#F8FAFC`).
- [ ] **The "Never Color Alone" Invariant:**
  - Color must **never** be the sole conveyor of information, status, discipline, or urgency.
  - Every chromatic badge or status dot must be paired with visible text and/or an explicit icon.
- [ ] **Forbidden CVD Pairings & Remapping:**
  - Are red-green, green-orange (*História x Geografia*), or blue-purple (*Matemática x Ciências*) pairings used?
  - If used, verify persistent geometric icons (⏳ vs. 🌍, 🧮 vs. 🧪) so users with undiagnosed CVD can distinguish them immediately.
  - Ensure the component responds cleanly when `[data-cvd="..."]` attributes are applied to the root element.
- [ ] **Contours & Spatial Boundaries:**
  - Adjacent colored elements (e.g. chart segments, badge chips, progress rings) must maintain a physical gap (>= 4px) or a distinct border outline (>= 1.5px).

---

### Pillar 2: Typography & Cognitive Ergonomics ([FONTS.md](apps/web/docs/FONTS.md))

- [ ] **Dual-Font Pairing:**
  - Headings and structural titles: Nunito (`--font-family-headings`).
  - Body copy, labels, data tables, and interactive controls: Inter (`--font-family-body`).
- [ ] **Cognitive Reading Ergonomics:**
  - Line length: long-form pedagogical texts must not exceed **65 characters per line** (`max-width: 65ch`).
  - Line height: body text must maintain at least `1.5` (`line-height: 1.5`); headings between `1.2` and `1.35`.
  - Alignment: strictly left-aligned (`text-align: left`). Full justification (`text-align: justify`) is strictly banned (prevents "rivers of white" for dyslexic readers).
- [ ] **Dyslexia Invariant (Strictly No Italics):**
  - **Never use italics (`font-style: italic`) as an emphasis or accessibility substitution marker.**
  - Slanted letterforms distort character silhouettes and worsen visual crowding for dyslexic readers. Use bold (`font-weight: 600/700`), underline, or borders instead.
- [ ] **Legend & Badge Size Resilience:**
  - Critical color legends, status badges, and discipline chips must **never** rely on bare micro-text (`.text-xs` / 12px) without an accompanying icon.
  - Textual labels for chromatic tokens must maintain at least `.text-label` (14px).
- [ ] **Capitalization:**
  - Avoid blocks of continuous ALL CAPS. Limit uppercase strictly to short acronyms (`PEI`, `TEA`, `TDAH`, `BNCC`).

---

### Pillar 3: Universal Accessibility, Semantics & WAI-ARIA ([ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md))

- [ ] **The First Rule of ARIA:**
  - Are native HTML5 elements used (`<button>`, `<dialog>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`) instead of `<div>` or `<span>` with click handlers?
  - Reject `<div role="button" onClick={...}>`; enforce `<button type="button" onClick={...}>`.
- [ ] **Inclusive Component Patterns (Heydon Pickering):**
  - **Toggle Buttons:** Uses native `<button>` with `aria-pressed="true | false"`.
  - **Switches:** Uses `role="switch"` with `aria-checked="true | false"`.
  - **Action Menus:** Uses `role="menu"` and `role="menuitem"`. Handles `ArrowUp`/`ArrowDown`, `Home`/`End`, and `Escape` (closing the menu and **returning focus to the trigger button**).
  - **Tooltips vs. Toggletips:** Tooltips use `role="tooltip"` linked via `aria-describedby`; contextual pedagogical hints use interactive toggletips with `aria-live`.
- [ ] **Accessible Forms & Error Association:**
  - Inputs must have explicit `<label htmlFor="id">` (never placeholder-as-label).
  - Checkbox/radio groups must use `<fieldset>` and `<legend>`.
  - Errors must link via `aria-describedby="[id]-error"` and flag `aria-invalid="true"`.
- [ ] **Touch Target Size (WCAG 2.2 Criterion 2.5.8):**
  - Interactive targets must measure at least **44x44 CSS pixels** for primary mobile actions (absolute minimum 24x24px).
- [ ] **Visible Focus Rings (WCAG 2.2 Criterion 2.4.11 / 2.4.13):**
  - Visible focus indicator with $\ge 3:1$ contrast: `outline: 2px solid var(--color-brand-primary); outline-offset: 2px;`.
  - Never suppress focus outlines (`outline: none` or `outline: 0`) without an accessible active focus ring.
- [ ] **Links & Images:**
  - Links must have context-independent text (no "clique aqui" or "saiba mais").
  - External links (`target="_blank"`) must include `rel="noopener noreferrer"` and an audible warning `(abre em nova aba)`.
  - Informative images must have concise PT-BR `alt` text; decorative icons must use `aria-hidden="true"`.

---

## 🧪 Automated Unit Test Generation Recipes (`index.spec.tsx`)

Every component audited using this skill must be paired with or updated with co-located Vitest + React Testing Library tests (`index.spec.tsx`). The test suite must cover:

### 1. Test Recipe: Semantic Elements & Accessible Name

Verifies that the component renders native HTML elements and announces its accessible name properly to screen readers:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MyComponent } from "./index";

describe("MyComponent — Semantics & Accessible Name", () => {
  it("renders with a native HTML semantic button and an accessible label in PT-BR", () => {
    render(<MyComponent label="Salvar alterações" onClick={vi.fn()} />);

    const button = screen.getByRole("button", { name: /salvar alterações/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });
});
```

---

### 2. Test Recipe: "Never Color Alone" Invariant

Verifies that chromatic elements are accompanied by textual labels and distinct icons in the DOM:

```tsx
describe("MyComponent — 'Never Color Alone' Invariant", () => {
  it("renders both a textual label and an icon when displaying subject or status colors", () => {
    render(<MyComponent subject="math" label="Matemática" />);

    // 1. Textual confirmation for screen readers & low vision
    expect(screen.getByText("Matemática")).toBeInTheDocument();

    // 2. Iconographic confirmation (non-color redundancy)
    const icon = screen.getByTestId("subject-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
```

---

### 3. Test Recipe: ARIA States & Dynamic Toggles (`aria-pressed`, `aria-expanded`, `aria-checked`)

Verifies that state changes update ARIA attributes dynamically for assistive technology:

```tsx
describe("MyComponent — ARIA States & Dynamic Interaction", () => {
  it("toggles aria-pressed attribute when clicked", async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    const { rerender } = render(
      <MyComponent isPressed={false} onToggle={handleToggle} label="Modo Foco" />
    );

    const button = screen.getByRole("button", { name: /modo foco/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(handleToggle).toHaveBeenCalledTimes(1);

    // Re-render with new state to verify accessibility tree update
    rerender(<MyComponent isPressed={true} onToggle={handleToggle} label="Modo Foco" />);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
```

---

### 4. Test Recipe: Keyboard Navigation & Focus Return

Verifies full keyboard operability (`Tab`, `Enter`, `Space`, `Escape`) and ensures focus returns to trigger buttons when dialogs or menus close:

```tsx
describe("MyComponent — Keyboard Navigation & Focus Management", () => {
  it("allows keyboard activation via Enter and Space keys", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<MyComponent onClick={handleClick} label="Abrir Turma" />);

    const button = screen.getByRole("button", { name: /abrir turma/i });
    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("closes on Escape key press and returns focus to the trigger button", async () => {
    const user = userEvent.setup();
    render(<MyMenuComponent triggerLabel="Opções da Turma" />);

    const trigger = screen.getByRole("button", { name: /opções da turma/i });
    await user.click(trigger);

    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

---

### 5. Test Recipe: Accessible Form Error Association (`aria-describedby` & `aria-invalid`)

Verifies that form validation errors are programmatically bound to input fields:

```tsx
describe("MyInputField — Form Error & Description Association", () => {
  it("associates error message via aria-describedby and sets aria-invalid when invalid", () => {
    render(
      <MyInputField
        id="student-name"
        label="Nome do Estudante"
        value=""
        error="O nome do estudante é obrigatório."
      />
    );

    const input = screen.getByLabelText(/nome do estudante/i);
    expect(input).toHaveAttribute("aria-invalid", "true");

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("O nome do estudante é obrigatório.");
    expect(input).toHaveAttribute("aria-describedby", errorMessage.id);
  });
});
```

---

### 6. Test Recipe: Dyslexia & Style Invariants (No Italics for Emphasis)

Verifies that rendered elements do not apply italic styling for emphasis:

```tsx
describe("MyComponent — Dyslexia & Sensory Invariants", () => {
  it("does not render pedagogical highlights with font-style italic", () => {
    const { container } = render(<MyComponent highlightType="key-concept" text="Atenção" />);

    const highlight = container.querySelector('[class*="highlight"]');
    expect(highlight).toBeInTheDocument();

    const computedStyle = window.getComputedStyle(highlight!);
    expect(computedStyle.fontStyle).not.toBe("italic");
  });
});
```

---

## 📋 Audit Report Output Template

When an agent executes this skill to review a component, it must deliver a structured report in the following format:

````markdown
### ♿ Component Accessibility & Design Review: `<ComponentName>`

- **Target Component:** `src/components/<component-name>/index.tsx`
- **Co-located Test File:** `src/components/<component-name>/index.spec.tsx`
- **Audit Verdict:** [PASSED / ACTION_REQUIRED / WARNING]

#### 🔍 3 Pillars Evaluation

| Pillar | Verification Focus | Status | Observations |
| :--- | :--- | :--- | :--- |
| **Pillar 1: Colors** | Token usage, WCAG AAA contrast, Never Color Alone, CVD modes | PASSED / FAILED | [Details] |
| **Pillar 2: Fonts** | Nunito/Inter pairing, 65ch line length, line height 1.5, No Italics | PASSED / FAILED | [Details] |
| **Pillar 3: A11y** | First Rule of ARIA, keyboard navigation, focus ring, forms, target size | PASSED / FAILED | [Details] |

#### 🛠️ Code Fixes Required
*(Specify exact lines, problems found, and the remediated code)*

#### 🧪 Generated Unit Test Cases (`index.spec.tsx`)
*(Provide the complete, runnable Vitest test suite ready to be placed in the component folder)*
````

---

## 🔗 Related Documentation

- [apps/web/docs/GLOBAL.md](apps/web/docs/GLOBAL.md): Frontend Architecture Index & Pre-Construction Gate.
- [apps/web/docs/COLORS.md](apps/web/docs/COLORS.md): Interface & Pedagogical Color System & Tokens.
- [apps/web/docs/FONTS.md](apps/web/docs/FONTS.md): Typography & Cognitive Reading System.
- [apps/web/docs/ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md): Universal Design, ARIA & Inclusive Components.
- [apps/web/docs/TESTING.md](apps/web/docs/TESTING.md): Vitest, React Testing Library & Synthetic Data Guide.
