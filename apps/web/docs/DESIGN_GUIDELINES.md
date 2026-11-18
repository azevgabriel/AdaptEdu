# AdaptEdu Design Taste Guidelines & Anti-Slop Art Direction

This document defines the visual identity, art direction, aesthetic standards, and UX writing principles for AdaptEdu (`apps/web/`).

It incorporates the anti-slop principles from **`Leonxlnx/taste-skill`** and interface quality standards from **Vercel Labs' `web-design-guidelines`**, tailored specifically for Brazilian public school educators and neurodiversity inclusion.

---

## 🎨 1. The Anti-Slop Manifesto (Overcoming AI Distributional Convergence)

AI coding assistants frequently suffer from **distributional convergence**—defaulting to generic, interchangeable designs:
- ❌ **The "AI Template" Look:** Dark-purple floating mesh gradients, neon glow rings, generic glassmorphism cards with translucent borders, and three identical feature boxes with icons in pastel circles.
- ❌ **Uninspired "AI SaaS" Aesthetics:** Cold, emotionless interfaces, corporate marketing buzzwords, and lack of visual density or intentional hierarchy.
- ❌ **Fragile Layouts:** Components that look good only on desktop viewports and break or overlap on mobile screens.

### 🌟 The AdaptEdu Design Ethos: Pedagogical Warmth & Professional Trust

AdaptEdu serves Brazilian public school teachers working in resource-constrained, high-stress environments. Our design must convey:
1. **Calm & Sensory Comfort:** Low-arousal, glare-free, sensory-friendly surfaces that reduce ocular and mental fatigue.
2. **Pedagogical Warmth:** Friendly, approachable, human-centered aesthetics anchored by Nunito headings and tactile feedback.
3. **Clarity & Efficiency:** Zero fluff. Every button, badge, and card has an unambiguous purpose. A teacher with 5 minutes between classes must be able to adapt a lesson plan without friction.

---

## 🏛️ 2. Visual Hierarchy & Surface Architecture

### 2.1 Sensory-Friendly Surface Palette
- **Low-Arousal Backgrounds:** Use soft slate and zinc neutrals (`var(--bg-canvas)`, `var(--bg-surface)`, `var(--bg-subtle)`). Never flash blinding pure `#ffffff` against pure `#000000`.
- **Purposeful Brand Accents:** Reserve brand colors (`var(--color-brand-primary)`, `var(--color-brand-surface)`) for primary interactive actions and active selections. Never flood whole screens with purple or blue gradients.
- **Pedagogical Color System:** School disciplines have dedicated semantic tokens (`var(--subject-matematica)`, `var(--subject-portugues)`, `var(--subject-historia)`, `var(--subject-ciencias)`). Every chromatic token is accompanied by a persistent icon and text label ("Never Color Alone").

### 2.2 Intentional Density & Spatial Separation
- **Spatial Boundaries:** Maintain clear spacing between sections (`gap: 1.5rem` or `2rem`). Interactive cards must have clean internal breathing room (`padding: 1rem` to `1.25rem`).
- **Tactile Card Depth:** Avoid harsh drop-shadows or blurry glows. Use subtle, physical micro-elevation:
  ```css
  /* Resting State */
  border: 2px solid var(--border-subtle);
  background-color: var(--bg-surface);

  /* Hover State */
  border-color: var(--border-strong);
  background-color: var(--bg-subtle);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);

  /* Active / Selected State */
  border-color: var(--color-brand-primary);
  background-color: var(--color-brand-surface);
  box-shadow: 0 4px 14px rgba(67, 56, 202, 0.12);
  ```

### 2.3 Tactile Focus & Touch Targets
- **Target Size (WCAG 2.2 Criterion 2.5.8):** All interactive elements (buttons, switches, radio cards) must have a touch target of at least **$44\times44\text{px}$**.
- **Tactile Focus Rings:**
  ```css
  :focus-visible {
    outline: 2px solid var(--color-brand-primary);
    outline-offset: 2px;
  }
  ```
