# Interface & Pedagogical Color System — AdaptEdu Frontend

This document establishes the official color specifications, accessibility guidelines, pedagogical **Color Code** system, and specialized **Color Vision Deficiency (CVD / Daltonismo)** modes for `apps/web/`. It serves as the single source of truth for design tokens, CSS variables, and component implementation.

---

## 🎯 Purpose and Pedagogical Mission

AdaptEdu supports Brazilian public school educators who face time constraints and overcrowded classrooms. A significant portion of students are neurodivergent—including individuals diagnosed with or presenting traits of **Autism Spectrum Disorder (ASD / TEA)**, **Attention-Deficit/Hyperactivity Disorder (ADHD / TDAH)**, **Dyslexia**, **Dyscalculia**, **Tourette Syndrome**, and **Color Vision Deficiencies (CVD / Daltonismo)**.

In classroom environments, visual clarity is not merely an aesthetic choice; it is a critical cognitive accessibility accommodation. The color system in AdaptEdu addresses two distinct layers:

1. **System & Interface Layer:** Clean, calm, high-contrast UI tokens designed to minimize cognitive fatigue for educators navigating schedules, lesson plans, and student profiles across varying hardware (mobile phones, low-cost desktop monitors, and classroom projectors).
2. **Pedagogical Color Code Layer:** An educational organization methodology based on established cognitive science that utilizes fixed color associations to:
   - Accelerate visual retrieval (*atalho mental*) for students with executive dysfunction or working memory difficulties.
   - Separate essential concepts from secondary information (*foco e prioridade*) for students with ADHD.
   - Establish consistent chromatic routines across notebooks, folders, and study materials (*organização visual*).

---

## ♿ Accessibility & Neurodiversity Principles

All color usages across AdaptEdu must strictly respect the following accessibility criteria:

### 1. WCAG 2.1 Contrast Standards
- **Normal Text (< 18pt or < 14pt bold):** Minimum contrast ratio of **4.5:1** against its direct background (WCAG AA). Strive for **7:1** (WCAG AAA) where feasible.
- **Large Text (≥ 18pt or ≥ 14pt bold) & Graphical Elements:** Minimum contrast ratio of **3:1** against adjacent colors.
- **Form Controls & Interactive States:** Focused inputs, active buttons, and selection indicators must maintain at least **3:1** contrast against their resting backgrounds.

### 2. The "Never Color Alone" Rule
Color must **never** be the sole indicator of meaning, state, subject, or urgency. Every chromatic element must be coupled with at least one secondary visual attribute:
- Textual label (e.g., displaying the subject name alongside the colored badge).
- Distinct iconography (e.g., an alert triangle paired with red, a calendar icon paired with yellow).
- Typographical distinction (e.g., bold weight, underlined links).
- Physical geometry (e.g., distinct borders, pill tags, solid vs. outlined strokes).

### 3. Visual Stress & Dyslexia (Meares-Irlen Considerations)
- **Avoid Pure Black on Pure White:** High-contrast pure white (`#FFFFFF`) behind pitch black (`#000000`) can induce visual vibration, headaches, and "rivering" (optical illusion of white rivers running through text) for dyslexic and neurodivergent individuals.
- **Soft Foundations:** Use soft slate neutrals (`#0F172A` text on `#F8FAFC` or `#F1F5F9` canvas) to ensure crisp legibility without sensory glare.
- **Avoid Italics as Accessibility Substitutes:** Slanted letterforms degrade letter silhouette recognition and trigger visual crowding for dyslexic readers. See [FONTS.md](apps/web/docs/FONTS.md) for complete typography guidelines; use bold text, distinct borders, or underline offsets instead.

### 4. Controlled Saturation (ASD & Sensory Overload)
- Avoid hyper-saturated neon backgrounds that distract or overstimulate students with ASD.
- Use **tinted pastel surfaces (5% to 15% opacity)** for badges and callout containers, reserving saturated hues for borders, icons, and text tokens that pass contrast checks.

---

## 📚 Pedagogical Color Code System (Default Palette)

The platform implements the two foundational paradigms of educational color coding widely recognized in Brazilian pedagogical literature:

### A. Color Coding by Subject (`Por Matéria`)

Teachers and students use fixed color coding for school disciplines across binders, notebooks, planner cards, and adapted worksheets.

