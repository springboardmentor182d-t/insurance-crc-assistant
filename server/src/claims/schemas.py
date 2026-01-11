from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional
from decimal import Decimal

class ClaimBase(BaseModel):
    user_policy_id: int
    claim_type: str
    incident_date: date
    amount_claimed: Decimal
    description: Optional[str] = None
    
class ClaimCreate(ClaimBase):
    pass

class ClaimDocumentSchema(BaseModel):
    id: int
    claim_id: int
    file_url: str
    doc_type: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

class ClaimSchema(ClaimBase):
    id: int
    claim_number: str
    status: str
    created_at: datetime
    documents: List[ClaimDocumentSchema] = []

    class Config:
        from_attributes = True