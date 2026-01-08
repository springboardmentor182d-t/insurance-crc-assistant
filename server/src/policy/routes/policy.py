from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.users.models import Policy, UserPolicy

router = APIRouter()

@router.get("/")
def get_policies(db: Session = Depends(get_db)):
    return db.query(Policy).all()

@router.get("/types")
def get_policy_types(db: Session = Depends(get_db)):
    types = db.query(Policy.policy_type).distinct().all()
    return [t[0] for t in types]

@router.get("/filters")
def get_policy_filters(db: Session = Depends(get_db)):
    types = db.query(Policy.policy_type).distinct().all()
    policy_types = [t[0] for t in types]

    coverage_ranges = [
        {"label": "Below ₹5L", "min": 0, "max": 500000},
        {"label": "₹5L - ₹10L", "min": 500001, "max": 1000000},
        {"label": "Above ₹10L", "min": 1000001, "max": 2000000},
    ]

    return {
        "types": policy_types,
        "ranges": coverage_ranges
    }

@router.get("/details/{policy_id}")
def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)):
    policy = (
        db.query(Policy)
        .join(UserPolicy, UserPolicy.policy_id == Policy.id)
        .filter(Policy.id == policy_id)
        .first()
    )

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    return policy