| Subject (PT-BR) | Token Name | Base Hex | Surface Tint | Border Hex | Foreground Text | Contrast Ratio | Pedagogical Usage & Symbolism |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Português** | `--subject-portuguese` | `#EC4899` | `#FDF2F8` | `#F472B6` | `#9D174D` | 7.2:1 (AAA) | Grammar, literature, reading comprehension, writing production. |
| **Matemática** | `--subject-math` | `#2563EB` | `#EFF6FF` | `#60A5FA` | `#1E40AF` | 8.5:1 (AAA) | Calculations, algebra, geometry, problem-solving routines. |
| **História** | `--subject-history` | `#EA580C` | `#FFF7ED` | `#FB923C` | `#9A3412` | 7.4:1 (AAA) | Timelines, historical periods, citizenship, social evolution. |
| **Geografia** | `--subject-geography` | `#16A34A` | `#F0FDF4` | `#4ADE80` | `#166534` | 7.9:1 (AAA) | Cartography, climate, biomes, territorial analysis. |
| **Química / Biologia** | `--subject-science` | `#9333EA` | `#FAF5FF` | `#C084FC` | `#6B21A8` | 8.6:1 (AAA) | Natural sciences, cellular biology, laboratory formulas. |
| **Física** | `--subject-physics` | `#0284C7` | `#F0F9FF` | `#38BDF8` | `#075985` | 7.8:1 (AAA) | Mechanics, electricity, optics, scientific experiments. |
| **Artes** | `--subject-arts` | `#D946EF` | `#FDF4FF` | `#E879F9` | `#86198F` | 7.6:1 (AAA) | Visual arts, theatrical expression, music, creative projects. |
| **Educação Física** | `--subject-pe` | `#0D9488` | `#F0FDFA` | `#2DD4BF` | `#115E59` | 7.5:1 (AAA) | Motor skills, physical wellness, sports, team routines. |
| **Língua Inglesa** | `--subject-languages` | `#CA8A04` | `#FEFCE8` | `#FACC15` | `#854D0E` | 7.4:1 (AAA) | Foreign language acquisition, vocabulary, international culture. |
| **Filosofia / Sociologia** | `--subject-humanities`| `#78716C` | `#F5F5F4` | `#A8A29E` | `#44403C` | 7.7:1 (AAA) | Critical thinking, ethics, societal organization. |

> [!WARNING]
> **Risky Chromatic Pairs in Default Mode:**
> Empirical research in chromatic accessibility (*Guia de Acessibilidade Cromática para Daltonismo*, UFSM / Coletivo UX) identifies **Green + Orange** and **Blue + Purple** as high-risk confusion pairings across red-green color vision deficiencies. In AdaptEdu's default palette, **História (Orange) vs. Geografia (Green)** and **Matemática (Blue) vs. Química/Biologia (Purple)** must ALWAYS be accompanied by their persistent geometric iconography (⏳ vs. 🌍 and 🧮 vs. 🧪) and explicit text labels. Never rely solely on color to differentiate subjects, ensuring students and educators with undiagnosed mild CVD are not excluded.

---

### B. Color Coding by Content Hierarchy (`Por Hierarquia de Conteúdo`)

Used within study summaries, adapted texts, pedagogical instructions, and classroom notes to guide visual focus and reduce executive cognitive load:

| Content Tier (PT-BR) | Primary Role | Token Name | Surface Tint | Border Hex | Foreground Text | Contrast | Meaning & Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Vermelho: Conceito-Chave & Urgência** | Key concepts, core takeaways, urgency, critical warnings | `--hierarchy-key` | `#FEF2F2` | `#F87171` | `#991B1B` | 8.2:1 (AAA) | Foundational ideas that cannot be overlooked, exam deadlines, and safety instructions. |
| **Azul: Definições & Explicações** | Technical definitions, theoretical rules, explanations | `--hierarchy-def` | `#F0F9FF` | `#38BDF8` | `#075985` | 7.8:1 (AAA) | Structural concepts, grammatical rules, scientific laws, and pedagogical explanations. |
| **Amarelo / Âmbar: Dados & Fórmulas** | Dates, numerical data, mathematical formulas, citations | `--hierarchy-data` | `#FFFBEB` | `#FBBF24` | `#92400E` | 7.5:1 (AAA) | Chronological markers, calculation constants, citations, and quantitative checkpoints. |
| **Verde: Exemplos Práticos & Métodos** | Practical examples, step-by-step methods, exercises | `--hierarchy-example` | `#ECFDF5` | `#34D399` | `#065F46` | 8.1:1 (AAA) | Real-life application cases, step-by-step algorithms, solved exercises, and guided experiments. |

> [!IMPORTANT]
> **Avoid Raw Bright Yellow for Text:** Pure yellow (`#FFFF00`) has an unreadable contrast ratio of 1.07:1 against light backgrounds. AdaptEdu utilizes **Deep Amber / Warm Gold (`#92400E` text with `#FFFBEB` surface)** to retain the pedagogical association of yellow while exceeding WCAG AAA contrast requirements.

---

## 👁️ Specialized Color Vision Deficiency (CVD / Daltonismo) System

In Brazil, approximately 8% of male students and 0.5% of female students present some form of color blindness. When an educator implements color coding in notebooks, schedules, or adapted worksheets, a student with CVD can experience confusion and exclusion if the platform lacks specialized chromatic remapping.

AdaptEdu provides **four dedicated CVD operational modes** activated via the HTML attribute `data-cvd`:

```html
<html data-cvd="default | deuteranopia | protanopia | tritanopia | achromatopsia">
```

---

### 1. Deuteranopia & Deuteranomalia (M-Cone / Green Defect)
- **Prevalence:** The most common form (~6% of males).
- **Physiology:** Malfunction or absence of green-sensitive cone photoreceptors (M-cones).
- **Perception Breakdown:** Green appears brownish or olive/gray; red loses luminance and vibrancy; severe confusion between green, red, brown, and purple.
- **Pedagogical Failure in Default Palette:** A student cannot distinguish between **Geografia** (Green) and **História** (Orange/Red), or between **Conceitos-chave** (Red) and **Exemplos** (Green).
- **AdaptEdu Remapping Strategy:**
  - **Exemplos Práticos & Geografia:** Shifted from grass green (`#16A34A`) to **High-Luminance Cyan / Deep Teal (`#0891B2` / `#0E7490`)**, separating them definitively from the red/orange spectrum.
  - **Conceitos-chave:** Shifted to **Burnt Vermilion (`#C2410C`)** with boosted border weight (3px) and bold font.
  - **Português:** Shifted to **Deep Violet (`#7C3AED`)**, maximizing distance from orange/red tones.

