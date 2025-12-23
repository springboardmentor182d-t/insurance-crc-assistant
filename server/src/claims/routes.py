from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from src.database.dependencies import get_db
from src.claims.service import get_all_claims, get_claim_by_number
from src.claims.schemas import ClaimListResponse, ClaimDetailResponse

router = APIRouter(prefix="/claims", tags=["Claims"])


@router.get("/", response_model=list[ClaimListResponse])
async def list_claims(db: AsyncSession = Depends(get_db)):
    claims = await get_all_claims(db)

    response = []
    for claim in claims:
        response.append({
            "claim_number": claim.claim_number,
            "policy_name": claim.policy_name,
            "policy_type": claim.policy_type,
            "policy_number": claim.policy_number,
            "filed_date": claim.filed_date,
            "amount": float(claim.amount),
            "status": claim.status.value,
        })

    return response



@router.get("/{claim_number}", response_model=ClaimDetailResponse)
async def claim_details(claim_number: str, db: AsyncSession = Depends(get_db)):
    claim = await get_claim_by_number(db, claim_number)

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    return {
        "claim_number": claim.claim_number,
        "policy_name": claim.policy_name,
        "policy_type": claim.policy_type,
        "policy_number": claim.policy_number,
        "filed_date": claim.filed_date,
        "amount": float(claim.amount),
        "status": claim.status.value,
        "description": claim.description,
        "location": claim.location,
        "claim_type": claim.claim_type,
        "payable_amount": float(claim.payable_amount) if claim.payable_amount else None,
    }

