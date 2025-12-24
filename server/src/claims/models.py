from pydantic import BaseModel
from typing import Optional
from datetime import date


class ClaimCreate(BaseModel):
    policy_id: int
    incident_type: str
    incident_date: date
    description: str
    claim_amount: float


class ClaimResponse(BaseModel):
    claim_id: int
    status: str
    message: str
