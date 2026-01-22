import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

# ================= LOAD ENV =================
load_dotenv()

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "https://splendid-twilight-7b79e4.netlify.app"
)

# ================= APP INIT =================
app = FastAPI(title="Insurance CRC Assistant")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= STATIC FILES (SAFE) =================
STATIC_PATH = "src/recommendations_profile_preferences/static"

if os.path.isdir(STATIC_PATH):
    app.mount(
        "/static",
        StaticFiles(directory=STATIC_PATH),
        name="static",
    )

# ================= DATABASE =================
from src.database.core import Base, engine

Base.metadata.create_all(bind=engine)

# ================= ROUTERS =================
from src.auth.controller import router as auth_router
from src.claims.controller import router as claims_router
from src.recommendations_profile_preferences.routers import (
    profile,
    dashboard,
)

# ================= INCLUDE ROUTERS =================
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(claims_router, prefix="/claims", tags=["Claims"])
app.include_router(profile.router, prefix="/profile", tags=["Profile"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

# ================= HEALTH =================
@app.get("/")
def root():
    return {"status": "Insurance CRC Assistant API running"}

@app.get("/health")
def health():
    return {"status": "ok"}

# ================= RENDER ENTRY =================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("src.main:app", host="0.0.0.0", port=port)
