from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.recommendations_profile_preferences.models.travel_policy import TravelPolicy

router = APIRouter(
    prefix="/api/travel",
    tags=["Travel Recommendations"]
)

@router.post("/recommendations")
def recommend_travel(data: dict, db: Session = Depends(get_db)):

    query = db.query(TravelPolicy)

    if data.get("tripType"):
        query = query.filter(TravelPolicy.trip_type == data["tripType"])

    if data.get("coverage"):
        query = query.filter(TravelPolicy.coverage == data["coverage"])

    if data.get("planType"):
        query = query.filter(TravelPolicy.plan_type == data["planType"])

    policies = query.all()

    # fallback if no strict match
    if not policies:
        policies = db.query(TravelPolicy).all()

    premium = data.get("premium", 0)

    policies = sorted(
        policies,
        key=lambda p: abs(p.premium - premium)
    )

    return [
        {
            "id": p.id,
            "name": p.name,
            "coverage": p.coverage,
            "plan_type": p.plan_type,
            "premium": p.premium,
            "medical_sum_insured": p.medical_sum_insured,
            "score": 100 - abs(p.premium - premium) // 100
        }
        for p in policies[:5]
    ]
