from fastapi import APIRouter, Query
from typing import List, Optional

from models.claim_models import (
    Claim,
    ClaimBase,
    ClaimUpdateStatus,
    FraudFlagUpdate,
)
from services.claim_service import (
    claims_db,
    get_claim_or_404,
    list_claims,
    create_claim,
    delete_claim,
)

router = APIRouter(prefix="/claims", tags=["Claims"])

@router.get("", response_model=List[Claim])
def get_claims(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    policy_type: Optional[str] = Query(None),
):
    return list_claims(search, status, policy_type)

@router.get("/{claim_id}", response_model=Claim)
def get_claim(claim_id: str):
    return get_claim_or_404(claim_id)

@router.post("", response_model=Claim, status_code=201)
def add_claim(claim: ClaimBase):
    return create_claim(claim)

@router.patch("/{claim_id}/status", response_model=Claim)
def update_status(claim_id: str, payload: ClaimUpdateStatus):
    claim = get_claim_or_404(claim_id)
    claim.status = payload.status
    return claim

@router.patch("/{claim_id}/fraud", response_model=Claim)
def update_fraud(claim_id: str, payload: FraudFlagUpdate):
    claim = get_claim_or_404(claim_id)
    claim.is_fraud_suspected = payload.is_fraud_suspected
    if payload.is_fraud_suspected and claim.status == "Pending":
        claim.status = "Investigation"
    return claim

@router.delete("/{claim_id}", status_code=204)
def remove_claim(claim_id: str):
    delete_claim(claim_id)
