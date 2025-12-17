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
    sort: str = Query("best"),  # kept for UI, but best = score-based
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).first()
    if not profile:
        return []

    # Normalize categories
    user_categories = (
        [c.strip().title() for c in profile.categories.split(",")]
        if profile.categories
        else []
    )

    # Category filter (fallback to all)
    if user_categories:
        policies = (
            db.query(Policy)
            .filter(Policy.category.in_(user_categories))
            .all()
        )
    else:
        policies = db.query(Policy).all()

    recommendations = []

    # Budget tolerance
    BUDGET_BUFFER = 2000
    max_allowed_premium = (
        profile.budget + BUDGET_BUFFER
        if profile.budget
        else None
    )

    for policy in policies:
        # 🚫 FILTER: above budget tolerance
        if max_allowed_premium and policy.premium > max_allowed_premium:
            continue

        # 🎯 SCORE CALCULATION
        score = 0

        # Base category relevance
        score += 3

        # Budget fit
        if profile.budget and policy.premium <= profile.budget:
            score += 3

        # Risk match
        if profile.risk and policy.risk_level == profile.risk:
            score += 2

        # Family size relevance
        if profile.family_size:
            if profile.family_size >= 4 and "Family" in policy.coverage:
                score += 2
            elif profile.family_size <= 2:
                score += 1

        # Goal-based preference
        if profile.goal == "Lowest Premium":
            score += max(0, 20000 - policy.premium) // 5000

        elif profile.goal == "Family Protection":
            if "Family" in policy.coverage or policy.category in ["Health", "Life"]:
                score += 2

        elif profile.goal == "Tax Saving":
            if policy.category in ["Health", "Life"]:
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

    # 🥇 FINAL SORT: HIGH SCORE FIRST, THEN LOWER PREMIUM
    recommendations.sort(
        key=lambda x: (-x["score"], x["premium"])
    )

    return recommendations[:6]
