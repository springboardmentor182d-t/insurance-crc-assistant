from pydantic import BaseModel
from datetime import date
from typing import Optional

class ClaimBase(BaseModel):
    claim_number: str
    policy_name: str
    policy_type: str
    policy_number: str
    filed_date: date
    amount: float
    status: str


class ClaimListResponse(ClaimBase):
    """
    Used for Track Claims page (table view)
    """
    pass


class ClaimDetailResponse(ClaimBase):
    """
    Used for Claim Details page
    (timeline, summary, documents, assessor etc.)
    """
    description: str | None = None
    location: str | None = None
    claim_type: str | None = None
    payable_amount: float | None = None

    class Config:
        from_attributes = True


class ClaimCreateRequest(BaseModel):
    policyName: str
    policyNumber: str
    incidentDate: date
    incidentType: str
    location: str
    amount: float
    description: str

"""class ClaimCreate(BaseModel):
    policy_id: int
    incident_type: str
    incident_date: date
    description: str
    claim_amount: float """