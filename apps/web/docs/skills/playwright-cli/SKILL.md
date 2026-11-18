---
name: playwright-cli
description: Protocol for token-efficient browser inspection, accessibility tree verification, and interactive UI testing using Playwright CLI.
---

# Playwright CLI Skill (`playwright-cli`)

Use this skill when verifying web pages, component accessibility trees, keyboard navigation, and responsive visual states without flooding the agent context with verbose HTML markup.

Reference guide: [`apps/web/docs/PLAYWRIGHT_CLI.md`](apps/web/docs/PLAYWRIGHT_CLI.md).

---

## 🎯 Verification Loop

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ 1. Open Browser  │ ──> │ 2. Snapshot Tree │ ──> │ 3. Act on [ref]  │
│ playwright-cli   │     │ playwright-cli   │     │ playwright-cli   │
│ open <url>       │     │ snapshot         │     │ click/press <ref>│
└──────────────────┘     └──────────────────┘     └─────────┬────────┘
                                                            │
                                  ┌─────────────────────────┘
                                  ▼
                         ┌──────────────────┐     ┌──────────────────┐
                         │ 4. Verify State  │ ──> │ 5. Close Session │
                         │ playwright-cli   │     │ playwright-cli   │
                         │ snapshot / shot  │     │ close            │
                         └──────────────────┘     └──────────────────┘
```

## ⚡ Essential Commands

```bash
playwright-cli open <url>
playwright-cli snapshot
playwright-cli click <ref>
playwright-cli press <ArrowDown|ArrowUp|Home|End|Space|Enter|Escape>
playwright-cli type <ref> "<text>"
playwright-cli screenshot [file.png]
playwright-cli close
```
