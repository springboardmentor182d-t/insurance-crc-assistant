from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import engine, Base

from .recommendations_profile_preferences.routers import (
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

app = FastAPI(title="Insurance CRC Assistant")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Static uploads
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# ✅ Create DB tables
Base.metadata.create_all(bind=engine)

# ✅ Register routers
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

@app.get("/")
def root():
    return {"status": "FastAPI backend running"}
