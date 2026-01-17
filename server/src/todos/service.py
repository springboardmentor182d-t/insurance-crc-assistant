from typing import List, Optional
from datetime import date
from fastapi import HTTPException
from .models import Claim, ClaimBase
claims_db: List[Claim] = [
    Claim(
        id="CLM001",
        policy_holder="Alice Johnson",
        policy_type="Auto",
        submission_date=date(2023, 10, 20),
        amount=1200.50,
        status="Pending",
        is_fraud_suspected=False,
    ),
    Claim(
        id="CLM002",
        policy_holder="Bob Williams",
        policy_type="Home",
        submission_date=date(2023, 10, 18),
        amount=5500.00,
        status="Approved",
        is_fraud_suspected=False,
    ),
]

def get_claim_or_404(claim_id: str) -> Claim:
    for claim in claims_db:
        if claim.id == claim_id:
            return claim
    raise HTTPException(status_code=404, detail="Claim not found")

def list_claims(search: Optional[str], status: Optional[str], policy_type: Optional[str]):
    results = claims_db

    if search:
        s = search.lower()
        results = [c for c in results if s in c.id.lower() or s in c.policy_holder.lower()]

    if status:
        results = [c for c in results if c.status.lower() == status.lower()]

    if policy_type:
        results = [c for c in results if c.policy_type.lower() == policy_type.lower()]

    return results

def create_claim(claim: ClaimBase):
    new_id = f"CLM{len(claims_db) + 1:03d}"
    new_claim = Claim(id=new_id, **claim.dict())
    claims_db.append(new_claim)
    return new_claim

def delete_claim(claim_id: str):
    claim = get_claim_or_404(claim_id)
    claims_db.remove(claim)
