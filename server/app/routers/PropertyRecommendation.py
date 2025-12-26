from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.property_policy import PropertyPolicy

router = APIRouter(
    prefix="/api/property",
    tags=["Property Recommendations"]
)

@router.post("/recommendations")
def recommend_properties(data: dict, db: Session = Depends(get_db)):

    query = db.query(PropertyPolicy)

    if data.get("propertyType"):
        query = query.filter(PropertyPolicy.property_type == data["propertyType"])

    if data.get("ownership"):
        query = query.filter(PropertyPolicy.ownership == data["ownership"])

    if data.get("coverage"):
        query = query.filter(PropertyPolicy.coverage == data["coverage"])

    if data.get("riskZone"):
        query = query.filter(PropertyPolicy.risk_zone == data["riskZone"])

    policies = query.all()

    # Relax filters if no match
    if not policies:
        policies = db.query(PropertyPolicy).all()

    # Sort by premium closeness
    premium = data.get("premium")
    if premium:
        policies = sorted(policies, key=lambda p: abs(p.premium - premium))

    return [
        {
            "id": p.id,
            "name": p.name,
            "coverage": p.coverage,
            "property_type": p.property_type,
            "premium": p.premium,
            "sum_insured": p.sum_insured,
            "score": 100 - abs(p.premium - premium) // 100 if premium else 80
        }
        for p in policies[:5]
    ]
