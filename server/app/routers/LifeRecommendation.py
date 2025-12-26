from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.policy import Policy
from app.models.life_progress import LifeProgress

router = APIRouter(
    prefix="/api/life",
    tags=["Life Recommendations"]
)

@router.post("/recommendations")
def recommend_life_policies(data: dict, db: Session = Depends(get_db)):

    progress = db.query(LifeProgress).first()

    premium = (
        data.get("premium")
        or (progress.premium if progress else None)
        or 10000  # ✅ fallback
    )

    goal = data.get("goal") or (progress.goal if progress else "Family Protection")

    min_premium = max(0, premium - 3000)
    max_premium = premium + 3000

    policies = db.query(Policy).all()  # ✅ NO FILTER FIRST (IMPORTANT)

    results = []

    for p in policies:
        if not (min_premium <= p.premium <= max_premium):
            continue

        score = 5
        explanation = ["Matches your budget range"]

        if goal == "Family Protection":
            score += 5
            explanation.append("Ideal for family security")

        elif goal == "Wealth Creation":
            score += 3
            explanation.append("Supports long-term savings")

        elif goal == "Tax Saving":
            score += 3
            explanation.append("Tax benefits under Section 80C")

        coverage = "Life cover with death benefit"

        if goal == "Family Protection":
            coverage += ", High sum assured, Income replacement"
        elif goal == "Wealth Creation":
            coverage += ", Maturity benefit, Bonuses"
        elif goal == "Tax Saving":
            coverage += ", Tax-saving benefits"

        results.append({
            "id": p.id,
            "name": p.name,
            "premium": p.premium,
            "coverage": coverage,   # ✅ FIX
            "score": score,
            "explanation": explanation
        })

    # 🚨 IMPORTANT: NEVER return []
    if not results:
        return [{
            "id": 0,
            "name": "No exact match found",
            "premium": premium,
            "coverage": "Try adjusting premium or preferences",
            "score": 1,
            "explanation": ["No policies matched your exact criteria"]
        }]

    results.sort(key=lambda x: (-x["score"], x["premium"]))
    return results
