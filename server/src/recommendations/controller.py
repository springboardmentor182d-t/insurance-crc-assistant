from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import Policy, UserPreference

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_recommendations(db: Session = Depends(get_db)):
    pref = db.query(UserPreference).first()

    # ✅ SAFETY CHECK
    if not pref:
        return {
            "total": 0,
            "avg_match": 0,
            "recommendations": [],
            "message": "No preferences found"
        }

    policies = db.query(Policy).all()
    results = []

    for policy in policies:
        score = 0
        reasons = []

        # 1️⃣ Policy type match (35)
        if policy.type == pref.policy_type:
            score += 35
            reasons.append("Matches your insurance type")

        # 2️⃣ Budget fit (30)
        if policy.premium <= pref.annual_budget:
            budget_score = 30
        else:
            budget_score = max(
                0,
                30 - int(
                    (policy.premium - pref.annual_budget)
                    / pref.annual_budget * 30
                )
            )

        score += budget_score
        if budget_score > 15:
            reasons.append("Fits within your budget")

        # 3️⃣ Coverage fit (25)
        coverage_ratio = min(
            policy.coverage / pref.desired_coverage, 1
        )
        coverage_score = int(coverage_ratio * 25)
        score += coverage_score

        if coverage_score > 15:
            reasons.append("Provides good coverage")

        # 4️⃣ Risk appetite (10)
        risk_map = {
            "Low": 5,
            "Medium": 8,
            "High": 10,
        }
        score += risk_map.get(pref.risk_appetite, 5)

        results.append({
            "id": policy.id,
            "name": policy.name,
            "provider": policy.provider,
            "premium": policy.premium,
            "coverage": policy.coverage,
            "match": min(score, 100),
            "reasons": reasons,
            "savings": max(
                pref.annual_budget - policy.premium, 0
            ),
        })

    # 🔽 SORT BY MATCH SCORE
    results.sort(key=lambda x: x["match"], reverse=True)

    return {
        "total": len(results),
        "avg_match": round(
            sum(r["match"] for r in results) / len(results)
        ),
        "recommendations": results,
    }
