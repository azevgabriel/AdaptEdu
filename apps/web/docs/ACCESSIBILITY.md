# Cognitive, Chromatic & Universal Accessibility System — AdaptEdu Frontend

This document establishes the official accessibility framework, cognitive neurodiversity accommodations, semantic standards, and universal design principles for `apps/web/`.

Grounded in empirical research from:
- **UFSM Chromatic Accessibility Guide** (*Guia de Acessibilidade Cromática para Daltonismo: Princípios para Profissionais da Indústria Criativa*, Thiovane Pereira / Prof. Dr. Janderle Rabaiolli, UFSM, 2021),
- **W3C Web Content Accessibility Guidelines (WCAG 2.2 - Tradução Oficial PT-BR)**,
- **MDN Web Docs — WAI-ARIA Standards**,
- **Inclusive Components Design System** (Heydon Pickering),
- **Movimento Web para Todos (MWPT)** Best Practice Directives, and
- **The 7 Principles of Universal Design** (Ron Mace / Lei Brasileira de Inclusão - Lei Nº 13.146/2015).

This document serves as the single source of truth for semantic markup, interactive keyboard controls, screen reader announcements, and visual ergonomics across AdaptEdu.

---

## 🎯 Pedagogical Mission & The Three Visual States

In Brazilian public education environments, teachers manage classrooms with wide neurocognitive diversity: students diagnosed with or exhibiting traits of **Autism Spectrum Disorder (ASD / TEA)**, **Attention-Deficit/Hyperactivity Disorder (ADHD / TDAH)**, **Dyslexia**, **Dyscalculia**, **Tourette Syndrome**, and **Color Vision Deficiencies (CVD / Daltonismo)**.

Visual and semantic clarity in software is a critical cognitive accessibility accommodation. AdaptEdu formalizes the fundamental distinction between **Perceptual Simulation** and **Accessible Design**:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                           The Three Visual States Paradigm                                  │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Inadequate Mode (Modo Inadequado)                                                       │
│    Information relies exclusively on color, has micro-legends (< 14px), adjacent borderless │
│    colored areas, or low lightness contrast. Fails completely for users with disabilities.  │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. CVD Simulation Mode (Modo com Daltonismo)                                                │
│    An observational / diagnostic filter illustrating how someone with Protanopia,           │
│    Deuteranopia, Tritanopia, or Achromatopsia actually perceives the inadequate design.    │
│    *CVD simulation is an evaluation and diagnostic tool, NOT an end-user solution.*         │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. Accessible Mode (Modo com Acessibilidade)                                                │
│    A Universal Design implementation that eliminates the barrier for EVERYONE through       │
│    multimodal redundancy: explicit naming, distinct iconography, structural borders,        │
│    calibrated luminance, and clear typographic hierarchy.                                  │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Simulation vs. Accessibility:**
> Switching a user to a "Daltonism Mode" does not mean forcing them into an isolated, degraded view. AdaptEdu's **Accessible Mode** guarantees that the default interface works universally for all students and teachers. Dedicated CVD operational modes (`data-cvd`) provide calibrated chromatic remapping, while the **Educator Simulation Lens** equips teachers to inspect their pedagogical materials through their students' eyes prior to classroom delivery.

---

## 🏛️ The 4 Cardinal Pillars of Chromatic Accessibility (UFSM Framework)

AdaptEdu operationalizes the four core principles formulated in the UFSM Chromatic Accessibility Framework:

```
                            ┌────────────────────────┐
                            │    Universal Design    │
                            │      Architecture      │
                            └───────────┬────────────┘
         ┌──────────────────┬───────────┴───────────┬──────────────────┐
         ▼                  ▼                       ▼                  ▼
┌─────────────────┐┌─────────────────┐    ┌─────────────────┐┌─────────────────┐
│ 1. Expansion    ││ 2. Attention    │    │ 3. Innovation   ││ 4. Action       │
│ Possibilities   ││ Responsive      │    │ Open Systems of ││ Developer and   │
│ Beyond Color    ││ Lightness &     │    │ Color           ││ Educator        │
│ (Multimodal)    ││ Contrast        │    │ Identification  ││ Instrumentation │
└─────────────────┘└─────────────────┘    └─────────────────┘└─────────────────┘
```

