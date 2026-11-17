import re
import sys
from pathlib import Path


def get_version() -> str:
    """Reads the application version from pyproject.toml."""
    pyproject_path = Path(__file__).resolve().parent / "pyproject.toml"
    if not pyproject_path.exists():
        return "1.1.0"

    # In Python 3.11+, tomllib is available in the standard library
    if sys.version_info >= (3, 11):
        try:
            import tomllib

            with open(pyproject_path, "rb") as f:
                data = tomllib.load(f)
                return str(data.get("project", {}).get("version", "1.0.0"))
        except Exception:
            pass

    # Fallback parser for environments without tomllib (e.g. Python < 3.11)
    try:
        content = pyproject_path.read_text(encoding="utf-8")
        match = re.search(
            r'^version\s*=\s*["\']([^"\']+)["\']', content, re.MULTILINE
        )
        if match:
            return match.group(1)
    except Exception:
        pass

    return "1.1.0"


__version__ = get_version()
