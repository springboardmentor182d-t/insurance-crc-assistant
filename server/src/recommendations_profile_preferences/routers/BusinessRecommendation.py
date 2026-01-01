from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.recommendations_profile_preferences.models.business_policy import BusinessPolicy
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(
    prefix="/api/business",
    tags=["Business Recommendation"]
)

# ---------- REQUEST ----------
class BusinessRecRequest(BaseModel):
    businessType: str
    businessSize: str
    coverage: List[str]
    assetsValue: Optional[int] = None
    premium: Optional[int] = None


# ---------- RECOMMEND ----------
@router.post("/recommendations")
def recommend_business_policies(
    payload: BusinessRecRequest,
    db: Session = Depends(get_db)
):
    policies = db.query(BusinessPolicy).all()
    results = []

    for p in policies:
        score = 0

        if p.business_type == payload.businessType:
            score += 3

        if p.business_size == payload.businessSize:
            score += 2

        match_count = len(set(p.coverage or []) & set(payload.coverage))
        score += match_count * 2

        if payload.premium and p.premium > payload.premium:
            continue

        if payload.assetsValue and p.sum_insured < payload.assetsValue:
            continue

        results.append({
            "id": p.id,
            "name": p.name,
            "coverage": p.coverage,
            "premium": p.premium,
            "sum_insured": p.sum_insured,
            "score": score,
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results
