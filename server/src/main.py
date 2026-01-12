from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

# =========================
# DATABASE
# =========================
from src.database.core import Base, engine

# =========================
# AUTH & USERS ROUTERS
# =========================
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router
from src.users.models import User
from src.auth.service import hash_password

# =========================
# ADMIN DASHBOARD & OTHER ROUTERS
# =========================
from src.admin.dashboard import router as admin_dashboard_router
from src.dashboard.router import router as dashboard_router
from src.admin.investigations import router as investigation_router

app = FastAPI(title="Insurance CRC Assistant")

# =========================
# CORS CONFIG
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
# STATIC FILES
# =========================
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# =========================
# DATABASE INIT
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# REGISTER ROUTERS
# =========================
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(admin_dashboard_router)
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(investigation_router)

# =========================
# RECOMMENDATION ROUTERS (SAFE LOAD)
# =========================
try:
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

except Exception as e:
    print("⚠️ Recommendation modules not loaded:", e)

# =========================
# CREATE ADMIN ON STARTUP
# =========================
@app.on_event("startup")
def create_admin():
    db = Session(bind=engine)
    admin_email = "admin@insurance.com"
    admin = db.query(User).filter(User.email == admin_email).first()

    if not admin:
        admin = User(
            email=admin_email,
            hashed_password=hash_password("admin123"),
            role="ADMIN",
        )
        db.add(admin)
        db.commit()
        print("✅ Admin user created")
    db.close()

# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {"status": "Insurance CRC Assistant API running"}
