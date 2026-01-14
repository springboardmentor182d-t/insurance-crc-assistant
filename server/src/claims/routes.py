from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from src.database.dependencies import get_db
from src.claims.schemas import ClaimListResponse, ClaimDetailResponse,ClaimCreateRequest
from src.claims.service import create_claim
from typing import List
from src.claims.service import (
    get_all_claims,
    get_claim_by_number,
    # create_claim,
    
)
import uuid
from datetime import date
import os,shutil

from src.entities.policy import Policy
from src.claims.models import ClaimDocument,Claim


router = APIRouter(prefix="/claims",tags=["Claims"])


@router.get("/list")
async def list_claims(db: AsyncSession = Depends(get_db)):
    claims = await get_all_claims(db)

    response = []
    for claim in claims:
        response.append({
            "id": claim.id,
            "policyName": claim.policy_name,
            "amount": float(claim.amount),
            "status": claim.status,
            "filedDate": claim.filed_date.isoformat() if claim.filed_date else None
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



 

@router.post("/create")
async def create_claim_api(
    payload: ClaimCreateRequest,
    db: AsyncSession = Depends(get_db)
):
    claim = await create_claim(db, payload)

    return {
        "claimId": claim.id,
        "message": "Claim created successfully"
    }



# # -------------------------
# # UPLOAD DOCUMENTS 
# # -------------------------
@router.post("/upload")
async def upload_documents(
    claim_id: int = Form(...),
    files: List[UploadFile] = File(...),   # ✅ MULTIPLE FILES
    db: AsyncSession = Depends(get_db)      # ✅ DB SESSION
):
    UPLOAD_DIR = "uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    uploaded_files = []

    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        document = ClaimDocument(
            claim_id=claim_id,
            file_name=file.filename,
            file_path=file_path
        )

        db.add(document)
        uploaded_files.append(file.filename)

    await db.commit()

    return {
        "message": "Files uploaded successfully",
        "files": uploaded_files
    }


#policy claims file 


@router.get("/policies")
async def get_policies(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Policy))
    policies = result.scalars().all()

    # frontend-ku match aagara format
    return [
        {
            "id": p.id,
            "name": p.title,
            "insurer": "Insurance Provider",   # optional / static
            "policy_number": f"POL-{p.id}",
            "valid_until": "31 Dec 2026",       # optional
            "icon": "🛡️",
            "theme": "blue"
        }
        for p in policies
    ]
