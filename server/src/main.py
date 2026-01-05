from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

# =========================
# DATABASE
# =========================
from src.database.core import Base, engine

# =========================
# AUTH / API
# =========================
from src.api import api_router
from src.users.models import User
from src.auth.service import hash_password

# =========================
# RECOMMENDATION ROUTERS
# =========================
from src.recommendations_profile_preferences.routers import (
    profile,
    recommendations,

    health_progress,
    HealthRecommendation,

    life_progress,
    LifeRecommendation,

    motor_progress,
    MotorRecommendation,

    property_progress,
    PropertyRecommendation,

    travel_progress,
    TravelRecommendation,

    fire_progress,
    FireRecommendation,

    business_progress,
    BusinessRecommendation,
)

# =========================
# CREATE FASTAPI APP
# =========================
app = FastAPI(title="Insurance CRC Assistant")

# =========================
# CORS CONFIGURATION
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
# STATIC FILES (UPLOADS)
# =========================
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# =========================
# DATABASE INIT
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# REGISTER AUTH ROUTERS
# =========================
app.include_router(api_router)

# =========================
# REGISTER RECOMMENDATION ROUTERS
# =========================
app.include_router(profile.router)
app.include_router(recommendations.router)

app.include_router(health_progress.router)
app.include_router(HealthRecommendation.router)

app.include_router(life_progress.router)
app.include_router(LifeRecommendation.router)

app.include_router(motor_progress.router)
app.include_router(MotorRecommendation.router)

app.include_router(property_progress.router)
app.include_router(PropertyRecommendation.router)

app.include_router(travel_progress.router)
app.include_router(TravelRecommendation.router)

app.include_router(fire_progress.router)
app.include_router(FireRecommendation.router)

app.include_router(business_progress.router)
app.include_router(BusinessRecommendation.router)

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
# ROOT ENDPOINT
# =========================
@app.get("/")
def root():
    return {"status": "Insurance CRC Assistant API running"}
