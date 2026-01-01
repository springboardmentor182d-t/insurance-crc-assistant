from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.recommendations_profile_preferences.models.fire_policy import FirePolicy
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/fire", tags=["Fire Recommendation"])

class FireRecRequest(BaseModel):
    propertyType: str
    constructionType: str
    coverage: List[str]
    totalSum: Optional[int] = None
    premium: Optional[int] = None

@router.post("/recommendations")
def recommend_fire_policies(payload: FireRecRequest, db: Session = Depends(get_db)):
    policies = db.query(FirePolicy).all()

    results = []
    seen_ids = set()

    for policy in policies:
        score = 0

        if policy.property_type == payload.propertyType:
            score += 3

        if policy.construction_type == payload.constructionType:
            score += 2

        match_count = len(set(policy.coverage or []) & set(payload.coverage))
        score += match_count * 2

        if payload.premium and policy.premium > payload.premium:
            continue

        if payload.totalSum and policy.sum_insured < payload.totalSum:
            continue

        if policy.id in seen_ids:
            continue
        seen_ids.add(policy.id)

        if score > 0:
            results.append({
                "id": policy.id,
                "name": policy.name,
                "coverage": policy.coverage,
                "premium": policy.premium,
                "sum_insured": policy.sum_insured,
                "score": score
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results
