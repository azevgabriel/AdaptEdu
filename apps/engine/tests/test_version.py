import sys
from pathlib import Path
from unittest.mock import mock_open, patch

from version import __version__, get_version


def test_get_version_current():
    assert __version__ == "1.1.0"
    assert get_version() == "1.1.0"


def test_get_version_file_not_found():
    with patch.object(Path, "exists", return_value=False):
        assert get_version() == "1.1.0"


def test_get_version_python_311_tomllib():
    fake_toml_data = {"project": {"version": "1.1.0"}}
    mock_tomllib = type("MockTomllib", (), {"load": lambda f: fake_toml_data})
    with (
        patch.object(sys, "version_info", (3, 11, 0)),
        patch.dict(sys.modules, {"tomllib": mock_tomllib}),
        patch("builtins.open", mock_open()),
    ):
        assert get_version() == "1.1.0"


def test_get_version_python_311_tomllib_exception():
    with (
        patch.object(sys, "version_info", (3, 11, 0)),
        patch.dict(sys.modules, {"tomllib": None}),
    ):
        assert get_version() == "1.1.0"


def test_get_version_fallback_regex():
    fake_toml = 'version = "1.1.0"\nname = "adapt-edu-engine"\n'
    with (
        patch.object(sys, "version_info", (3, 10, 0)),
        patch.object(Path, "exists", return_value=True),
        patch.object(Path, "read_text", return_value=fake_toml),
    ):
        assert get_version() == "1.1.0"


def test_get_version_fallback_exception():
    with (
        patch.object(sys, "version_info", (3, 10, 0)),
        patch.object(Path, "exists", return_value=True),
        patch.object(Path, "read_text", side_effect=Exception("Disk error")),
    ):
        assert get_version() == "1.1.0"