---

### 2. Protanopia & Protanomalia (L-Cone / Red Defect)
- **Prevalence:** Approximately 2% of males.
- **Physiology:** Malfunction or absence of red-sensitive cone photoreceptors (L-cones).
- **Perception Breakdown:** Red is perceived as dark brown, dark beige, or black. Red loses luminous efficacy drastically (appears dim). Great difficulty distinguishing red from green, black, or dark brown.
- **Pedagogical Failure in Default Palette:** Red text or markers look black or dark gray; students miss critical takeaways or deadlines because red fails to attract attention.
- **AdaptEdu Remapping Strategy:**
  - **Conceitos-chave & Urgência:** Replaced by **Vivid High-Luminance Magenta-Pink (`#BE185D` / `#F472B6`)** and underlined markers, preventing it from dimming into black.
  - **Exemplos Práticos & Geografia:** Shifted to **Vibrant Teal (`#0D9488`)**.
  - **História:** Re-anchored to **Golden Ochre (`#B45309`)**.
  - **Matemática:** Strengthened to **Ultramarine Blue (`#1E40AF`)**, providing maximal luminance contrast.

---

### 3. Tritanopia & Tritanomalia (S-Cone / Blue Defect)
- **Prevalence:** Rare (~0.01% of the population, equal distribution between sexes).
- **Physiology:** Malfunction or absence of blue-sensitive cone photoreceptors (S-cones).
- **Perception Breakdown:** Blue and green are confused; yellow fades, disappears, or is perceived as light pink or light gray. S-cone deficient individuals cannot distinguish short-wavelength light (blues, indigos, purples, violets).
- **Pedagogical Failure in Default Palette:** Yellow highlights (Dates/Formulas) disappear or blend into pink (Português); blue (Matemática/Definições) is confused with green (Geografia/Exemplos); dark mode screens saturated in slate blue and indigo create cognitive strain and illegibility.
- **AdaptEdu Remapping Strategy:**
  - **Capitalizes on the Intact Red-Cyan Optical Axis:** Tritanopes perceive red and cyan with sharp clarity.
  - **Conceitos-chave:** Uses **Pure Crimson Red (`#DC2626`)** — perceived with sharp distinction.
  - **Datas, Fórmulas & Citações:** Remapped away from fading yellow and non-discernible purple/violet to **Warm Terracotta / Rust (`#C2410C`)**.
  - **Definições & Matemática:** Shifted to **Deep Charcoal / Midnight Neutral (`#262626` / `#18181B`)**.
  - **Exemplos & Geografia:** Pure **Bright Cyan / Turquoise (`#06B6D4`)**.
  - **Ciências:** Remapped away from purple/fuchsia to **Deep Teal (`#0E7490`)**.
  - **Neutral Dark Foundation:** When dark mode is paired with Tritanopia, blue-tinted slate backgrounds (`#0B0F19`, `#1E293B`) are overridden with **pure neutral zinc darks (`#121212`, `#1C1C1C`, `#262626`)**, and brand tokens are remapped to **Teal/Cyan (`#0891B2` / `#06B6D4`)**.

---

### 4. Achromatopsia / Monocromia (Total Cone Failure & Photophobia Protection)
- **Prevalence:** Very rare (~0.003%), highly debilitating.
- **Physiology:** Complete absence or malfunction of all three cone systems. Vision is mediated solely by rod photoreceptors.
- **Perception Breakdown:** Vision is entirely achromatic (black, white, and grays). Accompanied by **severe photophobia (extreme eye pain and blindness in standard daylight or bright screen glare)** and reduced visual acuity.
- **Pedagogical Failure in Default Palette:** Complete loss of all chromatic cues, combined with physical pain from bright white backgrounds and extreme 21:1 luminance glare.
- **AdaptEdu Remapping Strategy:**
  - **🛡️ Anti-Glare Photophobia Shield:** Pure white surfaces (`#FFFFFF`) are strictly eradicated; replaced with soft matte anti-glare neutrals (`--bg-canvas: #E4E4E7`, `--bg-surface: #D4D4D8` in light mode; `#18181B`, `#27272A` in dark mode).
  - **Anti-Glare Adaptive Structural Contrast:** When paired with High Contrast, luminance glare is avoided; instead, **structural contrast** is enforced via thick outlines (2px/3px solid, double, dotted, dashed borders) and geometric visual anchors.
  - **Strict Luminance Interval Stacking:** Tokens use calibrated grayscale reflectivity intervals (matte gray, light gray, mid gray, dark zinc).
  - **Structural & Pattern Encodings (No-Color Dependent):**
    - **Conceitos-Chave:** Solid inverted dark badge with thick solid border (`border-left: 4px solid #18181b`) + bold weight.
    - **Definições:** Double stroke border (`border-left: 4px double #52525b`).
    - **Datas & Fórmulas:** Dotted border (`border-left: 4px dotted #71717a`) + bracket markers `[ 1945 ]`.
    - **Exemplos:** Dashed border (`border-left: 4px dashed #a1a1aa`) + underline decoration (avoiding italics to accommodate dyslexia as outlined in chromatic accessibility guidelines).
  - **Discipline Geometrical Badges:**
    - `[PT]` Português: Solid Pill + 📖
    - `[MAT]` Matemática: Square + 🧮
    - `[HIST]` História: Hexagon + ⏳
    - `[GEO]` Geografia: Circle + 🌍
    - `[CIE]` Ciências: Diamond + 🧪

