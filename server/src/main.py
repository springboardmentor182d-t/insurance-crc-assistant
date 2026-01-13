import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from src.database.core import Base, engine
from src.users.models import User
from src.auth.service import hash_password

# ================= LOAD ENV =================
load_dotenv()

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# ================= APP =================
app = FastAPI(
    title="Insurance CRC Assistant",
    servers=[{"url": BASE_URL}],
)

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= STATIC FILES =================
app.mount(
    "/media",
    StaticFiles(
        directory="src/policies_recommendations_profile_preferences/static/media"
    ),
    name="media",
)

# ================= DB =================
Base.metadata.create_all(bind=engine)

# ================= AUTH / USERS =================
from src.auth.controller import router as auth_router
from src.users.controller import router as users_router

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["Users"])

# ================= ADMIN & DASHBOARD =================
from src.admin.dashboard import router as admin_dashboard_router
from src.dashboard.router import router as dashboard_router
from src.admin.investigations import router as investigation_router

app.include_router(admin_dashboard_router)
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(investigation_router)

# ================= CLAIMS =================
from src.claims.controller import router as claims_router

app.include_router(claims_router, prefix="/claims", tags=["Claims"])

# ================= POLICY CATALOG =================
from src.policies_recommendations_profile_preferences.routers.policy_catalog import (
    router as policy_catalog_router,
)

app.include_router(policy_catalog_router, prefix="/catalog", tags=["Catalog"])

# ================= POLICY DETAILS =================
from src.policies_recommendations_profile_preferences.routers.health_policy import router as health_policy_router
from src.policies_recommendations_profile_preferences.routers.motor_policy import router as motor_policy_router
from src.policies_recommendations_profile_preferences.routers.life_policy import router as life_policy_router
from src.policies_recommendations_profile_preferences.routers.home_policy import router as home_policy_router
from src.policies_recommendations_profile_preferences.routers.travel_policy import router as travel_policy_router
from src.policies_recommendations_profile_preferences.routers.fire_policy import router as fire_policy_router
from src.policies_recommendations_profile_preferences.routers.business_policy import router as business_policy_router

app.include_router(health_policy_router)
app.include_router(motor_policy_router)
app.include_router(life_policy_router)
app.include_router(home_policy_router)
app.include_router(travel_policy_router)
app.include_router(fire_policy_router)
app.include_router(business_policy_router)

# ================= RECOMMENDATIONS =================
from src.policies_recommendations_profile_preferences.routers.recommendations import (
    router as recommendations_router
)
from src.policies_recommendations_profile_preferences.routers.profile import (
    router as profile_router
)

app.include_router(profile_router, prefix="/profile", tags=["Profile"])
app.include_router(recommendations_router, prefix="/recommendations", tags=["Recommendations"])

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
        print("✅ Admin user created")

    db.close()

# ================= ROOT =================
@app.get("/")
def root():
    return {
        "status": "Insurance CRC Assistant API running",
        "base_url": BASE_URL,
    }
