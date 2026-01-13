from pydantic import BaseModel, Field
from typing import List, Optional


class PolicyResponse(BaseModel):
    id: int
    name: str
    provider: str
    category: str
    premium: int
    coverage: int

    term: Optional[str] = None
    deductible: Optional[int] = None
    waitingPeriod: Optional[str] = None
    roomRent: Optional[str] = None

    benefits: List[str] = Field(default_factory=list)
    exclusions: List[str] = Field(default_factory=list)

    score: Optional[float] = None
    claimSettlement: Optional[int] = None
    customerService: Optional[float] = None
    tat: Optional[int] = None

    class Config:
        from_attributes = True
