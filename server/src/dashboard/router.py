from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.core import get_db

# ✅ CORRECT MODEL IMPORTS (based on your folder structure)
from src.recommendations_profile_preferences.models.user import User
from src.recommendations_profile_preferences.models.policy import Policy
from src.recommendations_profile_preferences.models.claim import Claim
from src.recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.recommendations_profile_preferences.models.recommendation import Recommendation

router = APIRouter()

@router.get("/user/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):

    # -----------------------
    # USER
    # -----------------------
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # -----------------------
    # POLICIES
    # -----------------------
    policies = db.query(Policy).filter(Policy.user_id == user_id).all()

    # -----------------------
    # CLAIMS
    # -----------------------
    claims = db.query(Claim).filter(Claim.user_id == user_id).all()

    # -----------------------
    # PREMIUM ANALYSIS
    # -----------------------
    premium_analysis = (
        db.query(PremiumAnalysis)
        .filter(PremiumAnalysis.user_id == user_id)
        .all()
    )

    # -----------------------
    # RECOMMENDATIONS
    # -----------------------
    recommendations = (
        db.query(Recommendation)
        .filter(Recommendation.user_id == user_id)
        .all()
    )

    # -----------------------
    # RESPONSE (NO DUMMY DATA)
    # -----------------------
    return {
        "user": {
            "name": user.username,
            "policyholderId": user.id,
            "tenure": getattr(user, "tenure", None),
            "riskScore": getattr(user, "risk_score", None),
            "role": user.role,
        },
        "policies": policies,
        "claims": claims,
        "premiumAnalysis": premium_analysis,
        "recommendations": recommendations,
    }
