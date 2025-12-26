from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.business_progress import BusinessProgress
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(
    prefix="/api/business",
    tags=["Business Progress"]
)

# ---------- REQUEST SCHEMA ----------
class BusinessProgressRequest(BaseModel):
    businessType: str
    businessSize: str
    revenue: Optional[int] = None
    address: Optional[str] = None
    coverage: List[str]
    assetsValue: Optional[int] = None
    existingInsurance: str
    premium: int


# ---------- SAVE ----------
@router.post("/save-progress")
def save_business_progress(
    payload: BusinessProgressRequest,
    db: Session = Depends(get_db)
):
    db.query(BusinessProgress).delete(synchronize_session=False)

    progress = BusinessProgress(
        businessType=payload.businessType,
        businessSize=payload.businessSize,
        revenue=payload.revenue,
        address=payload.address,
        coverage=payload.coverage or [],
        assetsValue=payload.assetsValue,
        existingInsurance=payload.existingInsurance,
        premium=payload.premium,
    )

    db.add(progress)
    db.commit()

    return {"success": True}


# ---------- LOAD ----------
@router.get("/load-progress")
def load_business_progress(db: Session = Depends(get_db)):
    p = db.query(BusinessProgress).first()

    if not p:
        return {"data": None}

    return {
        "data": {
            "businessType": p.businessType,
            "businessSize": p.businessSize,
            "revenue": p.revenue,
            "address": p.address,
            "coverage": p.coverage,
            "assetsValue": p.assetsValue,
            "existingInsurance": p.existingInsurance,
            "premium": p.premium,
        }
    }