---

### 📊 CVD Color Remapping Matrix

#### A. Content Hierarchy Remapping

| Hierarchy Token | Default Palette | Deuteranopia (Green-blind) | Protanopia (Red-blind) | Tritanopia (Blue-blind) | Achromatopsia (Monochrome) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Conceito-Chave** (Urgência) | `#DC2626` (Red) | `#C2410C` (Burnt Vermilion) | `#BE185D` (Bright Magenta) | `#DC2626` (Crimson Red) | `#18181B` (Solid 4px Border) |
| **Definições** (Regras) | `#0284C7` (Sky Blue) | `#0284C7` (Sky Blue) | `#0284C7` (Sky Blue) | `#334155` (Slate Charcoal) | `#52525B` (Double 4px Border) |
| **Dados & Fórmulas** | `#D97706` (Amber) | `#D97706` (Amber) | `#CA8A04` (Warm Gold) | `#C2410C` (Terracota / Ferrugem) | `#71717A` (Dotted 4px Border) |
| **Exemplos Práticos** | `#059669` (Green) | `#0891B2` (Bright Cyan) | `#0D9488` (Vibrant Teal) | `#06B6D4` (Turquoise) | `#A1A1AA` (Dashed 4px Border) |

#### B. Discipline (Por Matéria) Remapping

| Disciplina (PT-BR) | Default | Deuteranopia | Protanopia | Tritanopia | Achromatopsia |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Português** | Rosa (`#EC4899`) | Roxo Real (`#7C3AED`) | Magenta Claro (`#DB2777`) | Carmesim (`#E11D48`) | Pílula Cheia + 📖 |
| **Matemática** | Azul (`#2563EB`) | Azul Cobalto (`#1D4ED8`)| Azul Ultramar (`#1E40AF`)| Grafite Escuro (`#1E293B`)| Quadrado Sólido + 🧮 |
| **História** | Laranja (`#EA580C`) | Ouro Quente (`#D97706`) | Âmbar Ocre (`#B45309`) | Terracota (`#C2410C`) | Hexágono + ⏳ |
| **Geografia** | Verde (`#16A34A`) | Ciano Vivo (`#0891B2`) | Verde Azulado (`#0D9488`)| Turquesa (`#06B6D4`) | Círculo + 🌍 |
| **Ciências** | Roxo (`#9333EA`) | Índigo Escuro (`#4338CA`)| Violeta (`#6D28D9`) | Ciano Petróleo (`#0E7490`) | Losango + 🧪 |

---

## 🎨 System Interface Palette (Design Tokens)

The core web application interface uses a disciplined neutral foundation balanced with a pedagogical brand primary token.

### 1. Neutral Foundation Tokens

```
Light Mode:
  --bg-canvas:        #F8FAFC (Slate 50 - glare-reducing soft background)
  --bg-surface:       #FFFFFF (Pure White - card and elevated panel surface)
  --bg-subtle:        #F1F5F9 (Slate 100 - hover states, secondary containers)
  --border-subtle:    #E2E8F0 (Slate 200 - card borders, card dividers)
  --border-strong:    #CBD5E1 (Slate 300 - input borders, modal boundaries)
  --text-primary:     #0F172A (Slate 900 - main headings and readable body text)
  --text-secondary:   #475569 (Slate 600 - metadata, helper notes, subheadings)
  --text-muted:       #64748B (Slate 500 - placeholders, disabled markers)

Dark Mode:
  --bg-canvas:        #0B0F19 (Deep Slate - reduces optical strain in dim environments)
  --bg-surface:       #1E293B (Slate 800 - elevated cards and dropdown menus)
  --bg-subtle:        #334155 (Slate 700 - hover states, interactive chips)
  --border-subtle:    #334155 (Slate 700 - dividers and card borders)
  --border-strong:    #475569 (Slate 600 - distinct input borders)
  --text-primary:     #F8FAFC (Slate 50 - crisp, non-glare text)
  --text-secondary:   #94A3B8 (Slate 400 - secondary descriptions)
  --text-muted:       #64748B (Slate 500 - low-emphasis tokens)
```

### 2. Brand Tokens

AdaptEdu adopts an accessible **Educational Blue / Educational Sapphire** (`#2563EB`) as its core brand signature, symbolizing trust, focus, and clarity:

- `--color-brand-primary`: `#2563EB` (Blue 600 - Light mode button & active link fill)
- `--color-brand-hover`: `#1D4ED8` (Blue 700)
- `--color-brand-surface`: `#EFF6FF` (Blue 50)
- `--color-brand-border`: `#93C5FD` (Blue 300)
- `--color-brand-text`: `#1E40AF` (Blue 800)

