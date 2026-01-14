from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

from src.recommendations_profile_preferences.database import get_db
from src.recommendations_profile_preferences.models.profile import UserProfile

# ================= SCHEMA =================
class ProfileCreate(BaseModel):
    dob: Optional[date] = None
    address: Optional[str] = None
    categories: List[str] = []
    budget: Optional[int] = None
    risk: Optional[str] = None
    familySize: Optional[int] = None
    goal: Optional[str] = None

    class Config:
        orm_mode = True


# ================= ROUTER =================
router = APIRouter(prefix="/api/profile", tags=["Profile"])


@router.get("/")
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(UserProfile).first()
    if not profile:
        return {}

    return {
        "dob": profile.dob,
        "address": profile.address,
        "categories": profile.categories.split(",") if profile.categories else [],
        "budget": profile.budget,
        "risk": profile.risk,
        "familySize": profile.family_size,
        "goal": profile.goal,
    }


@router.post("/")
def save_profile(data: ProfileCreate, db: Session = Depends(get_db)):
    profile = db.query(UserProfile).first()
    categories_str = ",".join(data.categories)

    if not profile:
        profile = UserProfile(
            dob=data.dob,
            address=data.address,
            categories=categories_str,
            budget=data.budget,
            risk=data.risk,
            family_size=data.familySize,
            goal=data.goal,
        )
        db.add(profile)
    else:
        profile.dob = data.dob
        profile.address = data.address
        profile.categories = categories_str
        profile.budget = data.budget
        profile.risk = data.risk
        profile.family_size = data.familySize
        profile.goal = data.goal

    db.commit()
    return {"status": "saved"}
