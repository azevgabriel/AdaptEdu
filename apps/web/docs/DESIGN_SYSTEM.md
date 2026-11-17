# Design System & Component Catalog — AdaptEdu Frontend

This document establishes the official **Design System Component Catalog** for AdaptEdu (`apps/web/`). It catalogs all shared and route-level UI components available in the codebase, detailing their props, accessibility implementations, behavioral states, and code patterns to ensure maximum reusability and prevent UI duplication.

---

## 🎯 Architecture & Guiding Principles

AdaptEdu is designed to empower Brazilian public school teachers to include neurodivergent students (autism spectrum, ADHD, dyslexia, dyscalculia, Tourette syndrome, and color vision deficiencies). Every component in this design system adheres to these foundational principles:

1. **Reusability & Single Responsibility:** Common elements (such as application headers, footers, and authentication buttons) live in `src/components/` and are re-exported through the central barrel (`src/components/index.ts`). Avoid recreating local copies of headers, navigation bars, or buttons across pages.
2. **Context-Adaptive States:** Global components are designed to adapt cleanly between authenticated and unauthenticated contexts. For example, `Header` supports an unauthenticated public mode (`showProfile={false}`) that conceals teacher profile dropdowns while keeping theme and accessibility controls active.
3. **Accessibility by Default (a11y):** All components comply with **WCAG 2.1 AA** (striving for AAA on text contrast), supporting screen readers (semantic HTML, descriptive ARIA attributes), full keyboard navigation (focus rings, `Escape` key listeners, outside click dismissals), and user-controlled sensory accommodations (contrast reinforcement, dyslexic spacing, font scaling, CVD modes, reduced motion).
4. **Standard Component Anatomy:** Every global component strictly follows the co-located directory structure established in [NAMING_CONVENTIONS.md](apps/web/docs/NAMING_CONVENTIONS.md):
   ```
   src/components/<component-name>/
   ├── index.tsx          # Main React component & TypeScript interfaces
   ├── index.spec.tsx     # Co-located unit/integration tests (Vitest + Testing Library)
   └── index.module.css   # Component-scoped CSS Module
   ```
5. **Language Separation:** Source code, component identifiers, docstrings, and technical documentation are written in **English**. All user-facing UI labels, badges, buttons, tooltips, and ARIA text are written strictly in **Brazilian Portuguese (PT-BR)**.

---

## 📦 Global Shared Components (`src/components/`)

All global components can be imported either from the root components barrel (`@/components`) or from their specific component paths (`@/components/<component-name>`).

```typescript
import { Header, Footer, GoogleSignInButton, Avatar } from "@/components";
```

---

### 1. `Header`

- **Directory:** `src/components/header/`
- **Component File:** `src/components/header/index.tsx`
- **Style File:** `src/components/header/index.module.css`
- **Test File:** `src/components/header/index.spec.tsx`
- **Barrel Export:** `export * from "./header";` in `src/components/index.ts`

#### Overview
The `Header` is the primary top navigation component for AdaptEdu. It features the brand logo, an optional section indicator badge, quick theme toggling (dark/light), an extensive visual/sensory accessibility popover, and an interactive teacher profile menu with navigation links and logout functionality.

When users are not logged in (e.g., on `/login` or public landing pages), the component seamlessly adapts via the `showProfile={false}` prop, omitting the user profile button, avatar, and dropdown menu while preserving accessibility controls and brand navigation.

#### Component Props (`HeaderProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sectionName` | `string` | `"Minha Sala"` (when `showProfile=true`), `undefined` (when `showProfile=false`) | Active section title displayed in the header badge next to the brand logo. |
| `teacher` | `TeacherProfile` | `DEFAULT_TEACHER` (`Profª Ana Silva`) | Teacher profile details (`name`, `email`, `role`, `school`, `avatarUrl`) for initials and dropdown. |
| `showProfile` | `boolean` | `true` | When `false`, hides the teacher profile trigger button, avatar, divider, and dropdown menu. **Use this on public or login pages.** |
| `brandHref` | `string` | `showProfile ? "/minha_sala" : "/"` | Destination URL when clicking the brand logo. |
| `brandAriaLabel` | `string` | `showProfile ? "AdaptEdu - Início da Minha Sala" : "AdaptEdu - Página Inicial"` | Accessible ARIA label for screen readers on the brand logo link. |
| `onLogout` | `() => void` | `router.push("/")` | Optional callback triggered when the user clicks the "Sair da conta" action. |

