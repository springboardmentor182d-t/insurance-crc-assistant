from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil, os
from src.Admin.services.fraud_engine import evaluate_claim_fraud
from src.database.core import get_db
from src.auth.dependencies import get_current_user
from src.users.models import User
from datetime import datetime
from .schemas import ClaimCreate, ClaimResponse
from .service import (
    create_claim,
    get_all_claims,
    get_claim,
    save_document,
)

router = APIRouter(tags=["Claims"])

UPLOAD_DIR = "uploaded_docs"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# =========================
# STEP 0 – Active policies
# =========================
@router.get("/active-policies")
def get_active_policies(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    from src.policies_recommendations_profile_preferences.models.user_policy import UserPolicy

    return (
        db.query(UserPolicy)
        .filter(
            UserPolicy.user_id == current_user.id,
            UserPolicy.status == "active"
        )
        .all()
    )


# =========================
# STEP 1 – Create Claim
# =========================
@router.post("/", response_model=ClaimResponse)
def file_claim(
    data: ClaimCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_claim(db, data, current_user.id)


# =========================
# STEP 2 – Upload Documents
# =========================
@router.post("/{claim_id}/documents")
def upload_document(
    claim_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    claim = get_claim(db, claim_id, current_user.id)
    if not claim:
        raise HTTPException(404, "Claim not found")

    if claim.status != "draft":
        raise HTTPException(400, "Cannot upload documents after submission")

    path = f"{UPLOAD_DIR}/{claim_id}_{file.filename}"
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    save_document(db, claim_id, file.filename, path)
    return {"message": "Document uploaded"}


# =========================
# STEP 3 – Submit Claim
# =========================
@router.post("/{claim_id}/submit")
def submit_claim_api(
    claim_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    claim = get_claim(db, claim_id, current_user.id)
    if not claim:
        raise HTTPException(404, "Claim not found")

    if claim.status != "draft":
        raise HTTPException(400, "Claim already submitted")

    claim.status = "submitted"
    claim.submitted_at = datetime.utcnow()

    db.commit()
    db.refresh(claim)

    # ✅ FRAUD CHECK (SAFE)
    try:
        evaluate_claim_fraud(db, claim)
    except Exception as e:
        print("❌ Fraud engine error:", e)

    return claim



# =========================
# STEP 4 – Track Claims
# =========================
@router.get("/", response_model=list[ClaimResponse])
def list_claims(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_all_claims(db, current_user.id)



@router.get("/{claim_id}", response_model=ClaimResponse)
def track_claim(
    claim_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    claim = get_claim(db, claim_id, current_user.id)
    if not claim:
        raise HTTPException(404, "Claim not found")
    return claim

