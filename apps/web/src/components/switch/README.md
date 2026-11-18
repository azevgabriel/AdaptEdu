# Switch Component (`src/components/switch`)

The `Switch` component is an accessible, inclusive interactive primitive built following the canonical design patterns established in Heydon Pickering's [Inclusive Components: Toggle Button](https://inclusive-components.design/toggle-button/) and the W3C WAI-ARIA Authoring Practices Guide (APG).

---

## 🎯 Role & Pedagogical Purpose

In AdaptEdu, educators manage high cognitive loads while tailoring lesson plans and classroom routines for neurodivergent students. The `Switch` component governs immediate, system-wide visual and cognitive accommodations (such as Structural High Contrast, Dyslexia & ADHD Reading Spacing, and Reduced Motion), applying settings immediately without requiring a form submission step.

---

## 📚 Inclusive Design Foundations

### 1. Persistent Label Invariant (No Mutating Labels)
- **Anti-Pattern:** Dynamically altering the button text between "Ativar" and "Desativar" when toggled. When a screen reader announces *"Desativar, interruptor, ativado"*, the educator cannot discern whether the setting is currently active or if clicking it will deactivate it.
- **Inclusive Pattern:** The text label remains completely persistent (e.g., *"Alto Contraste Estrutural"*), while state is communicated purely through `aria-checked="true | false"`.

### 2. Decision Matrix: Switch vs. Toggle Button vs. Checkbox

| Control Pattern | Semantic Role | State Attribute | Intended Use Case |
| :--- | :--- | :--- | :--- |
| **Switch** | `role="switch"` | `aria-checked` | Standalone settings and preferences taking immediate effect without form submission. |
| **Toggle Button** | Native `<button>` | `aria-pressed` | Two-state actions within toolbars or cards (e.g. bold formatting, favoriting). |
| **Checkbox** | `<input type="checkbox">` | `checked` | Batch data collection forms where changes are confirmed via a "Salvar" button. |

### 3. Touch Target & Physical Ergonomics (WCAG 2.2 Criterion 2.5.8)
- Even for compact visual track sizes (`sm`: 36x20px, `md`: 48x26px), the interactive touch target is expanded to at least **44x44px** using a transparent pseudo-element (`.switch::before`).

### 4. Forced Colors Mode / Windows High Contrast
- Implements `@media (forced-colors: active)` utilizing CSS system color keywords (`ButtonText`, `Highlight`, `HighlightText`) to guarantee that the track, thumb, and focus rings remain visible when custom backgrounds are stripped by the operating system.

---

## 📦 TypeScript Interface (`SwitchProps`)

```typescript
export interface SwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

---

## 🛠️ Usage Example

```tsx
import { Switch } from "@/components";

export function AccessibilityCard() {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <Switch
      id="high-contrast-switch"
      checked={highContrast}
      onChange={setHighContrast}
      label="Alto Contraste Estrutural"
      description="Reforça bordas dos cartões sem causar clarão retiniano."
    />
  );
}
```

---

## ♿ Accessibility Checklist

- [x] Native `<button type="button">` element base.
- [x] Semantic `role="switch"` and dynamic `aria-checked`.
- [x] Full keyboard navigation: toggles with `Space` and `Enter` keys.
- [x] External label mapped via `<label htmlFor="...">` and `aria-labelledby`.
- [x] Description mapped via `aria-describedby`.
- [x] Touch target expanded to at least 44x44px via `.switch::before`.
- [x] Visible focus ring: `outline: 2px solid var(--color-brand-primary); outline-offset: 3px`.
- [x] Windows High Contrast support via `@media (forced-colors: active)`.
