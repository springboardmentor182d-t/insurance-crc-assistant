from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.database.database import get_db
from src.entities.policy import Policy
from src.preferences.preferences_model import UserPreference
from .service import score_policy, passes_type_filter

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

USER_ID = 1  # TEMP until auth is added


# -------------------------
# MARKET COMPARISON (TEMP STATIC)
# -------------------------
market = {
    "premium": 17,
    "coverage": 25,
    "benefits": 15,
}


# =================================================
# GET RECOMMENDATIONS (LIST)
# =================================================
@router.get("/")
async def get_recommendations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    if not pref:
        return {"total": 0, "avg_match": 0, "items": []}

    insurance_types = pref.insurance_types or []
    if isinstance(insurance_types, str):
        insurance_types = [insurance_types]

    prefs = {
        "insuranceTypes": [t.lower() for t in insurance_types],
        "annualBudget": pref.annual_budget or 0,
        "desiredCoverage": pref.desired_coverage or 0,
        "riskAppetite": pref.risk_appetite or "Medium",
    }

    result = await db.execute(select(Policy))
    policies = result.scalars().all()

    items = []
    total_score = 0

    for policy in policies:
        policy_type = policy.category.lower()

        if not passes_type_filter({"type": policy_type}, prefs):
            continue

        score, reason = score_policy(
            {
                "type": policy_type,
                "premium": float(policy.premium),
                "coverage": float(policy.coverage),
            },
            prefs,
        )

        if score == 0:
            continue

        total_score += score

        items.append({
            "id": policy.id,
            "score": score,
            "reason": reason,
            "savings": max(0, prefs["annualBudget"] - float(policy.premium)),

            # ✅ CONSISTENT POLICY OBJECT
            "policy": {
                "id": policy.id,
                "name": policy.name,
                "provider": policy.provider,
                "category": policy.category,

                "premium": float(policy.premium),
                "coverage": float(policy.coverage),
                "waitingPeriod": policy.waitingPeriod,
                "roomRent": policy.roomRent,

                "benefits": policy.benefits or [],
                "exclusions": policy.exclusions or [],

                "term": policy.term,
                "deductible": policy.deductible,
            },
        })

    return {
        "total": len(items),
        "avg_match": int(total_score / len(items)) if items else 0,
        "items": sorted(items, key=lambda x: x["score"], reverse=True),
    }


# =================================================
# GET RECOMMENDATION VIEW (DETAIL)
# =================================================
@router.get("/{policy_id}/view")
async def get_recommendation_view(
    policy_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Policy).where(Policy.id == policy_id)
    )
    policy = result.scalar_one_or_none()

    if not policy:
        return {"error": "Policy not found"}

    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    prefs = {
        "insuranceTypes": [],
        "annualBudget": 0,
        "desiredCoverage": 0,
        "riskAppetite": "Medium",
    }

    if pref:
        insurance_types = pref.insurance_types or []
        if isinstance(insurance_types, str):
            insurance_types = [insurance_types]

        prefs["insuranceTypes"] = [t.lower() for t in insurance_types]
        prefs["annualBudget"] = pref.annual_budget or 0
        prefs["desiredCoverage"] = pref.desired_coverage or 0
        prefs["riskAppetite"] = pref.risk_appetite or "Medium"

    score, _ = score_policy(
        {
            "type": policy.category.lower(),
            "premium": float(policy.premium),
            "coverage": float(policy.coverage),
        },
        prefs,
    )

    reasons = []

    if policy.category.lower() in prefs["insuranceTypes"]:
        reasons.append({
            "key": "type",
            "title": "Preferred Insurance Type",
            "description": "Matches your selected insurance category",
            "icon": "shield",
        })

    if prefs["annualBudget"] and policy.premium <= prefs["annualBudget"]:
        reasons.append({
            "key": "budget",
            "title": "Within Budget",
            "description": "Fits your selected annual budget",
            "icon": "wallet",
        })

    if prefs["desiredCoverage"] and policy.coverage >= prefs["desiredCoverage"]:
        reasons.append({
            "key": "coverage",
            "title": "Adequate Coverage",
            "description": "Meets your desired coverage amount",
            "icon": "check",
        })

    reasons.append({
        "key": "value",
        "title": "Best Value",
        "description": "High coverage-to-premium ratio",
        "icon": "trending",
    })

    expert_note = (
        f"{policy.name} offers strong value with comprehensive "
        f"{policy.category.lower()} coverage at a competitive premium."
    )

    return {
        "id": policy.id,
        "match": score,
        "valueScore": round(float(policy.coverage) / float(policy.premium), 1),
        "savings": max(0, prefs["annualBudget"] - float(policy.premium)),
        "reasons": reasons,
        "market": market,
        "expert_note": expert_note,

        # ✅ SAME POLICY SHAPE
        "policy": {
            "id": policy.id,
            "name": policy.name,
            "provider": policy.provider,
            "category": policy.category,

            "premium": float(policy.premium),
            "coverage": float(policy.coverage),
            "waitingPeriod": policy.waitingPeriod,
            "roomRent": policy.roomRent,

            "benefits": policy.benefits or [],
            "exclusions": policy.exclusions or [],

            "term": policy.term,
            "deductible": policy.deductible,
        },
    }