### 3. Feedback & Status Tokens

| State | Role | Surface Hex | Border Hex | Foreground Hex | Icon |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Success** | Confirmed saves, successful adaptations, completed tasks | `#ECFDF5` | `#6EE7B7` | `#065F46` | Check Circle |
| **Warning** | Cautionary notes, high sensory load warnings, unsaved changes | `#FFFBEB` | `#FCD34D` | `#92400E` | Alert Triangle |
| **Destructive / Error** | Validation errors, failed API calls, deletion confirmations | `#FEF2F2` | `#FCA5A5` | `#991B1B` | X Octagon |
| **Info** | Neutral system tips, pedagogical hints, feature tours | `#EFF6FF` | `#93C5FD` | `#1E40AF` | Info Circle |

---

## 💻 CSS Variables Specification

The complete implementation ready for `apps/web/src/app/globals.css`:

```css
:root {
  /* ==========================================================================
     AdaptEdu Core Interface Foundations (Light Mode)
     ========================================================================== */
  --bg-canvas: #f8fafc;
  --bg-surface: #ffffff;
  --bg-subtle: #f1f5f9;
  --border-subtle: #e2e8f0;
  --border-strong: #cbd5e1;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;

  --background: var(--bg-canvas);
  --foreground: var(--text-primary);

  /* Brand Tokens */
  --color-brand-primary: #2563eb;
  --color-brand-hover: #1d4ed8;
  --color-brand-surface: #eff6ff;
  --color-brand-border: #93c5fd;
  --color-brand-text: #1e40af;

  /* Semantic Feedback Tokens */
  --color-feedback-success-bg: #ecfdf5;
  --color-feedback-success-border: #6ee7b7;
  --color-feedback-success-text: #065f46;

  --color-feedback-warning-bg: #fffbeb;
  --color-feedback-warning-border: #fcd34d;
  --color-feedback-warning-text: #92400e;

  --color-feedback-error-bg: #fef2f2;
  --color-feedback-error-border: #fca5a5;
  --color-feedback-error-text: #991b1b;

  --color-feedback-info-bg: #eff6ff;
  --color-feedback-info-border: #93c5fd;
  --color-feedback-info-text: #1e40af;

  /* ==========================================================================
     Pedagogical Color Code: By Subject (Default)
     ========================================================================== */
  --subject-portuguese-base: #ec4899;
  --subject-portuguese-surface: #fdf2f8;
  --subject-portuguese-border: #f472b6;
  --subject-portuguese-text: #9d174d;

  --subject-math-base: #2563eb;
  --subject-math-surface: #eff6ff;
  --subject-math-border: #60a5fa;
  --subject-math-text: #1e40af;

  --subject-history-base: #ea580c;
  --subject-history-surface: #fff7ed;
  --subject-history-border: #fb923c;
  --subject-history-text: #9a3412;

  --subject-geography-base: #16a34a;
  --subject-geography-surface: #f0fdf4;
  --subject-geography-border: #4ade80;
  --subject-geography-text: #166534;

  --subject-science-base: #9333ea;
  --subject-science-surface: #faf5ff;
  --subject-science-border: #c084fc;
  --subject-science-text: #6b21a8;

  --subject-physics-base: #0284c7;
  --subject-physics-surface: #f0f9ff;
  --subject-physics-border: #38bdf8;
  --subject-physics-text: #075985;

  --subject-arts-base: #d946ef;
  --subject-arts-surface: #fdf4ff;
  --subject-arts-border: #e879f9;
  --subject-arts-text: #86198f;

  --subject-pe-base: #0d9488;
  --subject-pe-surface: #f0fdfa;
  --subject-pe-border: #2dd4bf;
  --subject-pe-text: #115e59;

  --subject-languages-base: #ca8a04;
  --subject-languages-surface: #fefce8;
  --subject-languages-border: #facc15;
  --subject-languages-text: #854d0e;

  --subject-humanities-base: #78716c;
  --subject-humanities-surface: #f5f5f4;
  --subject-humanities-border: #a8a29e;
  --subject-humanities-text: #44403c;

  /* ==========================================================================
     Pedagogical Color Code: By Content Hierarchy (Default)
     ========================================================================== */
  --hierarchy-key-base: #dc2626;
  --hierarchy-key-surface: #fef2f2;
  --hierarchy-key-border: #f87171;
  --hierarchy-key-text: #991b1b;

  --hierarchy-def-base: #0284c7;
  --hierarchy-def-surface: #f0f9ff;
  --hierarchy-def-border: #38bdf8;
  --hierarchy-def-text: #075985;

  --hierarchy-data-base: #d97706;
  --hierarchy-data-surface: #fffbeb;
  --hierarchy-data-border: #fbbf24;
  --hierarchy-data-text: #92400e;

  --hierarchy-example-base: #059669;
  --hierarchy-example-surface: #ecfdf5;
  --hierarchy-example-border: #34d399;
  --hierarchy-example-text: #065f46;
}

/* ==========================================================================
   Color Vision Deficiency (CVD) System Overrides
   ========================================================================== */

/* 1. Deuteranopia / Deuteranomalia Mode (Green-Cone Defect) */
[data-cvd="deuteranopia"] {
  --hierarchy-key-base: #c2410c;
  --hierarchy-key-surface: #fff7ed;
  --hierarchy-key-border: #fb923c;
  --hierarchy-key-text: #7c2d12;

  --hierarchy-example-base: #0891b2;
  --hierarchy-example-surface: #ecfeff;
  --hierarchy-example-border: #22d3ee;
  --hierarchy-example-text: #155e75;

  --subject-portuguese-base: #7c3aed;
  --subject-portuguese-surface: #faf5ff;
  --subject-portuguese-border: #c084fc;
  --subject-portuguese-text: #581c87;

  --subject-history-base: #d97706;
  --subject-history-surface: #fffbeb;
  --subject-history-border: #fbbf24;
  --subject-history-text: #92400e;

  --subject-geography-base: #0891b2;
  --subject-geography-surface: #ecfeff;
  --subject-geography-border: #22d3ee;
  --subject-geography-text: #155e75;

  --subject-science-base: #4338ca;
  --subject-science-surface: #eef2ff;
  --subject-science-border: #818cf8;
  --subject-science-text: #312e81;
}

/* 2. Protanopia / Protanomalia Mode (Red-Cone Defect) */
[data-cvd="protanopia"] {
  --hierarchy-key-base: #be185d;
  --hierarchy-key-surface: #fdf2f8;
  --hierarchy-key-border: #f472b6;
  --hierarchy-key-text: #831843;

  --hierarchy-example-base: #0d9488;
  --hierarchy-example-surface: #f0fdfa;
  --hierarchy-example-border: #2dd4bf;
  --hierarchy-example-text: #115e59;

  --subject-portuguese-base: #db2777;
  --subject-portuguese-surface: #fdf2f8;
  --subject-portuguese-border: #f472b6;
  --subject-portuguese-text: #9d174d;

  --subject-history-base: #b45309;
  --subject-history-surface: #fffbeb;
  --subject-history-border: #f59e0b;
  --subject-history-text: #78350f;

  --subject-geography-base: #0d9488;
  --subject-geography-surface: #f0fdfa;
  --subject-geography-border: #2dd4bf;
  --subject-geography-text: #115e59;

  --subject-science-base: #6d28d9;
  --subject-science-surface: #f5f3ff;
  --subject-science-border: #a78bfa;
  --subject-science-text: #4c1d95;
}

/* 3. Tritanopia / Tritanomalia Mode (Blue-Cone Defect) */
[data-cvd="tritanopia"] {
  /* Brand Tokens remapped to Teal/Cyan for Tritanopia on the preserved Red-Cyan optical axis */
  --color-brand-primary: #0891b2;
  --color-brand-hover: #0e7490;
  --color-brand-surface: #ecfeff;
  --color-brand-border: #67e8f9;
  --color-brand-text: #155e75;

  --hierarchy-key-base: #dc2626;
  --hierarchy-key-surface: #fef2f2;
  --hierarchy-key-border: #f87171;
  --hierarchy-key-text: #991b1b;

  --hierarchy-def-base: #334155;
  --hierarchy-def-surface: #f1f5f9;
  --hierarchy-def-border: #64748b;
  --hierarchy-def-text: #0f172a;

  /* Dados & Fórmulas: Remapped to Warm Terracotta / Rust (eradicating purple/violet) */
  --hierarchy-data-base: #c2410c;
  --hierarchy-data-surface: #fff7ed;
  --hierarchy-data-border: #fb923c;
  --hierarchy-data-text: #7c2d12;

  --hierarchy-example-base: #06b6d4;
  --hierarchy-example-surface: #ecfeff;
  --hierarchy-example-border: #22d3ee;
  --hierarchy-example-text: #0e7490;

  --subject-portuguese-base: #e11d48;
  --subject-portuguese-surface: #fff1f2;
  --subject-portuguese-border: #fb7185;
  --subject-portuguese-text: #9f1239;

  --subject-math-base: #1e293b;
  --subject-math-surface: #f1f5f9;
  --subject-math-border: #475569;
  --subject-math-text: #0f172a;

  --subject-history-base: #c2410c;
  --subject-history-surface: #fff7ed;
  --subject-history-border: #fb923c;
  --subject-history-text: #7c2d12;

  --subject-geography-base: #06b6d4;
  --subject-geography-surface: #ecfeff;
  --subject-geography-border: #22d3ee;
  --subject-geography-text: #0e7490;

  /* Ciências: Remapped to Deep Teal (eradicating purple/violet) */
  --subject-science-base: #0e7490;
  --subject-science-surface: #ecfeff;
  --subject-science-border: #22d3ee;
  --subject-science-text: #155e75;
}

[data-theme="dark"] [data-cvd="tritanopia"],
[data-theme="dark"][data-cvd="tritanopia"] {
  /* Neutral Zinc darks (eradicating blue-tinted slate) */
  --bg-canvas: #121212;
  --bg-surface: #1c1c1c;
  --bg-subtle: #262626;
  --border-subtle: #2e2e2e;
  --border-strong: #404040;
  --text-primary: #f5f5f5;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;

  /* Brand Remapping in Dark Mode Tritanopia */
  --color-brand-primary: #06b6d4;
  --color-brand-hover: #22d3ee;
  --color-brand-surface: #164e63;
  --color-brand-border: #0891b2;
  --color-brand-text: #cffafe;

  --hierarchy-key-surface: #450a0a;
  --hierarchy-key-border: #ef4444;
  --hierarchy-key-text: #fecaca;

  --hierarchy-def-surface: #262626;
  --hierarchy-def-border: #52525b;
  --hierarchy-def-text: #e4e4e7;

  --hierarchy-data-surface: #431407;
  --hierarchy-data-border: #ea580c;
  --hierarchy-data-text: #fed7aa;

  --hierarchy-example-surface: #083344;
  --hierarchy-example-border: #06b6d4;
  --hierarchy-example-text: #a5f3fc;

  --subject-portuguese-surface: #4c0519;
  --subject-portuguese-border: #f43f5e;
  --subject-portuguese-text: #fecdd3;

  --subject-math-surface: #1c1c1c;
  --subject-math-border: #52525b;
  --subject-math-text: #e4e4e7;

  --subject-history-surface: #431407;
  --subject-history-border: #ea580c;
  --subject-history-text: #fed7aa;

  --subject-geography-surface: #083344;
  --subject-geography-border: #0891b2;
  --subject-geography-text: #a5f3fc;

  --subject-science-surface: #083344;
  --subject-science-border: #0891b2;
  --subject-science-text: #cffafe;
}

/* 4. Achromatopsia / Monocromia Mode (Complete Cone Absence & Photophobia Protection) */
[data-cvd="achromatopsia"] {
  /* Soft matte anti-glare neutrals (eradicating pure white glare) */
  --bg-canvas: #e4e4e7;
  --bg-surface: #d4d4d8;
  --bg-subtle: #cbd5e1;
  --border-subtle: #a1a1aa;
  --border-strong: #52525b;
  --text-primary: #18181b;
  --text-secondary: #27272a;
  --text-muted: #52525b;

  --hierarchy-key-base: #18181b;
  --hierarchy-key-surface: #27272a;
  --hierarchy-key-border: #09090b;
  --hierarchy-key-text: #fafafa;

  --hierarchy-def-base: #3f3f46;
  --hierarchy-def-surface: #cbd5e1;
  --hierarchy-def-border: #52525b;
  --hierarchy-def-text: #18181b;

  --hierarchy-data-base: #52525b;
  --hierarchy-data-surface: #e4e4e7;
  --hierarchy-data-border: #71717a;
  --hierarchy-data-text: #27272a;

  --hierarchy-example-base: #71717a;
  --hierarchy-example-surface: #fafafa;
  --hierarchy-example-border: #a1a1aa;
  --hierarchy-example-text: #3f3f46;

  --subject-portuguese-surface: #cbd5e1;
  --subject-portuguese-border: #27272a;
  --subject-portuguese-text: #09090b;

  --subject-math-surface: #27272a;
  --subject-math-border: #18181b;
  --subject-math-text: #fafafa;

  --subject-history-surface: #e4e4e7;
  --subject-history-border: #52525b;
  --subject-history-text: #18181b;

  --subject-geography-surface: #cbd5e1;
  --subject-geography-border: #71717a;
  --subject-geography-text: #18181b;

  --subject-science-surface: #d4d4d8;
  --subject-science-border: #3f3f46;
  --subject-science-text: #09090b;
}

/* High Contrast Mode for Achromatopsia (Anti-Glare Structural Contrast without Photophobia) */
html[data-cvd="achromatopsia"][data-high-contrast="true"],
[data-cvd="achromatopsia"][data-high-contrast="true"] {
  --bg-canvas: #e4e4e7;
  --bg-surface: #d4d4d8;
  --bg-subtle: #cbd5e1;
  --border-subtle: #52525b;
  --border-strong: #18181b;
  --text-primary: #09090b;
  --text-secondary: #18181b;
  --text-muted: #27272a;
}

html[data-theme="dark"][data-cvd="achromatopsia"][data-high-contrast="true"],
[data-theme="dark"][data-cvd="achromatopsia"][data-high-contrast="true"] {
  --bg-canvas: #18181b;
  --bg-surface: #27272a;
  --bg-subtle: #3f3f46;
  --border-subtle: #71717a;
  --border-strong: #f4f4f5;
  --text-primary: #fafafa;
  --text-secondary: #f4f4f5;
  --text-muted: #d4d4d8;
}

/* Structural Non-Color Reinforcement for Achromatopsia */
[data-cvd="achromatopsia"] mark[class*="key-concept"] {
  border-left: 4px solid #18181b !important;
  font-weight: 700;
}

[data-cvd="achromatopsia"] mark[class*="definition"] {
  border-left: 4px double #52525b !important;
}

[data-cvd="achromatopsia"] mark[class*="data"] {
  border-left: 4px dotted #71717a !important;
}

[data-cvd="achromatopsia"] mark[class*="example"] {
  border-left: 4px dashed #a1a1aa !important;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

---

## 🧩 Usage Guidelines in React Components

### 1. Theme Mode Switcher Component Pattern

Educators and students can switch themes via a dedicated accessibility toolbar:

```tsx
"use client";

