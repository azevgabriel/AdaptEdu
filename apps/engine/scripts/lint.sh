#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

if [ -d "venv/bin" ]; then
  RUFF="venv/bin/ruff"
else
  RUFF="ruff"
fi

echo "Running Ruff linter on apps/engine..."
"$RUFF" check .

echo "Running Ruff format check on apps/engine..."
"$RUFF" format --check .

