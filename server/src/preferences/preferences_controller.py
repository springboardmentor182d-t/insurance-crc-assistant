from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.database.database import get_db
from .preferences_model import UserPreference
from .preferences_schema import PreferencesBase

router = APIRouter(prefix="/users", tags=["Preferences"])

USER_ID = 1  # temp until JWT


@router.get("/preferences")
async def get_preferences(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()
    return pref


@router.post("/preferences")
async def save_preferences(
    data: PreferencesBase,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(UserPreference).where(UserPreference.user_id == USER_ID)
    )
    pref = result.scalar_one_or_none()

    if pref:
        pref.insurance_types = data.insuranceTypes
        pref.annual_budget = data.annualBudget
        pref.desired_coverage = data.desiredCoverage
        pref.risk_appetite = data.riskAppetite
    else:
        pref = UserPreference(
            user_id=USER_ID,
            insurance_types=data.insuranceTypes,
            annual_budget=data.annualBudget,
            desired_coverage=data.desiredCoverage,
            risk_appetite=data.riskAppetite,
        )
        db.add(pref)

    await db.commit()
    return {"message": "Preferences saved successfully"}
