
from fastapi import APIRouter

router = APIRouter()

@router.post("/create")
def create_claim():
    return {"message": "Claim created successfully"}

@router.get("/status/{claim_id}")
def get_claim_status(claim_id: int):
    return {"claim_id": claim_id, "status": "under_review"}