### 1. Principle of Expansion (Princípio da Expansão)
*Expanding communication beyond color through multi-sensory and structural redundancies.*

- **Guideline 1: Alternative Resources (Never Color Alone):** Color must **never** be the sole conveyor of information, status, discipline, or hierarchy.
  - Links must maintain an underline (`text-decoration: underline; text-underline-offset: 3px;`) or bold weight alongside color.
  - **The Dyslexia / Italic Rule:** **Never use italics (`font-style: italic`) as an accessibility substitute or emphasis marker.** Slanted letterforms distort character silhouettes, trigger visual crowding, and create severe cognitive reading barriers for students with dyslexia. Use bold text, distinct borders, or underline decorations instead.
- **Guideline 2: Explicit Color Naming:** Every chromatic tag, notebook color-code, status swatch, or filter button must include clear textual naming:
  - Visible text labels on badges (e.g., displaying `"Matemática"` alongside the blue token).
  - Explicit tooltip and `aria-label` declarations (e.g., `aria-label="Disciplina: Matemática (Azul)"`).
  - Textual color indicators in configuration palettes so color-blind teachers can select swatches with complete autonomy.
- **Guideline 3: Symbols & Multimodal Iconography:** Every discipline and interface state must be paired with an invariant icon or geometric glyph:
  - **Disciplines:** Português (📖), Matemática (🧮), História (⏳), Geografia (🌍), Ciências (🧪), Artes (🎨), Educação Física (⚽).
  - **Statuses:** Success (Check Circle), Warning (Alert Triangle), Error (X Octagon), Information (Info Circle).
  - **Legend Typography Resilience:** Never set color legends or discipline markers in micro-text (`.text-xs` / 12px). Small angular font sizes diminish color surface area and accelerate CVD confusion. Legends must maintain at least `.text-label` (14px) or higher.
- **Guideline 4: Textures & Geometric Patterns:** In charts and data visualizations, distinguish segments using simple geometrical hatch patterns (diagonal lines, dots, solids) or distinct border outlines. Keep patterns minimal to avoid sensory overload for students with Autism Spectrum Disorder (ASD).
- **Guideline 5: Contours and Spatial Separation:** When two distinct colored areas are placed adjacent to each other (e.g., segmented progress rings, subject cards, classroom seating charts, or map regions), **always reserve a visible space (gap >= 4px) or a high-contrast boundary border (>= 1.5px to 2px)**. Without a contour or physical spacing, adjacent hues that share similar luminance visually merge into a single shape for individuals with dichromacy.

---

### 2. Principle of Attention (Princípio da Atenção)
*Deliberate commitment to responsive contrast, luminance hierarchy, and optical comfort.*

- **Guideline 6: Elimination of Forbidden Color Pairings:** Certain color combinations (Red+Green, Green+Orange, Blue+Purple, Green+Blue) create severe confusion barriers across red-green and blue-yellow deficiencies. The platform strictly forbids relying on color alone for these pairings; see [COLORS.md](apps/web/docs/COLORS.md) for the complete ophthalmological calibration matrix and token mappings.

- **Guideline 7: Luminance Calibration (The Rod Photoreceptor Rule):** Human vision under color blindness relies on **rod photoreceptors (bastonetes)**, which perceive variations in **lightness (luminance)** rather than wavelength (hue). Ensure that adjacent tokens have distinct **relative luminance values**, guaranteeing that even when colors convert entirely to gray, their visual contrast remains unmistakable.
- **Guideline 8: Monochromatic Lightness Stacking:** When using a single color hue to convey different tiers of data or urgency, limit the scale to **a maximum of 3 distinct lightness steps** (Low, Mid, High) with at least 25% Delta Lightness separation.
- **Guideline 9: WCAG AAA Contrast Ratios:**
  - **Normal Text (< 18pt or < 14pt bold):** Minimum contrast ratio of **4.5:1** (WCAG AA); target **7:1** (WCAG AAA) across all default interface tokens.
  - **Large Text (≥ 18pt or ≥ 14pt bold) & Core UI Boundaries:** Minimum contrast ratio of **3:1**.
  - **Photophobia Protection:** Eradicate pure white glare (`#FFFFFF`) behind pitch black (`#000000`). Use soft slate foundations (`#0F172A` text on `#F8FAFC` or `#F1F5F9`) to prevent Meares-Irlen visual stress.
