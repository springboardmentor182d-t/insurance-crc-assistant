from pydantic import BaseModel
from datetime import date
from typing import List

class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    role: str

    class Config:
        orm_mode = True

class PolicySchema(BaseModel):
    id: int
    policy_type: str
    premium: float
    status: str
    renewal_date: date
    policy_number: str

    class Config:
        orm_mode = True

class ClaimSchema(BaseModel):
    id: int
    policy_id: int
    claim_date: date
    claim_amount: float
    status: str

    class Config:
        orm_mode = True

class DashboardResponse(BaseModel):
    user: UserSchema
    policies: List[PolicySchema]
    claims: List[ClaimSchema]