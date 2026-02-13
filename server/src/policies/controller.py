from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from src.database.database import get_db
from src.entities.policy import Policy
from .schemas import PolicyResponse
from .service import (
    list_policies,
    calculate_policy_score,
    calculate_provider_rating,
)

router = APIRouter(prefix="/policies", tags=["Policies"])


@router.get("", response_model=List[PolicyResponse])
async def get_policies(
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    return await list_policies(db, category)


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

    rating = calculate_provider_rating(policy)

    return {
        "id": policy.id,
        "name": policy.name,
        "provider": policy.provider,
        "category": policy.category,
        "premium": int(policy.premium),
        "coverage": int(policy.coverage),
        "term": policy.term,
        "deductible": policy.deductible,
        "waitingPeriod": policy.waitingPeriod,
        "roomRent": policy.roomRent,
        "benefits": policy.benefits or [],
        "exclusions": policy.exclusions or [],
        "score": calculate_policy_score(policy),
        "claimSettlement": rating["claimSettlement"],
        "customerService": rating["customerService"],
        "tat": rating["tat"],
    }
