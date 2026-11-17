# Code Standards & Naming Conventions — AdaptEdu Frontend

This document establishes the official code organization patterns, file structure rules, and naming conventions for the AdaptEdu web application (`apps/web/`). Adhering strictly to these standards ensures consistency, maintainability, and effortless navigation for both developers and autonomous coding agents.

---

## 🎯 Core Principles & Language Rules

As established in the repository's root [`AGENTS.md`](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/AGENTS.md) and [`GLOBAL.md`](file:///Users/azevgabriel/Desktop/GitHub/Pessoais/AdaptEdu/apps/web/docs/GLOBAL.md):

1. **Code & Agent Instructions Language (English):**
   - All directory names, file names, source code, component identifiers, functions, variables, types, interfaces, test suites, docstrings, and commit messages **MUST** be written strictly in English.
2. **User-Facing Content (PT-BR):**
   - Brazilian public school educators are the primary end-users. All user-facing UI text, buttons, links, form validation messages, ARIA labels, and feedback alerts **MUST** be written strictly in Brazilian Portuguese (PT-BR).

---

## 📁 Directory Naming: Strict `kebab-case`

All directory names across `apps/web/` **MUST** be formatted in lowercase `kebab-case`. Never use `PascalCase`, `camelCase`, or `snake_case` for directory names.

```
apps/web/src/
├── app/
│   ├── minha-sala/                 # ✅ kebab-case route segment
│   │   ├── planos-aula/            # ✅ kebab-case nested route segment
│   │   └── estudantes/             # ✅ kebab-case nested route segment
├── components/
│   ├── header/                     # ✅ kebab-case component directory
│   ├── student-card/               # ✅ kebab-case component directory
│   └── classroom-grid/             # ✅ kebab-case component directory
├── hooks/                          # ✅ kebab-case directory
├── utils/                          # ✅ kebab-case directory
└── assets/
    └── elements/                   # ✅ kebab-case directory
```

### Prohibited Directory Patterns:
- ❌ `src/components/Header/` (PascalCase is forbidden for directories)
- ❌ `src/components/studentCard/` (camelCase is forbidden for directories)
- ❌ `src/app/minha_sala/` (snake_case is forbidden for directories; use `minha-sala`)

---

## 🧩 Component Directory Anatomy

Every UI component in `src/components/` lives inside its own dedicated directory named in `kebab-case`. The internal structure is strictly standardized:

```
src/components/header/
├── index.tsx          # Main component implementation & exported interfaces/props
├── index.spec.tsx     # Co-located unit & integration tests (Vitest + Faker.js)
└── index.module.css   # Component-scoped CSS Module
```

### Rules for Component Files:

| File | Standard Name | Purpose |
| :--- | :--- | :--- |
| **Component Entry** | `index.tsx` | Contains the React component, its TypeScript interface (`<ComponentName>Props`), and default export / named export. |
| **Test Suite** | `index.spec.tsx` | Co-located unit and integration tests written using Vitest, React Testing Library, and `@faker-js/faker`. |
| **Styles** | `index.module.css` | Scoped CSS Module styling. Class names inside must use `camelCase`. |

### Concrete Example: `Header` Component

Given a component named **Header**:
1. Directory path: `/src/components/header/` (lowercase `kebab-case`).
2. Component file: `/src/components/header/index.tsx`.
3. Test file: `/src/components/header/index.spec.tsx`.
4. Style file: `/src/components/header/index.module.css`.

#### Component Implementation (`src/components/header/index.tsx`)
```tsx
import React from "react";
import styles from "./index.module.css";

export interface HeaderProps {
  sectionName?: string;
  onLogout?: () => void;
}

export function Header({ sectionName = "Minha Sala", onLogout }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <span className={styles.sectionBadge}>{sectionName}</span>
      {/* User-facing text strictly in Brazilian Portuguese */}
      <button type="button" onClick={onLogout} aria-label="Sair da conta">
        Sair
      </button>
    </header>
  );
}
```

