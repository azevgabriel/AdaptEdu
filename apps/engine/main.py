from dotenv import load_dotenv
from fastapi import FastAPI

from version import __version__

load_dotenv()

app = FastAPI(
    title="AdaptEdu AI Engine",
    version=__version__,
)


@app.get("/")
async def home():
    return {
        "message": "AdaptEdu AI Engine is running!",
        "version": app.version,
    }