- **Windows High Contrast Mode (`@media (forced-colors: active)`):** Ensure all cards, buttons, and indicators provide explicit high-contrast system colors (`ButtonBorder`, `Highlight`, `HighlightText`).

---

## 🔤 3. Typography Pairing & Cognitive Ergonomics

AdaptEdu uses a dual-font architecture engineered for cognitive comfort:

| Role | Font Family | Variable | Aesthetic & Cognitive Purpose |
| :--- | :--- | :--- | :--- |
| **Headings & Titles** | **Nunito** | `--font-family-headings` | Rounded terminal strokes convey warmth, empathy, and approachable human craftsmanship. |
| **Body & Controls** | **Inter** | `--font-family-body` | Tall x-height, neutral geometric structure, and exceptional legibility across dense school reports and forms. |

### Dyslexia & Sensory Invariants
- **Strictly NO Italics for Emphasis:** Never use `font-style: italic` to highlight concepts, tips, or accessibility warnings. Slanted letterforms distort character silhouettes and increase visual crowding for dyslexic readers. Use bold (`font-weight: 600/700`), badges, or structural borders instead.
- **Line Length Ergonomics:** Long-form pedagogical text must not exceed **65 characters** per line (`max-width: 65ch`).
- **Line Height:** Body text maintains at least `1.5` (`line-height: 1.5`); headings between `1.2` and `1.35`.
- **Text Alignment:** Always left-aligned (`text-align: left`). Never use justified text (`text-align: justify`).

---

## ✍️ 4. UX Writing & Microcopy Standards (PT-BR)

All client-facing copy, labels, hints, and error messages **MUST** be written strictly in Brazilian Portuguese (PT-BR).

### 4.1 Voice and Tone
- **Empathetic & Supportive:** Acknowledge educator dedication without being patronizing.
- **Active Voice & Direct Action:** Prefer `"Ativar Modo Escuro"` over `"O modo escuro pode ser ativado aqui"`. Prefer `"Salvar adaptação"` over `"Clique para submeter"`.
- **Clear & Jargon-Free:** Public school teachers have diverse backgrounds. Avoid convoluted technical jargon.

### 4.2 The Hypothesis-Only & Non-Diagnostic Principle (MANDATORY)
The platform must **NEVER** formulate, claim, or present a clinical or medical diagnosis. All screening metrics, similarity percentages, and AI-generated insights are observational hypotheses:
- ❌ **Forbidden:** `"Este aluno tem TDAH"`, `"Diagnóstico: Dislexia"`, `"Resultado clínico: Positivo para autismo"`.
- ✅ **Required:** `"Hipótese observacional baseada no relato de dificuldades atencionais"`, `"Sugestão pedagógica para apoio em leitura"`, `"Recomenda-se articular com a coordenação pedagógica e orientar avaliação especializada com profissional de saúde."`

---

## 📋 5. Component Construction Quality Checklist

Before completing any frontend component, verify against this 6-point checklist:

- [ ] **1. Anti-Slop Check:** Does the component avoid generic purple-neon gradients, fake 3D renders, and cliché card grids? Does it use the official AdaptEdu design tokens?
- [ ] **2. Contrast & Photophobia:** Normal text meets $\ge 4.5:1$ (AAA target $\ge 7:1$); interactive borders meet $\ge 3:1$. Soft surfaces protect against glare.
- [ ] **3. Never Color Alone:** Statuses and subjects are accompanied by icons and visible text.
- [ ] **4. Touch & Keyboard:** Minimum $44\times44\text{px}$ touch target; visible focus ring; full keyboard cycling (Arrow keys, Home, End, Space, Enter).
- [ ] **5. Windows High Contrast Mode:** Tested with `@media (forced-colors: active)`.
- [ ] **6. Audit Skill Integration:** Run the component review protocol in [`apps/web/docs/skills/component-a11y-audit/SKILL.md`](apps/web/docs/skills/component-a11y-audit/SKILL.md) and guarantee $\ge 90\%$ test coverage in `index.spec.tsx`.
