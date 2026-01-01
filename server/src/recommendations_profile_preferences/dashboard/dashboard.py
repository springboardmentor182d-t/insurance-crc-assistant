# server/app/dashboard/dashboard.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import date
from typing import List, Optional

from server.app.database import get_db
from server.app.models.user import User
from server.app.models.policy import Policy
from server.app.models.claim import Claim
from server.app.models.premium_analysis import PremiumAnalysis
from server.app.models.recommendation import Recommendation
from server.app.models.profile import UserProfile

# ================= SCHEMAS =================
class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True

class PolicySchema(BaseModel):
    id: int
    policy_type: str
    premium: float
    status: str
    renewal_date: date
    policy_number: str

    class Config:
        from_attributes = True

class ClaimSchema(BaseModel):
    id: int
    policy_id: int
    claim_date: date
    claim_amount: float
    status: str

    class Config:
        from_attributes = True

class PremiumAnalysisSchema(BaseModel):
    id: int
    user_id: int
    category: str
    market_cost: float
    user_cost: float
    frequency: str

    class Config:
        from_attributes = True

class RecommendationSchema(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    link: Optional[str] = None

    class Config:
        from_attributes = True

class UserProfileSchema(BaseModel):
    id: int
    dob: Optional[date] = None
    address: Optional[str] = None
    categories: Optional[str] = None
    budget: Optional[int] = None
    risk: Optional[str] = None
    family_size: Optional[int] = None
    goal: Optional[str] = None

    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    user: UserSchema
    profile: Optional[UserProfileSchema] = None
    policies: List[PolicySchema]
    claims: List[ClaimSchema]
    premiumAnalysis: List[PremiumAnalysisSchema]
    recommendations: List[RecommendationSchema]

# ================= ROUTER =================
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

    return DashboardResponse(
        user=user,
        profile=profile,
        policies=policies,
        claims=claims,
        premiumAnalysis=premium_analysis,
        recommendations=recommendations,
    )