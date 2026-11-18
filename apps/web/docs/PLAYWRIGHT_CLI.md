# Playwright CLI for Design System Verification

This document establishes the official **Playwright CLI (`playwright-cli`)** workflow and verification routines for the AdaptEdu web application (`apps/web/`).

---

## 🎯 Motivation & Why Playwright CLI

Traditional browser automation tools and Model Context Protocol (MCP) servers often return massive JSON payloads or hundreds of kilobytes of raw HTML/DOM trees. When loaded into an AI agent's context window, this creates severe **context drag**, degrades reasoning quality, and wastes token budget.

**Playwright CLI (`playwright-cli`)** solves this problem by providing a lean, command-driven terminal interface:
- **Token-Efficient Snapshots:** Inspects the live accessibility tree using compact, reference-based notation (`[ref=e1] button "Modo Claro"`).
- **Targeted Action via Refs:** Actions are executed against specific short references (`playwright-cli click e1`) without traversing bulky DOM paths.
- **Fast Interactive Verification:** Perfect for validating keyboard navigation (roving `tabIndex`), ARIA state toggles (`aria-checked`, `aria-pressed`), and visual contrast.

---

## 🛠️ Installation & Setup

### 1. Global Installation (Recommended)
```bash
npm install -g @playwright/cli@latest
```

Alternatively, invoke via `npx`:
```bash
npx @playwright/cli <command>
```

### 2. Browser Binaries Installation
```bash
playwright-cli install
```

---

## 💻 Core Command Reference

| Command | Usage | Description |
| :--- | :--- | :--- |
| **`open`** | `playwright-cli open <url>` | Launches a browser session and navigates to the target URL. |
| **`snapshot`** | `playwright-cli snapshot` | Captures a token-efficient text snapshot of the current accessibility tree with element refs. |
| **`click`** | `playwright-cli click <ref>` | Clicks the element referenced by `<ref>`. |
| **`press`** | `playwright-cli press <key>` | Simulates a keypress (`ArrowDown`, `ArrowUp`, `Home`, `End`, `Space`, `Enter`, `Escape`). |
| **`type`** | `playwright-cli type <ref> "<text>"` | Types string into the focused or referenced input element. |
| **`screenshot`** | `playwright-cli screenshot [file.png]` | Captures visual layout for multi-modal inspection or contrast checks. |
| **`close`** | `playwright-cli close` | Terminates the active browser session. |

---

## 🧪 Smoke Verification Routine for Design System Primitives

When building or refactoring interactive components (such as `RadioGroup`, `RadioCard`, `Switch`, or `Drawer`), run this lightweight smoke verification routine:

### Example: Testing `RadioGroup` Keyboard Cycling & Selection

```bash
# 1. Start local dev server in background
cd apps/web && npm run dev &

# 2. Open accessibility settings page
playwright-cli open http://localhost:3000/configuracoes/acessibilidade

# 3. Capture initial accessibility tree
playwright-cli snapshot
# Output:
# [ref=e1] radiogroup "Tema da interface"
#   [ref=e2] radio "Ativar Modo Claro" [checked] [tabindex=0]
#   [ref=e3] radio "Ativar Modo Escuro" [unchecked] [tabindex=-1]

# 4. Navigate using Arrow keys (cyclical roving tabindex)
playwright-cli click e2
playwright-cli press ArrowDown

# 5. Verify that focus and selection shifted to Modo Escuro
playwright-cli snapshot
# Output:
#   [ref=e2] radio "Ativar Modo Claro" [unchecked] [tabindex=-1]
#   [ref=e3] radio "Ativar Modo Escuro" [checked] [tabindex=0]

# 6. Verify wrap-around cycling
playwright-cli press ArrowDown
playwright-cli snapshot
# Output:
#   [ref=e2] radio "Ativar Modo Claro" [checked] [tabindex=0]

# 7. Take screenshot for visual validation & close session
playwright-cli screenshot .playwright/theme-selector-verified.png
playwright-cli close
```

---

## 🛡️ Best Practices for AI Coding Agents

1. **Avoid Raw HTML Dumps:** Never execute scripts that serialize `document.body.outerHTML` into agent messages. Always prefer `playwright-cli snapshot`.
2. **Step-by-Step Ref Interactivity:** After every `click` or `press` command that triggers state changes, run a quick `playwright-cli snapshot` to verify the new accessibility tree state before proceeding.
3. **Clean Session Teardown:** Always call `playwright-cli close` when finished to prevent orphaned headless browser processes.
