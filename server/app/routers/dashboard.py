
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.app.database import get_db
from server.app.models.user import User
from server.app.models.policy import Policy
from server.app.models.claim import Claim
from server.app.models.premium_analysis import PremiumAnalysis
from server.app.models.recommendation import Recommendation
from server.app.models.profile import UserProfile
from server.app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(UserProfile).filter(UserProfile.id == user_id).first()

    policies = db.query(Policy).filter(Policy.user_id == user_id).all()

    claims = (
        db.query(Claim)
        .join(Policy, Claim.policy_id == Policy.id)
        .filter(Policy.user_id == user_id)
        .all()
    )

    premium_analysis = db.query(PremiumAnalysis).filter(PremiumAnalysis.user_id == user_id).all()

    recommendations = db.query(Recommendation).filter(Recommendation.user_id == user_id).all()

    return {
        "user": user,
        "profile": profile,
        "policies": policies,
        "claims": claims,
        "premiumAnalysis": premium_analysis,
        "recommendations": recommendations,
    }