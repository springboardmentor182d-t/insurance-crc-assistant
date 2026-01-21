from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from src.database.core import get_db

from src.policies_recommendations_profile_preferences.models.profile import Profile
from src.policies_recommendations_profile_preferences.models.profile_category import ProfileCategory
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.saved_quote import SavedQuote
from src.claims.models import Claim

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


class DashboardResponse(BaseModel):
    profile: Optional[dict]
    policies: List[dict]
    claims: List[dict]
    premium_analysis: List[dict]


@router.get("/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):

    # ---------- PROFILE ----------
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    profile_data = None

    if profile:
        categories = [
            c.category
            for c in db.query(ProfileCategory)
            .filter(ProfileCategory.profile_id == profile.id)
            .all()
        ]

        profile_data = {
            "id": profile.id,
            "username": profile.name,
            "photo": profile.avatar,
            "risk": profile.risk_level,
            "familySize": profile.family_size,
            "monthlyBudget": profile.monthly_budget,
            "goal": profile.goal,
            "categories": categories,   # ✅ FIXED
        }

    # ---------- SAVED QUOTES ----------
    saved_quotes_db = (
        db.query(SavedQuote)
        .filter(SavedQuote.user_id == user_id)
        .order_by(SavedQuote.created_at.desc())
        .limit(6)
        .all()
    )

    policies = [
        {
            "id": q.id,
            "policy_type": q.policy_type,
            "policy_id": q.policy_id,
            "policy_name": q.policy_name,
            "insurer_name": q.insurer_name,
            "tenure": q.tenure,
            "total_premium": float(q.total_premium),
            "created_at": q.created_at,
        }
        for q in saved_quotes_db
    ]

    # ---------- CLAIMS ----------
    claims_db = (
        db.query(Claim)
        .filter(Claim.user_id == user_id)
        .order_by(Claim.created_at.desc())
        .limit(3)
        .all()
    )

    claims = [
        {
            "id": c.id,
            "policy_number": c.policy,
            "claim_date": c.incident_date,
            "claim_amount": c.amount_claimed,
            "status": c.status,
        }
        for c in claims_db
    ]

    # ---------- PREMIUM ANALYSIS ----------
    premium_rows = (
        db.query(PremiumAnalysis)
        .filter(PremiumAnalysis.user_id == user_id)
        .all()
    )

    premium_analysis = [
        {
            "category": p.category,
            "user_cost": float(p.user_cost),
            "market_cost": float(p.market_cost),
            "frequency": p.frequency.lower(),
        }
        for p in premium_rows
    ]

    return {
        "profile": profile_data,
        "policies": policies,
        "claims": claims,
        "premium_analysis": premium_analysis,
    }