#### Integrated Accessibility & Visual Accommodations
The `Header` houses the platform's central accessibility trigger button. Clicking it opens a modal dialog allowing educators and students to customize:
- **Interface Theme:** Quick toggle or explicit selection between Light Mode and Dark Mode.
- **Color Vision Deficiencies (Daltonismo):** Universal Chromatic, Deuteranopia, Protanopia, Tritanopia, and Achromatopsia (monochromatic high-contrast).
- **Text Scaling:** Normal (100%), Large (+15%), and Extra Large (+30%).
- **Dyslexia / ADHD Letter Spacing:** Enhanced letter, word, and line spacing to eliminate visual crowding.
- **High Contrast:** Reinforced borders and solid outline contrasts.
- **Reduced Motion:** Disables non-essential layout animations and transitions.
- **Reset:** One-click restoration of system defaults.

#### Usage Examples

##### A. Authenticated Classroom Layout (`showProfile={true}`)
```tsx
import { Header } from "@/components";
import { useAuth } from "@/contexts/auth-context";

export function ClassroomHeader() {
  const { user, signOut } = useAuth();

  return (
    <Header
      sectionName="Minha Sala"
      teacher={user ? {
        name: user.name,
        email: user.email,
        role: user.role === "TEACHER" ? "Educadora" : user.role,
        school: user.school || "Rede Pública de Ensino",
        avatarUrl: user.avatarUrl || undefined,
      } : undefined}
      onLogout={signOut}
    />
  );
}
```

##### B. Unauthenticated Login Page (`showProfile={false}`)
```tsx
import { Header } from "@/components";

export default function LoginPage() {
  return (
    <div>
      {/* Shared Header adapted for unauthenticated view */}
      <Header
        showProfile={false}
        sectionName="Apoio à Escola Pública"
      />
      <main>...</main>
    </div>
  );
}
```

---

### 2. `Footer`

- **Directory:** `src/components/footer/`
- **Component File:** `src/components/footer/index.tsx`
- **Style File:** `src/components/footer/index.module.css`
- **Test File:** `src/components/footer/index.spec.tsx`
- **Barrel Export:** `export * from "./footer";` in `src/components/index.ts`

#### Overview
The `Footer` provides an accessible, standardized footer for the application. It highlights the open-source mission supporting Brazilian public school teachers and links to the GitHub repository and lead developer profile.

#### Component Props (`FooterProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `githubUrl` | `string` | `"https://github.com/azevgabriel/AdaptEdu"` | URL for the open-source GitHub repository. |
| `linkedinUrl` | `string` | `"https://www.linkedin.com/in/azevgabriel/"` | URL for the developer's LinkedIn profile. |
| `className` | `string` | `undefined` | Optional additional CSS class for layout positioning. |

#### Usage Example
```tsx
import { Footer } from "@/components";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layoutContainer">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

---

### 3. `GoogleSignInButton`

- **Directory:** `src/components/google-sign-in-button/`
- **Component File:** `src/components/google-sign-in-button/index.tsx`
- **Style File:** `src/components/google-sign-in-button/index.module.css`
- **Test File:** `src/components/google-sign-in-button/index.spec.tsx`
- **Barrel Export:** `export * from "./google-sign-in-button";` in `src/components/index.ts`

#### Overview
The `GoogleSignInButton` is the standardized authentication trigger component for institutional and personal Google Single Sign-On (OAuth2). It renders the official Google 4-color SVG logo, handles return redirect URLs, and supports programmatic dispatch or customized click handlers.

#### Component Props (`GoogleSignInButtonProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `returnUrl` | `string` | `"/minha-sala"` | The destination path to redirect to after successful authentication. |
| `apiUrl` | `string` | `process.env.NEXT_PUBLIC_API_URL` or `"http://localhost:3000"` | Base URL of the NestJS backend API. |
| `onSignIn` | `() => void` | `undefined` | Custom click override handler (primarily for tests or custom flow orchestration). |
| `disabled` | `boolean` | `false` | Disables the button and prevents click actions. |
| `className` | `string` | `undefined` | Optional additional CSS class name. |

