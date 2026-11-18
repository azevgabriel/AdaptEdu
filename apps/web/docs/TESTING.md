# Testing Guide & Specifications — AdaptEdu Frontend

This document outlines the testing architecture, conventions, mock data strategies, and standards for the AdaptEdu web application (`apps/web/`).

---

## 🎯 Testing Stack & Core Philosophy

The AdaptEdu frontend relies on a modern, fast, and accessible testing stack:

- **Test Runner & Assertion Library:** [Vitest](https://vitest.dev/) (fast, native ESM, Vite/Next.js compatible).
- **DOM Testing & Component Interaction:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (`@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom`).
- **Realistic Synthetic Mocking:** [@faker-js/faker](https://fakerjs.dev/) with Brazilian Portuguese locale (`fakerPT_BR`).

### 🛡️ Non-Negotiable Rules (AGENTS.md)

1. **LGPD & Data Privacy:** Never use real names, CPF/RG documents, or genuine medical/psychological records in test fixtures, mocks, or assertions. All mock data **MUST** be dynamically generated or synthetically mocked using `@faker-js/faker`.
2. **Language Separation:**
   - **Test code, test descriptions, suite names (`describe`, `it`), mocks, and assertions:** Strictly in **English**.
   - **Rendered UI labels, button names, headings, accessibility labels, and expected user strings:** Strictly in **Brazilian Portuguese (PT-BR)**.
3. **Co-location Standard:** Component test files are **ALWAYS** co-located inside the component folder as `index.spec.tsx`.

---

## 📁 File Structure & Naming Standard

Component tests are co-located directly with the component source code:

```
src/components/header/
├── index.tsx          # Component implementation
├── index.spec.tsx     # ✅ Vitest + RTL test file (ALWAYS index.spec.tsx)
└── index.module.css   # Component styles
```

### File Naming Conventions:
- **Components:** `src/components/<kebab-case-name>/index.spec.tsx`
- **Custom Hooks:** `src/hooks/use-<name>.spec.ts`
- **Utility Functions:** `src/utils/<name>.spec.ts`

---

## 📦 Required Dependencies & Scripts

### Installation
```bash
npm install -D vitest@^3.0.0 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @faker-js/faker
```

### Recommended Scripts (`apps/web/package.json`)
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Configuration Files

#### 1. `vitest.config.ts` (located at `apps/web/vitest.config.ts`)
```typescript
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.spec.{ts,tsx}", "src/types/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

#### 2. `vitest.setup.ts` (located at `apps/web/vitest.setup.ts`)
```typescript
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock Next.js navigation hooks by default
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/minha_sala",
  useSearchParams: () => new URLSearchParams(),
}));
```

---

## 🎭 Realistic Mocking with `@faker-js/faker`

To mirror real Brazilian public school environments and test against dynamic text lengths, special characters, and edge cases, use `@faker-js/faker` configured with the Brazilian Portuguese locale:

```typescript
import { fakerPT_BR as faker } from "@faker-js/faker";
```

### Mock Factories Pattern

Create reusable mock generators (located in `src/test/factories/` or directly inside the test file when component-specific):

```typescript
// src/test/factories/teacher.factory.ts
import { fakerPT_BR as faker } from "@faker-js/faker";

export interface TeacherMock {
  name: string;
  email: string;
  role: string;
  school: string;
  avatarUrl?: string;
}

export function createMockTeacher(overrides?: Partial<TeacherMock>): TeacherMock {
  return {
    name: `Profª. ${faker.person.fullName()}`,
    email: faker.internet.email().toLowerCase(),
    role: "Educadora de Apoio",
    school: `E.E. ${faker.person.lastName()} • Fundamental II`,
    avatarUrl: faker.image.avatar(),
    ...overrides,
  };
}
```

```typescript
// src/test/factories/student.factory.ts
import { fakerPT_BR as faker } from "@faker-js/faker";

export interface StudentMock {
  id: string;
  name: string;
  age: number;
  grade: string;
  neurodiversity: "TEA" | "TDAH" | "Dislexia" | "Discalculia" | "Altas Habilidades";
  sensoryAccommodations: string[];
}

