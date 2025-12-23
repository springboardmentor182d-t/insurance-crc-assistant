from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.entities.claim import Claim


async def get_all_claims(db: AsyncSession):
    stmt = select(Claim).order_by(Claim.filed_date.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_claim_by_number(db: AsyncSession, claim_number: str):
    stmt = select(Claim).where(Claim.claim_number == claim_number)
    result = await db.execute(stmt)
    return result.scalars().first()