- **Guideline 10: The Grayscale Stress Test:** Every UI component and pedagogical template must undergo a **Grayscale Inversion Audit**. If an educator or student cannot identify 100% of the hierarchy, status, and interactive controls in pure black and white, the design fails the accessibility standard.

---

### 3. Principle of Innovation (Princípio da Inovação)
*Open, scalable systems of visual identification tailored for Brazilian public education.*

While commercial proprietary systems such as ColorADD® pioneer symbol-based color alphabets, their proprietary licensing and trademark fees make them unsuitable for an open-source public platform. AdaptEdu implements an **Open Pedagogical Geometric Taxonomy**:

```
┌────────────────────────────────────────────────────────────────────────┐
│             AdaptEdu Open Geometric Identification System              │
├────────────────────────────────────────────────────────────────────────┤
│  [PT]   Português:       Solid Pill      +  📖 Open Book Icon         │
│  [MAT]  Matemática:      Square          +  🧮 Abacus Icon             │
│  [HIST] História:        Hexagon         +  ⏳ Hourglass Icon          │
│  [GEO]  Geografia:       Circle          +  🌍 Globe Icon              │
│  [CIE]  Ciências:        Diamond         +  🧪 Test Tube Icon          │
│  [ART]  Artes:           Star / Sparkle  +  🎨 Palette Icon            │
│  [EDF]  Educação Física: Rounded Square  +  ⚽ Soccer Ball Icon        │
│  [ING]  Língua Inglesa:  Triangle Up     +  🗣️ Speech Bubble Icon      │
└────────────────────────────────────────────────────────────────────────┘
```

This guarantees clear legibility on low-cost black-and-white classroom photocopies (*folhas xerocadas*), uncalibrated school projectors, and low-DPI computer monitors without licensing barriers.

---

### 4. Principle of Action (Princípio da Ação)
*Empowering educators and developers with simulation tools and participatory review.*

- **Guideline 16–17: Educator Simulation Lens:** AdaptEdu equips teachers with real-time SVG color simulation matrices directly inside their handout adaptation workspace (Deuteranopia, Protanopia, Tritanopia, and Achromatopsia).
- **Guideline 18–20: Participatory Design & Accessibility Testing:** Conduct continuous automated audits using axe-core and validate flows directly with Brazilian public school educators and neurodivergent individuals.

---

## 🌐 Semantic HTML5, Landmarks & Document Structure (MWPT Standards)

