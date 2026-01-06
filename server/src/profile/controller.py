from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date

from src.database.database import get_db
from src.entities.claim import Claim
from .models import UserProfile
from .schemas import (
    ProfileCreate,
    ProfileResponse,
    QuickStatsResponse,
)

router = APIRouter(prefix="/profile", tags=["Profile"])

USER_ID = 1  # TEMP until auth is implemented


# -------------------------------------------------
# GET PROFILE
# -------------------------------------------------
@router.get("", response_model=ProfileResponse)
async def get_profile(db: AsyncSession = Depends(get_db)):
    # ---------------------------
    # FETCH PROFILE
    # ---------------------------
    result = await db.execute(
        select(UserProfile).where(UserProfile.user_id == USER_ID)
    )
    profile = result.scalar_one_or_none()

    if not profile:
        profile = UserProfile(user_id=USER_ID)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)

    # ---------------------------
    # REAL CLAIM COUNT
    # (claims not yet user-linked)
    # ---------------------------
    claims_filed = await db.scalar(
        select(func.count(Claim.id))
    )

    # ---------------------------
    # MEMBER SINCE
    # ---------------------------
    member_since = (
        profile.created_at.year
        if hasattr(profile, "created_at") and profile.created_at
        else date.today().year
    )

    # ---------------------------
    # QUICK STATS (NO DUMMY DATA)
    # ---------------------------
    profile.quick_stats = QuickStatsResponse(
        active_policies=0,          # policy entity not implemented yet
        claims_filed=claims_filed or 0,
        member_since=member_since,
    )

    return profile


# -------------------------------------------------
# SAVE PROFILE
# -------------------------------------------------
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

    # ---------------------------
    # UPDATE PROFILE FIELDS
    # ---------------------------
    profile.full_name = data.full_name
    profile.email = data.email
    profile.phone = data.phone
    profile.dob = data.dob
    profile.address = data.address

    await db.commit()
    await db.refresh(profile)

    # ---------------------------
    # REFRESH QUICK STATS
    # ---------------------------
    claims_filed = await db.scalar(
        select(func.count(Claim.id))
    )

    member_since = (
        profile.created_at.year
        if hasattr(profile, "created_at") and profile.created_at
        else date.today().year
    )

    profile.quick_stats = QuickStatsResponse(
        active_policies=0,
        claims_filed=claims_filed or 0,
        member_since=member_since,
    )

    return profile