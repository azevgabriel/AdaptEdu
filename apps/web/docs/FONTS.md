# Typography & Font System — AdaptEdu Frontend

This document establishes the official typography specifications, cognitive accessibility foundations, font token configurations, and usage guidelines for `apps/web/`. It serves as the single source of truth for font pairings, typographic hierarchy, and neurodiversity-friendly reading accommodations.

---

## 🎯 Pedagogical Mission & Cognitive Foundations

AdaptEdu serves educators and neurodivergent students (including autism spectrum disorder, ADHD, dyslexia, dyscalculia, and visual processing differences) in Brazilian public schools. In educational and administrative workflows, typography directly affects reading comprehension, cognitive fatigue, visual comfort, and focus.

The typography strategy is built around a deliberate dual-font architecture:

1. **Primary Typeface (Headings & Structural Titles): Nunito**
2. **Secondary Typeface (Body, UI Controls, Data & Prose): Inter**

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AdaptEdu Typographic Pair                       │
├────────────────────────────────────────────────────────────────────────┤
│  Nunito (Primary / Headings)                                           │
│  "Minha Sala de Aula"  •  "Plano de Aula Adaptado"                     │
│  Rounded terminals • Low cognitive friction • Friendly & Calming       │
├────────────────────────────────────────────────────────────────────────┤
│  Inter (Secondary / Body & Controls)                                   │
│  "Acompanhe o desenvolvimento individual e as adaptações da turma."    │
│  Tall x-height • Open counters • Disambiguated glyphs (I / l / 1 / 0)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Cognitive & Neurodiversity Rationale

### 1. Primary Typeface: Nunito (Headings & Titles)

- **Typeface Classification:** Well-balanced rounded sans-serif typeface designed by Vernon Adams and Jacques Le Bailly.
- **Role:** Section titles, page headings, modal titles, card headers, and brand identity (`AdaptEdu`).
- **Pedagogical & Cognitive Benefits:**
  - **Soft Rounded Terminals:** Sharp, mechanical serif or grotesque headings can feel intimidating or rigid. Nunito's gentle rounded caps produce a welcoming, calming emotional response, reducing anxiety for both students and overworked educators.
  - **Sensory De-escalation:** For autistic individuals and students sensitive to harsh sensory stimuli, soft letterforms reduce visual stress.
  - **Distinct Word Shapes:** Headings set in Nunito provide clear macro-shapes (bouma), allowing quick spatial orientation and visual anchoring when scanning a busy dashboard.

### 2. Secondary Typeface: Inter (Body, UI Controls & Prose)

- **Typeface Classification:** Highly crafted variable neo-grotesque sans-serif designed by Rasmus Andersson specifically for computer screens.
- **Role:** Long-form pedagogical texts, student records, buttons, dropdown items, form inputs, tooltips, tables, and numeric data.
- **Pedagogical & Cognitive Benefits:**
  - **Dyslexia & Crowding Accommodation:** Dyslexic readers often experience "visual crowding" (adjacent letters visually collapsing into each other). Inter features generous apertures, open counters (`c`, `e`, `s`), and wide letter spacing, preserving individual glyph recognition.
  - **Tall x-Height:** A high x-height relative to cap-height makes lowercase letters exceptionally distinct and legible even at small sizes (13px–16px).
  - **Glyph Disambiguation:** Inter provides disambiguation for commonly confused characters that cause major hurdles for readers with dyslexia or dyscalculia:
    - Capital `I` (with serifs via stylistic alternates/cv11) vs. lowercase `l` vs. digit `1`.
    - Digit `0` (slashed or dotted) vs. capital `O`.
  - **Public School Hardware Resilience:** Brazilian public schools frequently operate low-cost monitors (1366x768 resolution or uncalibrated projectors). Inter was specifically engineered with pixel-grid hinting to maintain crisp legibility on low-DPI screens without blurring.

---

## ⚙️ Technical Configuration (Next.js & CSS Variables)

Fonts are loaded and optimized using Next.js font optimization (`next/font/google`) in [src/app/layout.tsx](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/src/app/layout.tsx). This guarantees:
- **Zero Layout Shift (CLS):** Next.js pre-calculates font metrics and generates fallback sizes.
- **Self-Hosted Privacy:** Font binaries are downloaded at build time and served locally from the same domain; no third-party requests are sent to Google servers at runtime (complying with LGPD).
- **Display Swap:** `display: "swap"` ensures text remains visible during font loading.

### Next.js Font Injection (`layout.tsx`)

```tsx
import { Nunito, Inter } from "next/font/google";

export const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
```

### Global CSS Design Tokens (`globals.css`)

The injected font variables are mapped to global typography tokens in [src/app/globals.css](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/src/app/globals.css):

```css
:root {
  /* ==========================================================================
     AdaptEdu Typography Foundations
     ========================================================================== */
  --font-family-headings: var(--font-nunito), "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-body: var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  font-family: var(--font-family-body);
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-headings);
  font-weight: 700;
  line-height: 1.25;
}

.font-heading {
  font-family: var(--font-family-headings);
}

.font-body {
  font-family: var(--font-family-body);
}
```