import React, { useEffect, useState } from "react";
import styles from "./ColorVisionSelector.module.css";

export type ColorVisionMode =
  | "default"
  | "deuteranopia"
  | "protanopia"
  | "tritanopia"
  | "achromatopsia";

const STORAGE_KEY = "adaptedu_cvd_mode";

export function ColorVisionSelector() {
  const [mode, setMode] = useState<ColorVisionMode>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorVisionMode | null;
    if (saved) {
      setMode(saved);
      document.documentElement.setAttribute("data-cvd", saved);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextMode = e.target.value as ColorVisionMode;
    setMode(nextMode);
    localStorage.setItem(STORAGE_KEY, nextMode);
    document.documentElement.setAttribute("data-cvd", nextMode);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="cvd-select" className={styles.label}>
        Modo de Visão de Cores:
      </label>
      <select
        id="cvd-select"
        value={mode}
        onChange={handleChange}
        className={styles.select}
        aria-label="Selecionar modo de visão cromática para daltonismo"
      >
        <option value="default">Padrão (Cromático Universal)</option>
        <option value="deuteranopia">Deuteranopia / Deuteranomalia (Verde)</option>
        <option value="protanopia">Protanopia / Protanomalia (Vermelho)</option>
        <option value="tritanopia">Tritanopia / Tritanomalia (Azul/Amarelo)</option>
        <option value="achromatopsia">Acromatopsia (Monocromático + Anti-Ofuscamento)</option>
      </select>
    </div>
  );
}
```

### 2. Subject Pill / Badge Component Pattern

```tsx
import React from "react";
import styles from "./SubjectBadge.module.css";

