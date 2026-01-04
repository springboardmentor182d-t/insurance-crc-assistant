from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.database.database import get_db
from src.preferences.preferences_model import UserPreference
from src.preferences.preferences_schema import (
    PreferencesCreate,
    PreferencesResponse,
)

router = APIRouter(prefix="/preferences", tags=["Preferences"])

# TEMP until authentication is implemented
USER_ID = 1


# -------------------------------------------------
# INSURANCE TYPES (STATIC MASTER DATA)
# -------------------------------------------------
@router.get("/insurance-types")
async def get_insurance_types():
    return ["Health", "Life", "Auto", "Travel", "Home"]


# -------------------------------------------------
# GET USER PREFERENCES
# -------------------------------------------------
@router.get("", response_model=PreferencesResponse)
async def get_preferences(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    # ✅ SAFE DEFAULTS IF NO RECORD EXISTS
    if not pref:
        return PreferencesResponse(
            insurance_types=[],
            annual_budget=0,
            desired_coverage=0,
            risk_appetite="Medium",
        )

    return PreferencesResponse(
        insurance_types=(
            pref.insurance_types.split(",")
            if pref.insurance_types
            else []
        ),
        annual_budget=pref.annual_budget or 0,
        desired_coverage=pref.desired_coverage or 0,
        risk_appetite=pref.risk_appetite or "Medium",
    )


# -------------------------------------------------
# SAVE USER PREFERENCES
# -------------------------------------------------
@router.post("", response_model=PreferencesResponse)
async def save_preferences(
    data: PreferencesCreate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    if not pref:
        pref = UserPreference(user_id=USER_ID)
        db.add(pref)

    # ✅ SAVE DATA
    pref.insurance_types = ",".join(data.insurance_types)
    pref.annual_budget = data.annual_budget
    pref.desired_coverage = data.desired_coverage
    pref.risk_appetite = data.risk_appetite

    await db.commit()
    await db.refresh(pref)

    return PreferencesResponse(
        insurance_types=data.insurance_types,
        annual_budget=data.annual_budget,
        desired_coverage=data.desired_coverage,
        risk_appetite=data.risk_appetite,
    )
