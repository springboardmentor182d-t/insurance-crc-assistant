from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class ProfileCreate(BaseModel):
    dob: Optional[date]
    address: Optional[str]
    categories: List[str] = []
    budget: Optional[int]
    risk: Optional[str]
    familySize: Optional[int]
    goal: Optional[str]
