from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from ...database import get_db
import json

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])


@router.get("/{profile_id}")
def get_recommendations(profile_id: int, db: Session = Depends(get_db)):
    # ---------- PROFILE ----------
    profile = db.execute(
        text("SELECT id FROM user_profile WHERE id = :id"),
        {"id": profile_id},
    ).mappings().first()

    if not profile:
        return {"recommendations": []}

    prefs = db.execute(
        text("""
            SELECT budget_preferences, goal_preferences, coverage_preferences
            FROM profile_preferences
            WHERE profile_id = :id
        """),
        {"id": profile_id},
    ).mappings().first()

    # ---------- NORMALIZE PROFILE DATA ----------
    # Categories
    if prefs and prefs.get("coverage_preferences"):
        categories = prefs["coverage_preferences"].get("categories") or []
    else:
        categories = []

    if not categories:
        categories = ["Health"]  # default

    categories = [c.lower() for c in categories]

    # Risk level (SAFE DEFAULT — YOU DO NOT STORE THIS)
    risk_level = "medium"

    # Goal
    if prefs and prefs.get("goal_preferences"):
        goal = prefs["goal_preferences"].get("goal") or "Family Protection"
    else:
        goal = "Family Protection"

    # ---------- POLICIES ----------
    policies = db.execute(
        text("""
            SELECT id, name, category, premium, risk_level, eligibility_rules
            FROM policies
            WHERE is_active = true
        """)
    ).mappings().all()

    recommendations = []

    # ---------- FILTER ----------
    for policy in policies:
        policy_category = (policy["category"] or "").lower()

        rules = policy["eligibility_rules"] or {}
        if isinstance(rules, str):
            rules = json.loads(rules)

        allowed_risks = [
            (r or "").lower()
            for r in rules.get("allowed_risk_levels", [])
        ]

        if (
            policy_category in categories
            and (not allowed_risks or risk_level in allowed_risks)
        ):
            recommendations.append({
                "policy_id": policy["id"],
                "name": policy["name"],
                "category": policy["category"],
                "premium": policy["premium"],
                "explanation": {
                    "risk": policy["risk_level"],
                    "goal": goal,
                }
            })

    return {"recommendations": recommendations}
