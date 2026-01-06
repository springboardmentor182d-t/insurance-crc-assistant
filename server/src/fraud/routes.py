from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database.database import get_db
from src.fraud.service import get_claim_with_policy
from src.fraud.service import get_fraud_dashboard_data
from src.fraud.service import (
    mark_claim_safe,
    reject_claim,
    request_more_info
)
router = APIRouter(prefix="/fraud", tags=["Fraud"])


@router.get("/claim/{claim_id}")
async def get_fraud_claim_details(
    claim_id: int,
    db: AsyncSession = Depends(get_db),
):
    data = await get_claim_with_policy(db, claim_id)

    if not data:
        raise HTTPException(status_code=404, detail="Claim not found")

    return data
@router.get("/dashboard")
async def fraud_dashboard(db = Depends(get_db)):
    data = await get_fraud_dashboard_data(db)
    return data
@router.post("/claim/{claim_id}/mark-safe")
async def mark_safe(claim_id: int, db = Depends(get_db)):
    claim = await mark_claim_safe(db, claim_id)

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    return {
        "message": "Claim marked as safe",
        "claim_id": claim.id,
        "status": claim.status.value
    }
@router.post("/claim/{claim_id}/reject")
async def reject(claim_id: int, db = Depends(get_db)):
    claim = await reject_claim(db, claim_id)

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    return {
        "message": "Claim rejected",
        "claim_id": claim.id,
        "status": claim.status.value
    }
@router.post("/claim/{claim_id}/request-info")
async def request_info(claim_id: int, db = Depends(get_db)):
    claim = await request_more_info(db, claim_id)

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    return {
        "message": "Requested additional documents",
        "claim_id": claim.id,
        "status": claim.status.value
    }
