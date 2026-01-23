from sqlalchemy.orm import Session
from fastapi import HTTPException
from .models import Claim, ClaimDocument
from src.policies_recommendations_profile_preferences.models.user_policy import UserPolicy
from sqlalchemy.orm import joinedload


def create_claim(db: Session, data, user_id: int):
    # 1️⃣ Validate policy ownership
    policy = (
        db.query(UserPolicy)
        .filter(
            UserPolicy.id == data.user_policy_id,
            UserPolicy.user_id == user_id
        )
        .first()
    )

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    # 2️⃣ Validate active policy
    if policy.status != "active":
        raise HTTPException(
            status_code=400,
            detail="Claims can only be filed for active policies"
        )

    # 3️⃣ Create claim (DRAFT)
    claim = Claim(
        user_id=user_id,
        user_policy_id=data.user_policy_id,
        claim_type=data.claim_type,
        incident_date=data.incident_date,
        description=data.description,
        amount_claimed=data.amount_claimed,
        status="draft"
    )

    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim

def get_all_claims(db: Session, user_id: int):
    return (
        db.query(Claim)
        .options(joinedload(Claim.user_policy))  # ✅ THIS FIXES POLICY NAME
        .filter(Claim.user_id == user_id)
        .all()
    )


def get_claim(db: Session, claim_id: int, user_id: int):
    return (
        db.query(Claim)
        .options(joinedload(Claim.user_policy))  # ✅ THIS FIXES REVIEW/TRACK
        .filter(
            Claim.id == claim_id,
            Claim.user_id == user_id
        )
        .first()
    )



def save_document(db: Session, claim_id: int, filename: str, path: str):
    doc = ClaimDocument(
        claim_id=claim_id,
        file_name=filename,
        file_path=path
    )
    db.add(doc)
    db.commit()

