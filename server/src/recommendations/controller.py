from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.database.database import get_db
from src.preferences.preferences_model import UserPreference
from .service import score_policy, passes_type_filter

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

USER_ID = 1  # TEMP until auth is added


# -------------------------------------------------
# MASTER POLICIES (TEMP – DB LATER)
# -------------------------------------------------
POLICIES = [
    {
        "id": 1,
        "name": "Health Shield Pro",
        "provider": "SecureLife Insurance",
        "category": "Health",
        "premium": 15000,
        "coverage": 500000,
        "term": "1 Year (Renewable)",
        "deductible": 25000,
        "waitingPeriod": "30 Days",
        "roomRent": "No Limit",
        "benefits": [
            "Cashless hospitalization at 5000+ hospitals",
            "Coverage for pre-existing diseases after 3 years",
            "Annual health check-up included",
            "No claim bonus up to 50%",
            "Ambulance charges covered",
        ],
        "exclusions": [
            "Cosmetic procedures",
            "Self-inflicted injuries",
            "Experimental treatments",
        ],
    },
    {
        "id": 2,
        "name": "Health Care Essential",
        "provider": "MediSure",
        "category": "Health",
        "premium": 10000,
        "coverage": 300000,
        "term": "1 Year",
        "deductible": 20000,
        "waitingPeriod": "45 Days",
        "roomRent": "Shared Room",
        "benefits": [
            "Cashless hospitalization",
            "Day-care procedures covered",
            "Pre & post hospitalization",
        ],
        "exclusions": [
            "Cosmetic surgery",
            "Non-prescribed treatments",
        ],
    },
    {
        "id": 3,
        "name": "Life Secure Plan",
        "provider": "LifeGuard",
        "category": "Life",
        "premium": 15000,
        "coverage": 500000,
        "term": "20 Years",
        "deductible": None,
        "waitingPeriod": "None",
        "roomRent": None,
        "benefits": [
            "Death benefit",
            "Tax benefits under 80C",
            "Accidental death cover",
        ],
        "exclusions": [
            "Suicide within 1 year",
        ],
    },
    {
        "id": 4,
        "name": "Auto Shield",
        "provider": "DriveSafe",
        "category": "Auto",
        "premium": 12000,
        "coverage": 200000,
        "term": "1 Year",
        "deductible": 5000,
        "waitingPeriod": "None",
        "roomRent": None,
        "benefits": [
            "Own damage cover",
            "Third-party liability",
            "Roadside assistance",
        ],
        "exclusions": [
            "Drunk driving",
            "Illegal racing",
        ],
    },
    {
        "id": 5,
        "name": "Travel Safe",
        "provider": "GlobeCare",
        "category": "Travel",
        "premium": 8000,
        "coverage": 100000,
        "term": "30 Days",
        "deductible": 3000,
        "waitingPeriod": "None",
        "roomRent": None,
        "benefits": [
            "Medical emergencies",
            "Trip cancellation",
            "Lost baggage",
        ],
        "exclusions": [
            "Adventure sports",
            "Pre-existing illness",
        ],
    },
    {
        "id": 6,
        "name": "Home Protect",
        "provider": "SafeNest",
        "category": "Home",
        "premium": 18000,
        "coverage": 600000,
        "term": "1 Year",
        "deductible": 10000,
        "waitingPeriod": "None",
        "roomRent": None,
        "benefits": [
            "Fire damage cover",
            "Theft protection",
            "Natural disaster cover",
        ],
        "exclusions": [
            "Intentional damage",
            "War & nuclear risks",
        ],
    },
]


