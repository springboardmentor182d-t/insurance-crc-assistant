import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

# ================= LOAD ENV =================
load_dotenv()

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# ================= CREATE REQUIRED DIRECTORIES =================
MEDIA_DIR = "policies_recommendations_profile_preferences/static/media"
UPLOAD_DIR = "uploads"

os.makedirs(MEDIA_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ================= DB =================
from database.core import Base, engine
from users.models import User
from auth.service import hash_password

# ================= APP INIT =================
app = FastAPI(
    title="Insurance CRC Assistant",
    servers=[{"url": BASE_URL}],
)

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

# ================= STATIC FILES =================
app.mount(
    "/media",
    StaticFiles(directory=MEDIA_DIR),
    name="media",
)

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads",
)

# ================= ROUTERS =================
from auth.routes.auth_routes import router as auth_router
from auth.routes.auth_otp_routes import router as register_otp_router
from auth.routes.forgot_password import router as forgot_password_router

from users.controller import router as users_router
from claims.controller import router as claims_router
from api import api_router
from policy.routes.policy import router as policy_router

# Recommendations
from policies_recommendations_profile_preferences.routers import (
    health_recommendation,
    life_recommendation,
    motor_recommendation,
    travel_recommendation,
    home_recommendation,
    fire_recommendation,
    business_recommendation,
    profile,
    recommendations,
)

# ================= DB INIT =================
Base.metadata.create_all(bind=engine)

# ================= INCLUDE ROUTERS =================
app.include_router(auth_router, prefix="/auth")
app.include_router(register_otp_router)
app.include_router(forgot_password_router)

app.include_router(users_router, prefix="/users")
app.include_router(claims_router, prefix="/claims", tags=["Claims"])

app.include_router(api_router, prefix="/api", tags=["internal"])
app.include_router(policy_router, prefix="/policies", tags=["policies"])

# ================= RECOMMENDATIONS =================
app.include_router(profile.router)
app.include_router(recommendations.router)

app.include_router(health_recommendation.router, prefix="/recommendations/health")
app.include_router(life_recommendation.router, prefix="/recommendations/life")
app.include_router(motor_recommendation.router, prefix="/recommendations/motor")
app.include_router(travel_recommendation.router, prefix="/recommendations/travel")
app.include_router(home_recommendation.router, prefix="/recommendations/home")
app.include_router(fire_recommendation.router, prefix="/recommendations/fire")
app.include_router(business_recommendation.router, prefix="/recommendations/business")

# ================= ADMIN AUTO CREATE =================
@app.on_event("startup")
def create_admin():
    db = Session(bind=engine)
    admin_email = "admin@insurance.com"

    if not db.query(User).filter(User.email == admin_email).first():
        db.add(
            User(
                email=admin_email,
                hashed_password=hash_password("admin123"),
                role="ADMIN",
            )
        )
        db.commit()

    db.close()

# ================= HEALTH =================
@app.get("/")
def root():
    return {
        "status": "Insurance CRC Assistant API running",
        "base_url": BASE_URL,
    }

@app.get("/health")
def health():
    return {"status": "ok"}
