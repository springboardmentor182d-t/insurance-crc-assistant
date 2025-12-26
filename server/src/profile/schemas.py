from pydantic import BaseModel
from typing import Optional
from datetime import date

class ProfileBase(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None         
    phone: Optional[str] = None
    dob: Optional[date] = None
    address: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    user_id: int

    class Config:
        from_attributes = True

class QuickStatsResponse(BaseModel):
    active_policies: int
    claims_filed: int
    member_since: int