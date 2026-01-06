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

from src.claims.models import Claim
from datetime import datetime
import uuid

async def create_claim(db, payload):
    claim = Claim(
        claim_number=str(uuid.uuid4()),   # ✅ auto generate
        policy_name=payload.policyName,
        policy_number=payload.policyNumber,
        claim_type=payload.incidentType,
        incident_date=payload.incidentDate,
        location=payload.location,
        amount=payload.amount,
        description=payload.description,
        status="Submitted",
        filed_date=datetime.utcnow()       # ✅ correct field
    )

    db.add(claim)
    await db.commit()
    await db.refresh(claim)

    return claim
