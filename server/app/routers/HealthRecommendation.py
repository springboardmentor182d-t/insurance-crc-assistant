from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.policy import Policy
from app.models.health_progress import HealthProgress

router = APIRouter(
    prefix="/api/health",
    tags=["Health Recommendations"]
)


@router.post("/recommendations")
def recommend_health_policies(data: dict, db: Session = Depends(get_db)):

    # 🔹 Load saved questionnaire progress (fallback)
    progress = db.query(HealthProgress).first()

    premium = data.get("premium") or (progress.premium if progress else None)
    goal = data.get("goal") or (progress.goal if progress else "Comprehensive")

    if not premium:
        return []

    # 🎯 Premium window
    min_premium = max(0, premium - 3000)
    max_premium = premium + 3000

    policies = (
        db.query(Policy)
        .filter(
            Policy.premium >= min_premium,
            Policy.premium <= max_premium
        )
        .all()
    )

    results = []

    for p in policies:
        score = 5
        explanation = ["Matches your budget range"]

        # 🔹 Goal-based scoring
        if goal == "Lowest Premium":
            score += max(0, (max_premium - p.premium) // 1000)
            explanation.append("Optimized for low premium")

        elif goal == "Comprehensive":
            score += p.premium // 10000
            explanation.append("Higher coverage potential")

        elif goal == "Tax Saving":
            score += 3
            explanation.append("Suitable for tax saving")

        # ✅ DERIVED COVERAGE (FIXES UI)
        coverage_text = "Hospitalization, Day-care procedures"

        if goal == "Comprehensive":
            coverage_text += ", Pre & Post hospitalization, No room rent limit"

        elif goal == "Tax Saving":
            coverage_text += ", Section 80D tax benefits"

        elif goal == "Lowest Premium":
            coverage_text += ", Essential coverage at low cost"

        results.append({
            "id": p.id,
            "name": p.name,
            "premium": p.premium,
            "coverage": coverage_text,  # 🔥 REQUIRED BY UI
            "score": score,
            "explanation": explanation
        })

    # 🥇 Best match first
    results.sort(key=lambda x: (-x["score"], x["premium"]))
    return results