export function createMockStudent(overrides?: Partial<StudentMock>): StudentMock {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 6, max: 15 }),
    grade: `${faker.number.int({ min: 1, max: 9 })}º Ano`,
    neurodiversity: faker.helpers.arrayElement([
      "TEA",
      "TDAH",
      "Dislexia",
      "Discalculia",
      "Altas Habilidades",
    ]),
    sensoryAccommodations: [
      "Assento frontal longe de janelas",
      "Pausas cognitivas a cada 20 minutos",
      "Material visual ampliado com fonte Inter",
    ],
    ...overrides,
  };
}
```

---

## 💡 Best Practices for Writing Tests

### 1. Accessibility-First Queries
Follow the [Testing Library Priority Guide](https://testing-library.com/docs/queries/about/#priority):
1. **`getByRole`**: Accessible name queries (`getByRole('button', { name: /sair/i })`).
2. **`getByLabelText`**: Form inputs associated with `<label>`.
3. **`getByText`**: Non-interactive text content (headings, paragraphs).
4. Avoid `getByTestId` unless an accessible query is impossible.

### 2. User Interactions with `@testing-library/user-event`
Always use `userEvent.setup()` instead of deprecated `fireEvent` to accurately simulate keyboard events, focus changes, and pointer events:
```typescript
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: /abrir menu/i }));
```

### 3. Clear Test Naming Convention
- Suite description: Name of the component or module.
- Spec statement: Active verb describing expected behavior in English (`renders...`, `toggles...`, `calls onLogout when...`).
- Displayed assertions: Brazilian Portuguese text matches the rendered UI.

---

## 🔍 Concrete Example: `Header` Component Test

Below is the official specification for `/src/components/header/index.spec.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Header } from "./index";

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders brand logo and default section title in Portuguese", () => {
    render(<Header />);

    // Brand link with accessible name
    expect(
      screen.getByRole("link", { name: /adaptEdu - início da minha sala/i })
    ).toBeInTheDocument();

    // Default section name
    expect(screen.getByText("Minha Sala")).toBeInTheDocument();
  });

  it("renders custom section name when provided", () => {
    const customSection = "Planos de Aula Adaptados";
    render(<Header sectionName={customSection} />);

    expect(screen.getByText(customSection)).toBeInTheDocument();
  });

  it("displays synthetic teacher profile data generated by Faker", () => {
    const mockTeacher = {
      name: `Profª. ${faker.person.fullName()}`,
      email: faker.internet.email().toLowerCase(),
      role: "Especialista em Educação Especial",
      school: `E.M. ${faker.person.lastName()}`,
    };

    render(<Header teacher={mockTeacher} />);

    expect(screen.getByText(mockTeacher.name)).toBeInTheDocument();
    expect(screen.getByText(mockTeacher.role)).toBeInTheDocument();
  });

  it("opens and closes dropdown menu upon button click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /menu do usuário/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const menu = screen.getByRole("menu", {
      name: /opções de navegação do professor/i,
    });
    expect(menu).toBeInTheDocument();

    // Verify navigation options are rendered in Portuguese
    expect(
      screen.getByRole("menuitem", { name: /planos de aula adaptados/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /estudantes & adaptações/i })
    ).toBeInTheDocument();

    // Click again to close
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes dropdown menu when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /menu do usuário/i });
    await user.click(menuButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("triggers onLogout callback when logout button is clicked", async () => {
    const user = userEvent.setup();
    const handleLogout = vi.fn();

    render(<Header onLogout={handleLogout} />);

    // Open menu
    await user.click(screen.getByRole("button", { name: /menu do usuário/i }));

    // Click logout
    const logoutButton = screen.getByRole("menuitem", { name: /sair da conta/i });
    await user.click(logoutButton);

    expect(handleLogout).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
```

---

## 🔗 Related Documentation

- [apps/web/docs/GLOBAL.md](apps/web/docs/GLOBAL.md): Frontend Architecture Index.
- [apps/web/docs/skills/component-a11y-audit](apps/web/docs/skills/component-a11y-audit/SKILL.md): Component A11y Audit & Unit Test Generator.
- [apps/web/docs/ACCESSIBILITY.md](apps/web/docs/ACCESSIBILITY.md): Universal Design, WAI-ARIA & Inclusive Components.
- [apps/web/docs/COLORS.md](apps/web/docs/COLORS.md): Interface & Pedagogical Color System & Tokens.
- [apps/web/docs/FONTS.md](apps/web/docs/FONTS.md): Typography & Cognitive Reading System.

