#!/usr/bin/env bash
set -e

# Change to the apps/engine directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

# Use virtualenv python if available, otherwise system/environment python
if [ -d "venv/bin" ]; then
  PYTHON="venv/bin/python"
  PYTEST="venv/bin/pytest"
else
  PYTHON="python"
  PYTEST="pytest"
fi

echo "Running FastAPI tests in apps/engine..."
"$PYTEST" "$@"

