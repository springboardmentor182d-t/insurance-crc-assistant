from fastapi import FastAPI
from src.database.core import engine, Base
from src.policy.routes.policy import router as policy_router
from fastapi.middleware.cors import CORSMiddleware
from src.api import api_router 

app = FastAPI(title="Insurance CRC Assistant API")

app = FastAPI(title="Insurance Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/test")
def test():
    return {"message": "Hello from FastAPI"}
