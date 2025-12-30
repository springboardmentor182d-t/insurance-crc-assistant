from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil

from ..database.core import get_db
from . import service, schemas

router = APIRouter(prefix="/api/claims", tags=["claims"])

@router.post("/", response_model=schemas.ClaimSchema)
def create_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    return service.create_claim(db=db, claim_data=claim)

@router.get("/", response_model=List[schemas.ClaimSchema])
def read_claims(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    claims = service.get_claims(db, skip=skip, limit=limit)
    return claims

@router.post("/{claim_id}/documents")
async def upload_document(
    claim_id: int, 
    doc_type: str,
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    claim = service.get_claim(db, claim_id=claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    
    # In a real app, we'd upload to S3. Here we'll just save locally.
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
        
    file_path = os.path.join(upload_dir, f"{claim_id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return service.add_claim_document(
        db=db, 
        claim_id=claim_id, 
        file_url=file_path, 
        doc_type=doc_type
    )