#### Test Suite (`src/components/header/index.spec.tsx`)
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./index";

describe("Header", () => {
  it("renders the active section name in Portuguese", () => {
    render(<Header sectionName="Minha Sala" />);
    expect(screen.getByText("Minha Sala")).toBeInTheDocument();
  });

  it("calls onLogout callback when logout button is clicked", async () => {
    const user = userEvent.setup();
    const handleLogout = vi.fn();

    render(<Header onLogout={handleLogout} />);
    const logoutBtn = screen.getByRole("button", { name: /sair/i });
    await user.click(logoutBtn);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
```

### Barrel Re-exports (`src/components/index.ts`)

To allow clean, ergonomic consumer imports, the central barrel file `src/components/index.ts` re-exports all components:

```typescript
// src/components/index.ts
export * from "./header";
export * from "./student-card";
```

Consumers can import either through the barrel or directly:
```typescript
import { Header } from "@/components";
// or
import { Header } from "@/components/header";
```

---

## 🏷️ Identifier Naming Conventions

| Category | Convention | Example | Notes |
| :--- | :--- | :--- | :--- |
| **Component Directories** | `kebab-case` | `header/`, `student-card/` | Co-located `index.tsx`, `index.spec.tsx`, `index.module.css`. |
| **React Components** | `PascalCase` | `Header`, `StudentCard` | Defined in `index.tsx`, exported by name. |
| **Component Props** | `PascalCase` + `Props` | `HeaderProps`, `StudentCardProps` | Exported alongside the component. |
| **TypeScript Types/Interfaces** | `PascalCase` | `TeacherProfile`, `StudentItem` | Descriptive English names. |
| **Custom Hooks** | `camelCase` (`use*`) | `useDisclosure`, `useStudentFilter` | File stored in `src/hooks/use-<name>.ts`. |
| **Helper Functions** | `camelCase` | `formatInitials`, `calculateRatio` | Pure functions, stored in `src/utils/`. |
| **Constants** | `UPPER_SNAKE_CASE` | `DEFAULT_TEACHER`, `MAX_ATTEMPTS` | Stored near usage or in `src/constants/`. |
| **CSS Module Classes** | `camelCase` | `.headerContainer`, `.brandLogo` | Avoid hyphens in CSS modules for clean JS property access. |
| **App Router Folders** | `kebab-case` | `app/minha-sala/`, `app/plano-aula/` | URL slugs match the folder name directly. |
| **App Router Special Files** | Next.js standard | `page.tsx`, `layout.tsx`, `loading.tsx` | Standard Next.js file conventions. |

---

## ⚠️ Anti-Patterns & Common Pitfalls

### 1. ❌ PascalCase Directories
```
// WRONG:
src/components/Header/Header.tsx
src/components/Header/Header.module.css

// CORRECT:
src/components/header/index.tsx
src/components/header/index.module.css
src/components/header/index.spec.tsx
```

### 2. ❌ Generic `test.tsx` or `<name>.spec.tsx` for Co-located Components
```
// WRONG:
src/components/header/Header.test.tsx
src/components/header/header.spec.tsx

// CORRECT:
src/components/header/index.spec.tsx
```

### 3. ❌ Snake_case in Next.js App Router
```
// WRONG:
src/app/minha_sala/page.tsx

// CORRECT:
src/app/minha-sala/page.tsx
```

### 4. ❌ Mixing Portuguese into Code Identifiers
```typescript
// WRONG:
const [nomeProfessor, setNomeProfessor] = useState("");
function salvarPlano() {}

// CORRECT:
const [teacherName, setTeacherName] = useState("");
function handleSavePlan() {}
```

### 5. ❌ Mixing English into User-Facing UI
```tsx
// WRONG:
<button type="submit">Save Changes</button>

// CORRECT (Brazilian Portuguese for public school teachers):
<button type="submit">Salvar alterações</button>
```