export type SubjectKey =
  | "portuguese"
  | "math"
  | "history"
  | "geography"
  | "science"
  | "physics"
  | "arts"
  | "pe"
  | "languages"
  | "humanities";

interface SubjectBadgeProps {
  subject: SubjectKey;
  label: string; // Must be in PT-BR (e.g., "Matemática", "Português")
  icon?: React.ReactNode;
}

export function SubjectBadge({ subject, label, icon }: SubjectBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[subject]}`}
      role="status"
      aria-label={`Disciplina: ${label}`}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.text}>{label}</span>
    </span>
  );
}
```

### 3. Pedagogical Note Highlighter Pattern

```tsx
import React from "react";
import styles from "./ContentHighlight.module.css";

export type HierarchyType = "key-concept" | "definition" | "data" | "example";

interface ContentHighlightProps {
  type: HierarchyType;
  children: React.ReactNode;
}

export function ContentHighlight({ type, children }: ContentHighlightProps) {
  return (
    <mark className={`${styles.highlight} ${styles[type]}`}>
      {children}
    </mark>
  );
}
```

---

## 👩‍🏫 Teacher Simulation Lens (*Modo Simulação*)

To ensure that adapted handouts and lesson boards are accessible before classroom delivery, AdaptEdu incorporates an interactive **Educator Simulation Lens**. 

