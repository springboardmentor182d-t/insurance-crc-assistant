from pydantic import BaseModel
from typing import Optional

class Policy(BaseModel):
    id: str
    name: str
    category: str
    premium: int
    sum_insured: Optional[int]
    waiting_period: str
    claim_settlement: str
    room_rent: str
    health_checkup: bool
