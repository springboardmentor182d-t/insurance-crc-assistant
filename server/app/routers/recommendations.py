from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.profile import Profile
from app.models.policy import Policy

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"]
)

@router.get("/")
def recommend_policies(
    sort: str = Query("best"),  # best | premium | comprehensive
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).first()
    if not profile:
        return []

    user_categories = (
        profile.categories.split(",")
        if profile.categories
        else []
    )

    # ✅ STRICT CATEGORY FILTER
    policies = (
        db.query(Policy)
        .filter(Policy.category.in_(user_categories))
        .all()
    )

    recommendations = []

    for policy in policies:
        score = 3  # category match

        if profile.budget and policy.premium <= profile.budget:
            score += 2

        if profile.risk and policy.risk_level == profile.risk:
            score += 2

        recommendations.append({
            "id": policy.id,
            "name": policy.name,
            "category": policy.category,
            "premium": policy.premium,
            "coverage": policy.coverage,
            "risk_level": policy.risk_level,
            "score": score
        })

    # 🔁 SORTING LOGIC
    if sort == "premium":
        recommendations.sort(key=lambda x: x["premium"])  # lowest first
    elif sort == "comprehensive":
        recommendations.sort(key=lambda x: x["premium"], reverse=True)
    else:
        recommendations.sort(key=lambda x: x["score"], reverse=True)

    return recommendations[:6]
