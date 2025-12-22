from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime

class Provider(BaseModel):
    id: int
    name: str
    country: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

class Policy(BaseModel):
    id: int
    provider_id: int
    policy_type: str
    title: str
    coverage: Dict = Field(default_factory=dict)  # avoids shared mutable dict
    premium: Optional[float] = None
    term_months: Optional[int] = None
    deductible: Optional[float] = None
    tnc_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
