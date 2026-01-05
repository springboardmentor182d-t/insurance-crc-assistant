from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.database.core import Base, engine
from src.api import api_router
from src.users.models import User
from src.auth.service import hash_password

# =========================
# CREATE FASTAPI APP
# =========================
app = FastAPI(title="Insurance CRC Assistant")

# =========================
# ✅ CORS CONFIGURATION (REQUIRED FOR REACT)
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DATABASE INIT
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# ROUTERS
# =========================
app.include_router(api_router)

# =========================
# CREATE ADMIN ON STARTUP
# =========================
@app.on_event("startup")
def create_admin():
    db = Session(bind=engine)

    admin_email = "admin@insurance.com"

    admin = db.query(User).filter(User.email == admin_email).first()

    if admin is None:
        admin = User(
            email=admin_email,
            hashed_password=hash_password("admin123"),
            role="ADMIN"
        )
        db.add(admin)
        db.commit()

    db.close()

# =========================
# ROOT ENDPOINT (OPTIONAL)
# =========================
@app.get("/")
def root():
    return {"status": "Insurance CRC Assistant API running"}
