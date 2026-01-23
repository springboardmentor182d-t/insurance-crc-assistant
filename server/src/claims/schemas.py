from pydantic import BaseModel
from datetime import date
from typing import Optional
from uuid import UUID


# ===============================
# POLICY (NESTED RESPONSE)
# ===============================
class UserPolicyResponse(BaseModel):
    id: UUID
    policy_name: str
    provider_name: Optional[str] = None

    class Config:
        orm_mode = True


# ===============================
# CLAIM CREATE
# ===============================
class ClaimCreate(BaseModel):
    user_policy_id: UUID
    claim_type: str
    incident_date: date
    description: Optional[str] = None
    amount_claimed: Optional[float] = None


# ===============================
# CLAIM RESPONSE (FIXED)
# ===============================
class ClaimResponse(BaseModel):
    id: int
    claim_type: str
    incident_date: date
    description: Optional[str] = None
    amount_claimed: Optional[float] = None
    status: str

    user_policy: Optional[UserPolicyResponse]  # ✅ REQUIRED

    class Config:
        orm_mode = True
