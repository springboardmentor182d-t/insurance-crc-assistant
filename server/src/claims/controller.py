from fastapi import APIRouter, UploadFile, File, Form
from typing import List
import os
import shutil

router = APIRouter()

# 📂 upload folder
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_claim_documents(
    claim_id: int = Form(...),
    files: List[UploadFile] = File(...)
):
    saved_files = []

    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        saved_files.append(file.filename)

    return {
        "message": "Documents uploaded successfully",
        "claim_id": claim_id,
        "files": saved_files
    }


from pydantic import BaseModel
from datetime import datetime

# 🔹 TEMP STORAGE (DB illa – internship level ok)
CLAIMS_DB = []

class ClaimCreate(BaseModel):
    policyName: str
    policyNumber: str
    incidentDate: str
    incidentType: str
    location: str
    amount: str
    description: str


@router.post("/create")
def create_claim(claim: ClaimCreate):
    claim_id = len(CLAIMS_DB) + 1

    new_claim = {
        "id": claim_id,
        "status": "Under Review",
        "createdAt": datetime.now().isoformat(),
        **claim.dict()
    }

    CLAIMS_DB.append(new_claim)

    return {
        "message": "Claim created successfully",
        "claimId": claim_id
    }


@router.get("/list")
def list_claims():
    return CLAIMS_DB
