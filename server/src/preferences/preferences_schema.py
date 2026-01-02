from pydantic import BaseModel
from typing import List

class PreferencesBase(BaseModel):
    insurance_types: List[str]
    annual_budget: int
    desired_coverage: int
    risk_appetite: str


class PreferencesCreate(PreferencesBase):
    pass


class PreferencesResponse(PreferencesBase):
    class Config:
        from_attributes = True
