from pydantic import BaseModel
from typing import List

class PreferencesBase(BaseModel):
    insuranceTypes: List[str]
    annualBudget: int
    desiredCoverage: int
    riskAppetite: str

class PreferencesResponse(PreferencesBase):
    pass
