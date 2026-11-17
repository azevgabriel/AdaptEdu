from fastapi.testclient import TestClient
from main import app
from version import __version__

client = TestClient(app)


def test_home_endpoint_returns_status_and_metadata():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "AdaptEdu AI Engine is running!"
    assert data["version"] == __version__
    assert data["version"] == "1.1.0"


def test_app_metadata():
    assert app.title == "AdaptEdu AI Engine"
    assert app.version == "1.1.0"