#### Usage Example
```tsx
import { GoogleSignInButton } from "@/components";

export function AuthCard() {
  return (
    <div className="authCard">
      <h2>Acesso do Educador</h2>
      <GoogleSignInButton returnUrl="/minha-sala" />
    </div>
  );
}
```

---

### 4. `Avatar`

- **Directory:** `src/components/avatar/`
- **Component File:** `src/components/avatar/index.tsx`
- **Style File:** `src/components/avatar/index.module.css`
- **Test File:** `src/components/avatar/index.spec.tsx`
- **Barrel Export:** `export * from "./avatar";` in `src/components/index.ts`

#### Overview
The `Avatar` component displays a user profile photo with a robust, multi-tier fallback mechanism. When an image URL is unavailable, empty, or fails to load, it automatically generates clean, accessible uppercase initials (intelligently stripping teacher honorifics such as *Profª.* or *Professor*). If neither photo nor name is available, it gracefully renders an accessible SVG user silhouette icon. It also supports optional presence status indicators (`online`, `offline`, `busy`, `away`).

#### Component Props (`AvatarProps`)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string \| null` | `undefined` | Source image URL for the avatar picture. |
| `alt` | `string` | `"Foto de perfil de <name>"` / `"Foto de perfil do usuário"` | Accessible alternative text. |
| `name` | `string` | `undefined` | Full user name to generate initials from. |
| `initials` | `string` | `undefined` | Explicit custom initials override. |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` (36px) | Avatar size variant (`sm`: 28px, `md`: 36px, `lg`: 48px, `xl`: 64px). |
| `status` | `AvatarStatus \| boolean` | `undefined` | Optional presence status dot (`online`, `offline`, `busy`, `away` or boolean `true`). |
| `statusLabel` | `string` | `undefined` | Accessible label for the presence indicator (e.g., `"Online"`). |
| `className` | `string` | `""` | Optional additional CSS classes. |

#### Usage Examples

```tsx
import { Avatar } from "@/components";

// With image and online status
<Avatar src="https://example.com/avatar.jpg" name="Profª Ana Silva" status="online" size="md" />

// Fallback to initials ("RL") when image is missing or fails
<Avatar name="Roberta Lima" size="lg" />

// Fallback to SVG user silhouette icon when name is absent
<Avatar size="sm" />
```

---

## 🧭 Route-Scoped Internal Components (`src/app/**/components/`)

Components that are specific to a single route segment are organized in sub-directories within that route to keep the global `src/components/` namespace lean.

### 1. `LoginAuthCard`
- **Location:** `src/app/login/components/login-auth-card/`
- **Barrel Export:** `src/app/login/components/index.ts`
- **Role:** Presents the authentication form card on `/login`. Reads query parameters (such as `?error=` or `?returnUrl=`), displays contextual alerts for educators in PT-BR, and embeds `GoogleSignInButton`.

### 2. `ClassroomHeader`
- **Location:** `src/app/minha-sala/components/classroom-header/`
- **Barrel Export:** `src/app/minha-sala/components/index.ts`
- **Role:** Connects the global `Header` component with the client-side `useAuth()` hook, translating the authenticated `user` session into the `teacher` profile structure and routing `signOut` to `onLogout`.

---

## 🎨 Foundations & Tokens

The Design System is built upon a cohesive set of CSS custom properties defined in `src/app/globals.css` and detailed across the specialized specification documents:

### 1. Color Palette & Accessibility (`COLORS.md`)
- **System Surfaces & Text:** `--bg-canvas`, `--bg-surface`, `--bg-subtle`, `--text-primary`, `--text-secondary`, `--text-muted`.
- **Brand Tokens:** `--color-brand-primary` (`#4338CA`), `--color-brand-surface` (`#EEF2FF`), `--color-brand-border` (`#A5B4FC`), `--color-brand-text` (`#312E81`).
- **Pedagogical Color Code:** Dedicated subject tokens (Portuguese, Math, History, Geography, Sciences, Arts, Physical Education, English) fulfilling the "Never Color Alone" rule with fixed chromatic associations.
- **Specification:** [COLORS.md](apps/web/docs/COLORS.md).

