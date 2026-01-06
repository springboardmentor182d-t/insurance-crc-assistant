from pydantic import BaseModel
from typing import List, Optional
from decimal import Decimal

class PolicyResponse(BaseModel):
    id: int
    name: str
    provider: str
    category: str
    premium: Decimal
    coverage: Decimal
    term: Optional[str]
    deductible: Optional[Decimal]
    waitingPeriod: Optional[str]
    roomRent: Optional[str]
    benefits: List[str]
    exclusions: List[str]

    class Config:
        from_attributes = True
