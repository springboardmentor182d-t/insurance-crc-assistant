from pydantic import BaseModel
from typing import List
from datetime import date

class ClaimStatus(str):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    INVESTIGATION = "Investigation"

class ClaimBase(BaseModel):
    policy_holder: str
    policy_type: str
    submission_date: date
    amount: float

class Claim(ClaimBase):
    id: str
    status: str = ClaimStatus.PENDING
    is_fraud_suspected: bool = False

class ClaimUpdateStatus(BaseModel):
    status: str

class FraudFlagUpdate(BaseModel):
    is_fraud_suspected: bool
