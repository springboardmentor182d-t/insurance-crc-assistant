
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import date

from server.app.database import get_db
from server.app.models.user import User
from server.app.models.policy import Policy
from server.app.models.claim import Claim
from server.app.models.recommendation import Recommendation
from server.app.models.premium_analysis import PremiumAnalysis

app = FastAPI()

# Allow frontend (React/Vite) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Pydantic Schemas (Pydantic v2 style)
# ---------------------------
class PolicySchema(BaseModel):
    id: int
    user_id: int
    policy_type: str
    premium: float
    status: str
    renewal_date: date
    policy_number: str

    model_config = {"from_attributes": True}

class ClaimSchema(BaseModel):
    id: int
    policy_id: int
    claim_date: date
    claim_amount: float
    status: str

    model_config = {"from_attributes": True}

class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    role: str
    photo: str | None = None 

    model_config = {"from_attributes": True}

class RecommendationSchema(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    link: str

    model_config = {"from_attributes": True}

class PremiumAnalysisSchema(BaseModel):
    id: int
    user_id: int
    category: str
    market_cost: float
    user_cost: float
    frequency: str

    model_config = {"from_attributes": True}

class DashboardResponse(BaseModel):
    profile: UserSchema
    policies: List[PolicySchema]
    claims: List[ClaimSchema]
    recommendations: List[RecommendationSchema]
    premium_analysis: List[PremiumAnalysisSchema]

# ---------------------------
# Endpoint
# ---------------------------
@app.get("/dashboard/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    policies = db.query(Policy).filter(Policy.user_id == user_id).all()
    claims = db.query(Claim).join(Policy).filter(Policy.user_id == user_id).all()
    recommendations = db.query(Recommendation).filter(Recommendation.user_id == user_id).all()
    premium_rows = db.query(PremiumAnalysis).filter(PremiumAnalysis.user_id == user_id).all()

    premium_analysis = [
        PremiumAnalysisSchema(
            id=row.id,
            user_id=row.user_id,
            category=row.category.lower(),
            market_cost=float(row.market_cost),
            user_cost=float(row.user_cost),
            frequency=row.frequency.lower()
        )
        for row in premium_rows
    ]

    return {
        "profile": user,
        "policies": policies,
        "claims": claims,
        "recommendations": recommendations,
        "premium_analysis": premium_analysis
    }