from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.database.database import get_db
from src.preferences.preferences_model import UserPreference
from .service import score_policy

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

USER_ID = 1  # TEMP until auth is added


# -------------------------
# SAMPLE POLICIES
# (Replace with DB later)
# -------------------------
POLICIES = [
    {
        "id": 1,
        "title": "Health Shield Pro",
        "provider": "SecureLife Insurance",
        "type": "Health",
        "premium": 15000,
        "coverage": 500000,
    },
    {
        "id": 2,
        "title": "Life Protect Plus",
        "provider": "Guardian Insurance",
        "type": "Life",
        "premium": 25000,
        "coverage": 2000000,
    },
    {
        "id": 3,
        "title": "Auto Guard Complete",
        "provider": "DriveSecure",
        "type": "Auto",
        "premium": 12000,
        "coverage": 300000,
    },
]


# -------------------------
# GET RECOMMENDATIONS (ASYNC)
# -------------------------
@router.get("")
async def get_recommendations(
    db: AsyncSession = Depends(get_db)
):
    # Fetch user preferences (ASYNC)
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    if not pref:
        return {
            "total": 0,
            "avg_match": 0,
            "items": [],
        }

    prefs = {
        "insuranceTypes": pref.insurance_types or [],
        "annualBudget": pref.annual_budget,
        "desiredCoverage": pref.desired_coverage,
        "riskAppetite": pref.risk_appetite,
    }

    results = []
    total_score = 0

    for policy in POLICIES:
        score, reason = score_policy(policy, prefs)
        total_score += score

        results.append({
            **policy,
            "score": score,
            "reason": reason,
            "savings": max(0, prefs["annualBudget"] - policy["premium"]),
        })

    avg_match = int(total_score / len(results)) if results else 0

    return {
        "total": len(results),
        "avg_match": avg_match,
        "items": sorted(results, key=lambda x: x["score"], reverse=True),
    }
