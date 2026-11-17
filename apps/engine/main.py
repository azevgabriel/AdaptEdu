from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="AdaptEdu AI Engine",
    version="1.0.0"
)

@app.get("/")
async def home():
    return {
        "message": "AdaptEdu AI Engine is running!"
    }