---

## 📏 Typographic Scale & Hierarchy

| Element | Tag / Class | Font Family | Weight | Size (rem / px) | Line Height | Tracking | Purpose / Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Title** | `.text-display` | Nunito | 800 (ExtraBold) | `2.25rem` (36px) | `1.2` | `-0.02em` | Landing heroes, primary module greeting |
| **Heading 1** | `h1` | Nunito | 700 (Bold) | `1.75rem` (28px) | `1.25` | `-0.015em` | Page main titles (e.g. "Minha Sala") |
| **Heading 2** | `h2` | Nunito | 700 (Bold) | `1.5rem` (24px) | `1.3` | `-0.01em` | Section headers, major card groups |
| **Heading 3** | `h3` | Nunito | 600 (SemiBold) | `1.25rem` (20px) | `1.35` | `0` | Subsections, student profile section titles |
| **Heading 4** | `h4` | Nunito | 600 (SemiBold) | `1.125rem` (18px) | `1.4` | `0` | Component headers, card titles |
| **Body Large** | `.text-lg` | Inter | 400 / 500 | `1.125rem` (18px) | `1.6` | `0` | Introductory paragraphs, summary callouts |
| **Body Regular** | `body`, `p` | Inter | 400 (Regular) | `1rem` (16px) | `1.5` | `0` | Standard paragraph text, descriptions |
| **Body Medium** | `.text-medium` | Inter | 500 (Medium) | `1rem` (16px) | `1.5` | `0` | Emphasized text, label descriptions |
| **Interface Label** | `.text-label` | Inter | 600 (SemiBold) | `0.875rem` (14px) | `1.4` | `0.01em` | Form labels, navigation links, table headers |
| **Button Text** | `button` | Inter | 600 (SemiBold) | `0.875rem` (14px) | `1.2` | `0.01em` | Action buttons, tabs, interactive pills |
| **Caption / Small** | `.text-sm` | Inter | 400 / 500 | `0.8125rem` (13px) | `1.4` | `0.015em` | Meta information, timestamps, tags, footnotes |
| **Micro Text** | `.text-xs` | Inter | 500 (Medium) | `0.75rem` (12px) | `1.3` | `0.02em` | Badges, status indicators, avatar initials |

---

## ♿ Accessibility (WCAG 2.1 AA/AAA) & Neurodiversity Rules

When styling text across AdaptEdu components, developers and coding agents **MUST** strictly adhere to the following rules:

### 1. Line Height & Paragraph Spacing (WCAG 1.4.12)
- Body text **must** have a minimum `line-height` of `1.5` (150%).
- Headings **must** have a `line-height` of at least `1.2` to `1.35` to avoid clipping descenders and ascenders.
- Spacing between paragraphs **must** be at least `1.5` times larger than the line-height (e.g., `margin-bottom: 1.25rem`).

### 2. Line Length (Cognitive Fatigue & Dyslexia)
- Long text blocks (such as adapted lesson plans, pedagogical notes, and reports) must never exceed **75 characters per line** (ideal range: 50–70 characters, or `max-width: 65ch`).
- Lines longer than 80 characters force excessive saccadic eye movements, causing readers with ADHD or dyslexia to lose their place.

### 3. Text Alignment: Left-Aligned Only
- **Never use full justification (`text-align: justify`).**
- Justified text creates irregular word spacing and visual "rivers of white" that disorient dyslexic readers. Always use left alignment (`text-align: left`).

### 4. Capitalization & Letter Case
- **Avoid blocks of ALL CAPS (`uppercase`) for continuous sentences.**
- ALL CAPS strips words of their unique silhouette heights (ascenders and descenders), severely slowing reading speed and harming word shape recognition for dyslexic readers.
- Reserve uppercase exclusively for short acronyms (e.g. `PEI`, `TEA`, `TDAH`, `BNCC`) or very small category badges (maximum 1–2 words).

### 5. High Contrast Standard (WCAG 1.4.3 & 1.4.6)
- Text must always satisfy the contrast guidelines established in [COLORS.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/docs/COLORS.md):
  - Normal text: minimum **4.5:1** contrast against direct background.
  - Large text (≥ 18pt or ≥ 14pt bold): minimum **3:1** contrast.

---

## 💻 Code Examples & Usage Patterns

### A. CSS Modules

```css
/* Example: ComponentTitle.module.css */
.sectionHeader {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-family: var(--font-family-headings);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.description {
  font-family: var(--font-family-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
  max-width: 65ch;
}
```

### B. Inline / Utility Classes

```tsx
// Using global helper classes
export function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="font-heading">{title}</h1>
      <p className="font-body">{subtitle}</p>
    </div>
  );
}
```

---

## 🔗 Related Documentation

- [GLOBAL.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/docs/GLOBAL.md): Frontend Architecture Index.
- [COLORS.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/docs/COLORS.md): Interface & Pedagogical Color System.
- [NEXTJS.md](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/docs/NEXTJS.md): Next.js App Router & Agent Architecture.