# -------------------------------------------------
# GET RECOMMENDATIONS (LIST)
# -------------------------------------------------
@router.get("")
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

    insurance_types = [t.lower() for t in insurance_types]

    prefs = {
        "insuranceTypes": insurance_types,
        "annualBudget": pref.annual_budget or 0,
        "desiredCoverage": pref.desired_coverage or 0,
        "riskAppetite": pref.risk_appetite or "Medium",
    }

    items = []
    total_score = 0

    for policy in POLICIES:
        policy_type = policy["category"].lower()

        if not passes_type_filter({"type": policy_type}, prefs):
            continue

        score, reason = score_policy(
            {
                "type": policy_type,
                "premium": policy["premium"],
                "coverage": policy["coverage"],
            },
            prefs,
        )

        if score == 0:
            continue

        total_score += score

        items.append({
            "id": policy["id"],
            "title": policy["name"],
            "provider": policy["provider"],
            "type": policy_type,
            "premium": policy["premium"],
            "coverage": policy["coverage"],
            "score": score,
            "reason": reason,
            "savings": max(0, prefs["annualBudget"] - policy["premium"]),
        })

    return {
        "total": len(items),
        "avg_match": int(total_score / len(items)) if items else 0,
        "items": sorted(items, key=lambda x: x["score"], reverse=True),
    }


# -------------------------------------------------
# GET RECOMMENDATION VIEW (DETAIL)
# -------------------------------------------------
@router.get("/{policy_id}/view")
async def get_recommendation_view(
    policy_id: int,
    db: AsyncSession = Depends(get_db),
):
    policy = next((p for p in POLICIES if p["id"] == policy_id), None)
    if not policy:
        return {"error": "Policy not found"}

    policy_type = policy["category"].lower()

    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    insurance_types = []
    annual_budget = None
    desired_coverage = None
    risk_appetite = "Medium"

    if pref:
        insurance_types = pref.insurance_types or []
        if isinstance(insurance_types, str):
            insurance_types = [insurance_types]
        insurance_types = [t.lower() for t in insurance_types]

        annual_budget = pref.annual_budget
        desired_coverage = pref.desired_coverage
        risk_appetite = pref.risk_appetite or "Medium"

    prefs = {
        "insuranceTypes": insurance_types,
        "annualBudget": annual_budget,
        "desiredCoverage": desired_coverage,
        "riskAppetite": risk_appetite,
    }

    score, _ = score_policy(
        {
            "type": policy_type,
            "premium": policy["premium"],
            "coverage": policy["coverage"],
        },
        prefs,
    )

    reasons = []

    if policy_type in insurance_types:
        reasons.append({
            "key": "type",
            "title": "Preferred Insurance Type",
            "description": "Matches your selected insurance category",
            "icon": "shield",
        })

    if annual_budget and policy["premium"] <= annual_budget:
        reasons.append({
            "key": "budget",
            "title": "Within Budget",
            "description": "Fits your selected annual budget",
            "icon": "wallet",
        })

    if desired_coverage and policy["coverage"] >= desired_coverage:
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
    f"{policy['name']} offers exceptional value with comprehensive "
    f"{policy['category'].lower()} coverage at a competitive premium. "
    f"The provider has an excellent claim settlement track record."
    )

    return {
        "id": policy["id"],
        "title": policy["name"],
        "provider": policy["provider"],
        "type": policy_type,
        "premium": policy["premium"],
        "coverage": policy["coverage"],
        "match": score,
        "valueScore": round(policy["coverage"] / policy["premium"], 1),
        "savings": max(0, (annual_budget or 0) - policy["premium"]),
        "reasons": reasons,
        "market": market,
        "features": policy.get("benefits", []),
        "expert_note": expert_note,
        "exclusions": policy.get("exclusions", []),
        "term": policy.get("term"),
        "deductible": policy.get("deductible"),
        "waitingPeriod": policy.get("waitingPeriod"),
        "roomRent": policy.get("roomRent"),
    }


# -------------------------
# MARKET COMPARISON (TEMP STATIC)
# -------------------------
market = {
    "premium": 17,    # % lower than market
    "coverage": 25,   # % higher than market
    "benefits": 15,   # % more benefits
}

