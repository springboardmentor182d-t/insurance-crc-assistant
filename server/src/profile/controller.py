from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import date

from src.database.database import get_db
from .models import UserProfile
from .schemas import ProfileCreate, ProfileResponse

router = APIRouter(prefix="/profile", tags=["Profile"])

USER_ID = 1  # TEMP until auth


@router.get("", response_model=ProfileResponse)
async def get_profile(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserProfile).where(UserProfile.user_id == USER_ID)
    )
    profile = result.scalar_one_or_none()

    if not profile:
        profile = UserProfile(user_id=USER_ID)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)

    # ✅ QUICK STATS (TEMP SAFE VALUES)
    profile.quick_stats = {
        "active_policies": 3,
        "claims_filed": 2,
        "member_since": 2024
    }

    return profile


@router.post("", response_model=ProfileResponse)
async def save_profile(
    data: ProfileCreate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserProfile).where(UserProfile.user_id == USER_ID)
    )
    profile = result.scalar_one_or_none()

    if not profile:
        profile = UserProfile(user_id=USER_ID)
        db.add(profile)

    profile.full_name = data.full_name
    profile.email = data.email
    profile.phone = data.phone
    profile.dob = data.dob
    profile.address = data.address

    await db.commit()
    await db.refresh(profile)

    # ✅ RETURN QUICK STATS AGAIN
    profile.quick_stats = {
        "active_policies": 3,
        "claims_filed": 2,
        "member_since": 2024
    }

    return profile