The [Movimento Web para Todos (MWPT)](https://mwpt.com.br/acessibilidade-digital/) emphasizes that proper HTML semantics form the foundation of assistive technology navigation.

### 1. Document Landmarks & Page Regions
Screen reader users navigate via structural landmarks. Every page in `apps/web/` must implement standard HTML5 landmarks:

```html
<body>
  <!-- Header Landmark -->
  <header role="banner" className={styles.header}>
    <nav role="navigation" aria-label="Navegação Principal">...</nav>
  </header>

  <!-- Main Content Landmark (Strictly one per page) -->
  <main id="main-content" role="main" className={styles.main}>
    ...
  </main>

  <!-- Contextual Aside Landmark -->
  <aside role="complementary" aria-label="Painel de Acessibilidade">
    ...
  </aside>

  <!-- Footer Landmark -->
  <footer role="contentinfo" className={styles.footer}>
    ...
  </footer>
</body>
```

- **Skip to Main Content Link:** Provide an accessible skip-link at the very top of `apps/web/src/app/layout.tsx`:
  ```tsx
  <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-slate-900 focus:shadow-lg focus:outline-2 focus:outline-indigo-700">
    Pular para o conteúdo principal
  </a>
  ```

### 2. Strict Heading Hierarchy (`<h1>` to `<h6>`)
- **Single `<h1>` Rule:** Each page must have exactly **one** `<h1>` representing the main subject (e.g., `<h1>Minha Sala de Aula</h1>`).
- **Sequential Nesting:** Never jump heading levels (e.g., jumping from `<h2>` to `<h4>` without an intermediary `<h3>`). Assistive technologies generate page outlines directly from headings.
- **Visual Styling Decoupled from Semantics:** If a section title needs to appear visually smaller, change its CSS class (e.g., `<h2 className="text-sm font-semibold">`), **never** misuse a lower-tier heading tag (`<h5>`) purely for size.

### 3. Page Language & Document Metadata
- **Root Language:** `apps/web/src/app/layout.tsx` must declare `<html lang="pt-BR">` to ensure speech synthesizers in NVDA, JAWS, TalkBack, and VoiceOver pronounce Portuguese text with correct phonetics.
- **Inline Language Annotations:** When foreign terms appear in lesson materials (e.g., English vocabulary cards), mark them with inline `lang`:
  ```html
  <p>A palavra <span lang="en">"classroom"</span> significa sala de aula.</p>
  ```
- **Document Title & Viewport:**
  - Dynamic, descriptive `<title>` per route: `Minha Sala | AdaptEdu`, `Configurações de Acessibilidade | AdaptEdu`.
  - Viewport must **never** disable pinch-to-zoom (`user-scalable=no` or `maximum-scale=1.0` is strictly forbidden).

### 4. Zero Deprecated HTML Elements
- Never use legacy presentation tags (`<center>`, `<font>`, `<big>`, `<strike>`, `<marquee>`).
- Use modern HTML5 semantic elements (`<dialog>`, `<details>`, `<summary>`, `<time>`, `<figure>`, `<figcaption>`).

---

## ♿ WAI-ARIA & The First Rule of ARIA (MDN Guidelines)

As defined in the [MDN Web Docs WAI-ARIA Guide](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA):

> [!CAUTION]
> **The First Rule of ARIA:**
> If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, instead of re-purposing an element and adding an ARIA role, state, or property, **always use the native element**.
> - Use `<button onClick={...}>` instead of `<div role="button" tabIndex={0}>`.
> - Use `<dialog>` or `<nav>` instead of generic `<div>` wrappers with ARIA roles.

### Key ARIA Attributes Used in AdaptEdu:
1. `aria-label`: Provides a localized text label for controls without visible text (e.g., icon-only buttons). Must be strictly in PT-BR (e.g., `aria-label="Abrir menu lateral"`).
2. `aria-labelledby`: Links a component to an existing visible heading element.
3. `aria-describedby`: Associates input fields with helper hints or validation error messages.
4. `aria-expanded`: Informs screen readers whether a collapsable panel, accordion, or menu is open (`"true"`) or closed (`"false"`).
5. `aria-controls`: Connects a trigger button to the `id` of the panel or menu it expands.
6. `aria-pressed`: Represents the toggle state of two-state action buttons (`"true" | "false"`).
7. `aria-current`: Indicates the currently active item in navigation lists (`aria-current="page"`).
8. `aria-live`: Dynamic status announcements for asynchronous updates:
   - `aria-live="polite"`: Standard announcements (e.g., "Plano de aula salvo com sucesso").
   - `aria-live="assertive"`: Critical warnings or network disconnections.
   - `aria-atomic="true"`: Ensures the screen reader announces the entire container content rather than just the mutated node.
9. `aria-hidden="true"`: Hides purely decorative visual icons (e.g., Lucide SVG icons) from the accessibility tree:
   ```tsx
   <button type="button" aria-label="Fechar painel lateral">
     <XIcon aria-hidden="true" className={styles.icon} />
   </button>
   ```

---

## 🧩 Inclusive Component Design Patterns (Heydon Pickering)

Following [Inclusive Components](https://inclusive-components.design/), AdaptEdu implements battle-tested patterns for common interactive UI controls:

### 1. Toggle Button Pattern (`aria-pressed`)
Used for state switches, accessibility toggles, and filter chips:

```tsx
interface ToggleButtonProps {
  label: string;
  isPressed: boolean;
  onToggle: (nextState: boolean) => void;
  icon?: React.ReactNode;
}

export function ToggleButton({ label, isPressed, onToggle, icon }: ToggleButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isPressed}
      onClick={() => onToggle(!isPressed)}
      className={`${styles.toggleButton} ${isPressed ? styles.pressed : ""}`}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
```

### 2. Accessible Switch Pattern (`role="switch"`)
Used for system preferences (dark mode, high contrast, dyslexia font):

```tsx
interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function AccessibleSwitch({ id, label, checked, onChange }: SwitchProps) {
  return (
    <div className={styles.switchWrapper}>
      <label htmlFor={id} className={styles.switchLabel}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${styles.switch} ${checked ? styles.checked : ""}`}
      >
        <span className={styles.slider} aria-hidden="true" />
      </button>
    </div>
  );
}
```

### 3. Menu Buttons vs. Navigation Lists
[Inclusive Components: Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/) dictates a sharp distinction:
- **Navigation Lists (`<nav>`):** Use regular unordered lists of links (`<ul>`, `<li>`, `<a>`). Users navigate using the `Tab` key.
- **Application Action Menus (`role="menu"`):** Popups that execute interactive actions (e.g., "Exportar PDF", "Duplicar Turma", "Excluir").
  - Trigger has `aria-haspopup="true"` and `aria-expanded="true | false"`.
  - **Keyboard Navigation Contract:**
    - `ArrowDown` / `ArrowUp`: Move focus between `role="menuitem"` elements without activating them.
    - `Home` / `End`: Jump to first / last menu item.
    - `Escape`: Closes the menu and **returns focus back to the trigger button**.
    - `Tab`: Immediately closes the menu and moves focus to the next interactive page element.

### 4. Tooltips vs. Toggletips
[Inclusive Components: Tooltips & Toggletips](https://inclusive-components.design/tooltips-toggletips/) resolves the classic tooltip dilemma:
- **Tooltip (`role="tooltip"`):** Provides an auxiliary text label for an existing interactive element that otherwise lacks text. Triggered on `:hover` and `:focus`. Linked via `aria-describedby`.
- **Toggletip (Help / Hint Button):** For pedagogical definitions or explanations (e.g., explaining a neurodivergence symptom). Must be an independent `<button type="button" aria-label="Mais informações sobre...">ⓘ</button>` that reveals a disclosure container on click/press, managing focus or using an `aria-live` region.

---

## 📝 Accessible Forms, Error Management & Validation (MWPT Standards)

According to the [MWPT Formulários Guide](https://mwpt.com.br/acessibilidade-digital/formularios/):

### 1. Explicit Label Association
- Every `<input>`, `<select>`, and `<textarea>` must have an explicit matching `<label for="inputId">`.
- **Never use `placeholder` as a replacement for `<label>`.** Placeholders disappear when the user types, causing severe working-memory strain for teachers with ADHD.

### 2. Grouping Related Controls (`<fieldset>` & `<legend>`)
- Checkbox groups (e.g., selecting student accommodations) and radio buttons must be grouped inside `<fieldset>` with a descriptive `<legend>`:
  ```html
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>Adaptações Pedagógicas Necessárias</legend>
    <label><input type="checkbox" name="acc" value="time" /> Tempo estendido</label>
    <label><input type="checkbox" name="acc" value="font" /> Fonte ampliada</label>
  </fieldset>
  ```

### 3. Accessible Error States & Validation
When validation fails:
1. Set `aria-invalid="true"` on the input.
2. Connect the error message via `aria-describedby="input-error-id"`.
3. Set `role="alert"` or `aria-live="polite"` on the error container.
4. Programmatically move focus to the first invalid field upon form submission.

```tsx
export function AccessibleInputField({ id, label, value, error, helperText, ...props }: InputProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...props}
      />
      {helperText && !error && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} role="alert" className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}
