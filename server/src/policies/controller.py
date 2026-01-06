from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from src.database.database import get_db
from src.entities.policy import Policy   # ✅ FIXED IMPORT
from .schemas import PolicyResponse
from .service import list_policies

router = APIRouter(prefix="/policies", tags=["Policies"])


@router.get("", response_model=List[PolicyResponse])
async def get_policies(
    policy_type: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    return await list_policies(db, policy_type)


@router.get("/{policy_id}", response_model=PolicyResponse)
async def get_policy_by_id(
    policy_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Policy).where(Policy.id == policy_id)
    )
    policy = result.scalar_one_or_none()

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    return policy