### 2. Typography & Hierarchy (`FONTS.md`)
- **Headings Font:** `Nunito` (`--font-family-headings`), friendly rounded sans-serif minimizing reading friction.
- **Body & Interface Font:** `Inter` (`--font-family-body`), tall x-height and open apertures ensuring high legibility on low-resolution displays.
- **Typographic Scale:** Ranging from `0.75rem` (`12px`) up to `2.5rem` (`40px`), with responsive line-height ratios preventing sensory overcrowding.
- **Specification:** [FONTS.md](apps/web/docs/FONTS.md).

### 3. Spatial SVG Classroom Assets
Located in `src/assets/elements/`:
- `blackboard.svg`: Classroom chalkboard / interactive teaching board illustration.
- `school_seat.svg`: Student desk / classroom chair unit for spatial seating charts.
- `teachers_desk.svg`: Educator workstation illustration.
- `plant.svg`: Sensory calm classroom environment decor.

### 4. Custom Hook: `useAccessibility`
Located in `src/hooks/use-accessibility.ts`:
- Exposes states and setters for `theme`, `cvdMode`, `fontSize`, `dyslexiaFont`, `highContrast`, `reducedMotion`, and `resetSettings`.
- Synchronizes with `localStorage` and toggles DOM data attributes on `document.documentElement` (`data-theme`, `data-cvd`, `data-font-size`, `data-dyslexia`, `data-high-contrast`, `data-reduced-motion`).

---

## 🛠️ How to Add a New Reusable Component

Before creating a new UI component, follow this checklist to maintain design system consistency:

1. **Verify Existing Inventory:** Check this document and `src/components/` to see if an existing component can fulfill the requirement via props (e.g., configuring `showProfile={false}` on `Header` instead of writing a separate navbar).
2. **Determine Scope:**
   - If used in two or more routes $\rightarrow$ place in `src/components/<kebab-case-name>/`.
   - If used exclusively in one route $\rightarrow$ place in `src/app/<route>/components/<kebab-case-name>/`.
3. **Create the Standard File Structure:**
   - `index.tsx`: Component code, typed props interface exported as `<ComponentName>Props`.
   - `index.module.css`: Scoped CSS Module styling using `camelCase` selector names and system design tokens (`var(--...)`).
   - `index.spec.tsx`: Co-located Vitest test suite with `@testing-library/react` and synthetic data via `@faker-js/faker`.
4. **Export in Barrel:** Re-export in `src/components/index.ts` (or the route's `components/index.ts`).
5. **Update This Catalog:** Add the component's specification, props table, and usage examples to this `DESIGN_SYSTEM.md` file.

---

## 🔗 Related Documentation

- [GLOBAL.md](apps/web/docs/GLOBAL.md): Global frontend entry point and architecture index.
- [NAMING_CONVENTIONS.md](apps/web/docs/NAMING_CONVENTIONS.md): Code standards, file structure, and identifier rules.
- [COLORS.md](apps/web/docs/COLORS.md): Complete interface and pedagogical color code specifications.
- [FONTS.md](apps/web/docs/FONTS.md): Typography scale, dual-font hierarchy, and dyslexia accommodations.
- [TESTING.md](apps/web/docs/TESTING.md): Vitest testing patterns, synthetic data rules, and LGPD compliance.
- [AGENTS.md](AGENTS.md): Monorepo global invariants, language boundaries, and security rules.
