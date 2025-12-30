from sqlalchemy.orm import Session
from ..entities.claims import Claim, ClaimDocument
from .schemas import ClaimCreate
import uuid

def create_claim(db: Session, claim_data: ClaimCreate):
    # Generate a unique claim number
    claim_number = f"CLM-{uuid.uuid4().hex[:8].upper()}"
    
    db_claim = Claim(
        user_policy_id=claim_data.user_policy_id,
        claim_number=claim_number,
        claim_type=claim_data.claim_type,
        incident_date=claim_data.incident_date,
        amount_claimed=claim_data.amount_claimed,
        status="Pending"
    )
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    return db_claim

def get_claims(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Claim).offset(skip).limit(limit).all()

def get_claim(db: Session, claim_id: int):
    return db.query(Claim).filter(Claim.id == claim_id).first()

def add_claim_document(db: Session, claim_id: int, file_url: str, doc_type: str):
    db_doc = ClaimDocument(
        claim_id=claim_id,
        file_url=file_url,
        doc_type=doc_type
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc
