from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List, Dict
from src.entities.policy import Policy
import random


async def list_policies(
    db: AsyncSession,
    category: Optional[str] = None
) -> List[Dict]:
    stmt = select(Policy)

    if category:
        stmt = stmt.where(Policy.category == category)

    result = await db.execute(stmt)
    policies = result.scalars().all()

    # 🔹 Add dynamic score (NOT stored in DB)
    response = []
    for p in policies:
        policy_data = {
            "id": p.id,
            "name": p.name,
            "provider": p.provider,
            "category": p.category,
            "premium": p.premium,
            "coverage": p.coverage,
            "term": p.term,
            "deductible": p.deductible,
            "waitingPeriod": p.waitingPeriod,
            "roomRent": p.roomRent,
            "benefits": p.benefits,
            "exclusions": p.exclusions,
            "score": round(random.uniform(7.0, 9.5), 1)  # ✅ dynamic
        }
        response.append(policy_data)

    return response
