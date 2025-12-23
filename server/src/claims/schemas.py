from pydantic import BaseModel
from datetime import date


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
