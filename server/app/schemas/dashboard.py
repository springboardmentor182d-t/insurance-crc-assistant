
from pydantic import BaseModel
from datetime import date
from typing import List, Optional

# ------------------------------
# User
# ------------------------------
class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True

# ------------------------------
# Policies
# ------------------------------
class PolicySchema(BaseModel):
    id: int
    policy_type: str
    premium: float
    status: str
    renewal_date: date
    policy_number: str

    class Config:
        from_attributes = True

# ------------------------------
# Claims
# ------------------------------
class ClaimSchema(BaseModel):
    id: int
    policy_id: int
    claim_date: date
    claim_amount: float
    status: str

    class Config:
        from_attributes = True

# ------------------------------
# Premium Analysis
# ------------------------------
class PremiumAnalysisSchema(BaseModel):
    id: int
    user_id: int
    category: str
    market_cost: float
    user_cost: float
    frequency: str

    class Config:
        from_attributes = True

# ------------------------------
# Recommendations
# ------------------------------
class RecommendationSchema(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    link: Optional[str] = None

    class Config:
        from_attributes = True

# ------------------------------
# Profile
# ------------------------------
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

# ------------------------------
# Dashboard Response
# ------------------------------
class DashboardResponse(BaseModel):
    user: UserSchema
    profile: Optional[UserProfileSchema] = None
    policies: List[PolicySchema]
    claims: List[ClaimSchema]
    premiumAnalysis: List[PremiumAnalysisSchema]
    recommendations: List[RecommendationSchema]