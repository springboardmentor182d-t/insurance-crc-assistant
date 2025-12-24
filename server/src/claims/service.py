# Business logic placeholder
from typing import List
from src.claims.models import ClaimCreate, ClaimResponse


# Temporary storage (later DB use pannalaam)
CLAIMS_DB = []


def create_claim(data: ClaimCreate) -> ClaimResponse:
    claim_id = len(CLAIMS_DB) + 1

    claim = {
        "claim_id": claim_id,
        "policy_id": data.policy_id,
        "incident_type": data.incident_type,
        "incident_date": data.incident_date,
        "description": data.description,
        "claim_amount": data.claim_amount,
        "status": "SUBMITTED"
    }

    CLAIMS_DB.append(claim)

    return ClaimResponse(
        claim_id=claim_id,
        status="SUCCESS",
        message="Claim submitted successfully"
    )


def get_all_claims() -> List[dict]:
    return CLAIMS_DB
