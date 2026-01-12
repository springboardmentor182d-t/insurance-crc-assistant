import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from src.database.core import Base, engine

# Import models so tables are created
from src.claims.models import Claim, ClaimDocument
from src.users.models import User

# =========================
# ROUTERS
# =========================
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router
from src.claims.controller import router as claims_router

from src.auth.service import hash_password

# =========================
# APP INIT
# =========================
app = FastAPI(title="Insurance CRC Assistant")
# ================= LOAD ENV =================
load_dotenv()

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# ================= APP =================
app = FastAPI(
    title="Insurance CRC Assistant",
    servers=[{"url": BASE_URL}],  # ✅ mentor-required base_url
)

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://127.0.0.1:3000",  # ✅ safety for localhost variants
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# STATIC FILES (UPLOADS)
# =========================
# ================= STATIC FILES (AVATARS) =================
app.mount(
    "/media",
    StaticFiles(
        directory="src/policies_recommendations_profile_preferences/static/media"
    ),
    name="media",
)

# ================= DB =================
Base.metadata.create_all(bind=engine)

# =========================
# REGISTER ROUTERS
# =========================
app.include_router(auth_router)
app.include_router(users_router)

app.include_router(
    claims_router,
    prefix="/claims",
    tags=["Claims"]
)

# =========================
# RECOMMENDATION ROUTERS
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
# ================= AUTH =================
app.include_router(auth_router, prefix="/auth")
app.include_router(users_router, prefix="/users")

# ================= RECOMMENDATION ROUTERS =================
from src.policies_recommendations_profile_preferences.routers import (
    health_recommendation,
    life_recommendation,
    motor_recommendation,
    travel_recommendation,
    home_recommendation,
    fire_recommendation,
    business_recommendation,
)

app.include_router(health_recommendation.router, prefix="/recommendations/health")
app.include_router(life_recommendation.router, prefix="/recommendations/life")
app.include_router(motor_recommendation.router, prefix="/recommendations/motor")
app.include_router(travel_recommendation.router, prefix="/recommendations/travel")
app.include_router(home_recommendation.router, prefix="/recommendations/home")
app.include_router(fire_recommendation.router, prefix="/recommendations/fire")
app.include_router(business_recommendation.router, prefix="/recommendations/business")

# ================= POLICY CATALOG =================
from src.policies_recommendations_profile_preferences.routers.policy_catalog import (
    router as policy_catalog_router,
)

app.include_router(policy_catalog_router)

# ================= POLICY DETAILS =================
from src.policies_recommendations_profile_preferences.routers.health_policy import (
    router as health_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.motor_policy import (
    router as motor_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.life_policy import (
    router as life_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.home_policy import (
    router as home_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.travel_policy import (
    router as travel_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.fire_policy import (
    router as fire_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.business_policy import (
    router as business_policy_router,
)
from src.policies_recommendations_profile_preferences.routers.profile import (
    router as profile_router,
)

app.include_router(health_policy_router)
app.include_router(motor_policy_router)
app.include_router(life_policy_router)
app.include_router(home_policy_router)
app.include_router(travel_policy_router)
app.include_router(fire_policy_router)
app.include_router(business_policy_router)
app.include_router(profile_router)

from src.policies_recommendations_profile_preferences.routers.recommendations import (
    router as recommendations_router
)

app.include_router(recommendations_router)

# ================= ADMIN AUTO CREATE =================
@app.on_event("startup")
def create_admin():
    db = Session(bind=engine)
    admin_email = "admin@insurance.com"
    admin = db.query(User).filter(User.email == admin_email).first()

    if admin is None:
        admin = User(
            email=admin_email,
            hashed_password=hash_password("admin123"),
            role="ADMIN",

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

# ================= ROOT =================
@app.get("/")
def root():
    return {
        "status": "Insurance CRC Assistant API running",
        "base_url": BASE_URL,
    }