```

---

## 🔗 Links, Media & Alternative Descriptions (MWPT Standards)

### 1. Meaningful Link Texts (MWPT Links Guide)
- **Context-Independent Clarity:** Link text must be understandable on its own when read out of context by a screen reader.
- **Strictly Prohibited:** Links labeled `"Clique aqui"`, `"Saiba mais"`, `"Leia mais"`, or `"Mais informações"`.
- **Correct Pattern:** `"Acessar configurações de acessibilidade"`, `"Baixar plano de aula adaptado em PDF"`.
- **External Links:** Links that open in a new tab (`target="_blank"`) must:
  - Include `rel="noopener noreferrer"`.
  - Warn the user in the accessible label:
    ```html
    <a href="https://..." target="_blank" rel="noopener noreferrer">
      Diretrizes da BNCC
      <span className="sr-only">(abre em uma nova aba)</span>
      <ExternalLinkIcon aria-hidden="true" />
    </a>
    ```

### 2. Image Descriptions (`alt` Attributes) (MWPT Imagens Guide)
- **Informative Images:** `alt` text must convey the pedagogical meaning, not a literal camera description:
  - ❌ `alt="foto de menino"`
  - ✅ `alt="Estudante utilizando fichas de comunicação alternativa durante a aula de história"`
- **Decorative Images:** Use empty `alt=""` and `aria-hidden="true"` so assistive technologies silently skip them:
  ```html
  <img src="/illustrations/decor-pattern.svg" alt="" aria-hidden="true" />
  ```
- **Complex Diagrams & Charts:** Provide a brief `alt` summarizing the main trend, accompanied by a detailed data table or textual summary directly below the graphic.

---

## 🚀 WCAG 2.2 Criteria & Cognitive Accommodations

AdaptEdu adheres strictly to the official [W3C WCAG 2.2 Guidelines](https://www.w3.org/Translations/WCAG22-pt-BR/):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              Key WCAG 2.2 Implementations                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Minimum Target Size (Criterion 2.5.8 - Level AA)                                   │
│    Interactive touch targets must measure at least 24x24 CSS pixels. AdaptEdu enforces │
│    a default minimum of 44x44 CSS pixels for all primary actions and mobile targets.   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. Focus Appearance (Criterion 2.4.11 / 2.4.13 - Level AA/AAA)                         │
│    Visible focus rings must maintain at least 3:1 contrast against adjacent colors.    │
│    Enforced via: outline: 2px solid var(--color-brand-primary); outline-offset: 2px;  │
│    *Never set outline: none or outline: 0 without an accessible replacement.*          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. Accessible Authentication (Criterion 3.3.8 - Level AA)                             │
│    Cognitive function tests (solving math problems, memorizing tokens, or transcribing│
│    CAPTCHAs) are strictly banned for authentication. The platform supports Google     │
│    OAuth Single Sign-On and password manager auto-fill.                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. Redundant Entry (Criterion 3.3.7 - Level A)                                         │
│    Information previously entered in multi-step wizard flows (such as lesson planning │
│    or adapted evaluation generators) must auto-populate subsequent steps.              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. Dragging Movements (Criterion 2.5.7 - Level AA)                                     │
│    Any drag-and-drop feature (e.g. reordering student lists or planner cards) must     │
│    provide single-pointer keyboard alternatives ("Mover para cima", "Mover abaixo").   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎛️ Accessibility Toolbar & State Architecture

Accessibility settings are stored in `localStorage` under `adaptedu_accessibility_settings` and synchronized with the root `<html>` element via semantic data attributes:

```html
<html
  lang="pt-BR"
  data-theme="light"
  data-cvd="default"
  data-font-size="normal"
  data-dyslexia="false"
  data-high-contrast="false"
  data-reduced-motion="false"