This feature allows teachers to preview their content through real-time SVG color matrices:

```html
<!-- SVG Filter Matrix Simulation for Pedagogical Proofing -->
<svg style="display: none;">
  <!-- Deuteranopia Simulation -->
  <filter id="sim-deuteranopia">
    <feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" />
  </filter>
  <!-- Protanopia Simulation -->
  <filter id="sim-protanopia">
    <feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" />
  </filter>
  <!-- Tritanopia Simulation -->
  <filter id="sim-tritanopia">
    <feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" />
  </filter>
  <!-- Achromatopsia Simulation -->
  <filter id="sim-achromatopsia">
    <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" />
  </filter>
</svg>
```

When a teacher triggers the **"Simular Visão do Estudante"** toggle, the relevant SVG filter applies to the preview canvas, allowing the educator to instantly verify if their annotations are visually distinct for their students.

---

## ✅ Quality & Review Checklist for Agents & Engineers

Before committing any component or style modification, verify:

- [ ] **Contrast Verification:** Does the text meet or exceed 4.5:1 against its background container in all CVD modes?
- [ ] **No Naked Colors:** Is there an icon, label, or structural marker alongside the color?
- [ ] **Achromatopsia Structural Check:** Do highlighted elements display border-style variations (`solid`, `double`, `dotted`, `dashed`) in addition to grayscale luminance?
- [ ] **Photophobia Shield Active:** In Achromatopsia mode, is harsh pure-white glare `#FFFFFF` replaced with soft matte neutrals (`#F4F4F5` / `#18181B`)?
- [ ] **Dark Mode Parity:** Are all CVD overrides mapped properly under dark mode?
- [ ] **Language Integrity:** Are all UI labels in PT-BR while all CSS tokens, class names, and code comments remain in English?

---

## 🔗 Related Documentation

- [apps/web/docs/GLOBAL.md](apps/web/docs/GLOBAL.md): Frontend Architecture Index.
- [apps/web/docs/ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md): Universal Design, The Three Visual States, and Cognitive Accommodations.
- [apps/web/docs/FONTS.md](apps/web/docs/FONTS.md): Typography & Cognitive Reading System.
- [apps/web/docs/DESIGN_SYSTEM.md](apps/web/docs/DESIGN_SYSTEM.md): Component Specifications & Anatomy.
