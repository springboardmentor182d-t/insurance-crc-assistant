from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List, Dict
from src.entities.policy import Policy
import random


def calculate_policy_score(policy: Policy) -> float:
    base = 6.5

    if policy.coverage and policy.coverage >= 500_000:
        base += 1.0

    if policy.premium and policy.premium <= 20_000:
        base += 1.0

    if policy.waitingPeriod in ("None", None):
        base += 0.5

    return round(min(base + random.uniform(0, 0.5), 9.5), 1)


def calculate_provider_rating(_: Policy) -> Dict:
    return {
        "claimSettlement": random.randint(85, 99),
        "customerService": round(random.uniform(3.8, 4.9), 1),
        "tat": random.randint(3, 10),
    }


async def list_policies(
    db: AsyncSession,
    category: Optional[str] = None,
) -> List[Dict]:

    stmt = select(Policy)
    if category:
        stmt = stmt.where(Policy.category == category)

    result = await db.execute(stmt)
    policies = result.scalars().all()

    response = []

    for p in policies:
        rating = calculate_provider_rating(p)

        response.append({
            "id": p.id,
            "name": p.name,
            "provider": p.provider,
            "category": p.category,
            "premium": int(p.premium),
            "coverage": int(p.coverage),
            "term": p.term,
            "deductible": p.deductible,
            "waitingPeriod": p.waitingPeriod,
            "roomRent": p.roomRent,
            "benefits": p.benefits or [],
            "exclusions": p.exclusions or [],
            "score": calculate_policy_score(p),
            "claimSettlement": rating["claimSettlement"],
            "customerService": rating["customerService"],
            "tat": rating["tat"],
        })

    return response
