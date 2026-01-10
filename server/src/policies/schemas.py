from pydantic import BaseModel
from typing import List, Optional


class PolicyResponse(BaseModel):
    id: int
    name: str
    provider: str
    category: str
    premium: int
    coverage: int

    term: Optional[str] = None
    deductible: Optional[str] = None
    waitingPeriod: Optional[str] = None
    roomRent: Optional[str] = None

    benefits: List[str] = []
    exclusions: List[str] = []

    # ✅ computed fields MUST be optional
    score: Optional[float] = None
    claimSettlement: Optional[int] = None
    customerService: Optional[float] = None
    tat: Optional[int] = None

    class Config:
        from_attributes = True