>
```

### Global Configuration Matrix:
- `data-theme`: `"light"` | `"dark"`
- `data-cvd`: `"default"` | `"deuteranopia"` | `"protanopia"` | `"tritanopia"` | `"achromatopsia"`
- `data-font-size`: `"normal"` (100%) | `"large"` (112.5%) | `"x-large"` (125%)
- `data-dyslexia`: `"true"` | `"false"` (enforces OpenDyslexic / expanded letter-spacing & line-height)
- `data-high-contrast`: `"true"` | `"false"` (enforces 3px solid borders and high-contrast boundaries)
- `data-reduced-motion`: `"true"` | `"false"` (eliminates layout transitions and non-essential animations)

---

## ✅ Comprehensive Accessibility Review Checklist for Engineers & Agents

Before committing any component or approving a PR, verify every item:

- [ ] **First Rule of ARIA:** Are native HTML elements (`<button>`, `<dialog>`, `<nav>`, `<main>`) used instead of `div`s with ARIA roles?
- [ ] **Semantic Landmarks:** Is the page structured with `<header>`, `<nav>`, `<main>`, and `<footer>`? Is there a skip-to-content link?
- [ ] **Heading Order:** Does the page have exactly one `<h1>`? Are headings nested sequentially without skipping levels?
- [ ] **Never Color Alone:** Is every chromatic badge or status accompanied by an icon or visible text label?
- [ ] **No Italic Substitution:** Are pedagogical highlights free of `font-style: italic` to protect dyslexic readers?
- [ ] **Form Labels:** Does every form input have an explicit `<label for="...">`? Are errors linked with `aria-describedby` and `aria-invalid`?
- [ ] **Meaningful Links:** Are all links self-descriptive (no "clique aqui" or "saiba mais")? Do external links warn `(abre em nova aba)`?
- [ ] **Image Descriptions:** Do educational images have descriptive `alt` text in PT-BR? Are decorative icons marked with `aria-hidden="true"`?
- [ ] **Target Size (WCAG 2.2):** Are all buttons and interactive targets at least 44x44px (minimum 24x24px)?
- [ ] **Focus Rings:** Is the visible focus indicator prominent (`outline: 2px solid ...; outline-offset: 2px;`) during keyboard `Tab` navigation?
- [ ] **Contrast Verification:** Does text meet 4.5:1 (AA) and target 7:1 (AAA) across light, dark, and all CVD modes?
- [ ] **Grayscale Stress Test:** Does the interface remain 100% understandable when converted completely to grayscale?
- [ ] **Language Integrity:** Is the root declared as `<html lang="pt-BR">`? Are foreign vocabulary terms tagged with inline `lang`?

---

## 🔗 Related Documentation & External References

### AdaptEdu Internal Architecture:
- [apps/web/docs/GLOBAL.md](apps/web/docs/GLOBAL.md): Frontend Architecture Index.
- [apps/web/docs/COLORS.md](apps/web/docs/COLORS.md): Interface & Pedagogical Color System & Tokens.
- [apps/web/docs/FONTS.md](apps/web/docs/FONTS.md): Typography & Cognitive Reading System.
- [apps/web/docs/DESIGN_SYSTEM.md](apps/web/docs/DESIGN_SYSTEM.md): Component Specifications & Anatomy.

### Authoritative External Standards:
- [MDN Web Docs — WAI-ARIA Overview](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA)
- [W3C WCAG 2.2 — Tradução Oficial em Português (pt-BR)](https://www.w3.org/Translations/WCAG22-pt-BR/)
- [Inclusive Components (Heydon Pickering)](https://inclusive-components.design/)
  - [A Todo List (Interactive Checklists)](https://inclusive-components.design/a-todo-list/)
  - [Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/)
  - [Toggle Buttons](https://inclusive-components.design/toggle-button/)
  - [Tooltips & Toggletips](https://inclusive-components.design/tooltips-toggletips/)
- [Movimento Web para Todos (MWPT)](https://mwpt.com.br/acessibilidade-digital/)
  - [Descrição de Imagens](https://mwpt.com.br/acessibilidade-digital/descricao-imagens/)
  - [Cabeçalhos Semânticos](https://mwpt.com.br/acessibilidade-digital/cabecalhos/)
  - [Links Acessíveis](https://mwpt.com.br/acessibilidade-digital/links/)
  - [Formulários Acessíveis](https://mwpt.com.br/acessibilidade-digital/formularios/)
  - [Metadados e Viewport](https://mwpt.com.br/acessibilidade-digital/metadados/)
  - [Idioma Principal da Página](https://mwpt.com.br/acessibilidade-digital/idioma-principal-usado-na-pagina/)
  - [Padrões HTML e Elementos Descontinuados](https://mwpt.com.br/acessibilidade-digital/padroes-html/)
