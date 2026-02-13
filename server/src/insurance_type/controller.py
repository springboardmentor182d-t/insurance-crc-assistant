from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, case

from src.database.database import get_db
from src.entities.insurance_type import InsuranceType

router = APIRouter(
    prefix="/insurance_type",
    tags=["Insurance Types"]
)

@router.get("/")
async def get_insurance_types(
    db: AsyncSession = Depends(get_db)
):
    # 🔹 Custom display order (business order)
    order_case = case(
        (InsuranceType.name == "Health", 1),
        (InsuranceType.name == "Life", 2),
        (InsuranceType.name == "Auto", 3),
        (InsuranceType.name == "Travel", 4),
        (InsuranceType.name == "Home", 5),
        else_=99,
    )

    result = await db.execute(
        select(InsuranceType).order_by(order_case)
    )

    types = result.scalars().all()

    return [
        {
            "id": t.id,
            "name": t.name
        }
        for t in types
    ]
