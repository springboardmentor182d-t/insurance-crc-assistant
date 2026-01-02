from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import SessionLocal
from src.users.models import Policy, UserPolicy

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

    premium_ranges = [
        {"label": "Below ₹500", "min": 0, "max": 500},
        {"label": "₹500 - ₹700", "min": 500, "max": 700},
        {"label": "Above ₹700", "min": 700, "max": 100000},
    ]

    return {
        "types": policy_types,
        "ranges": premium_ranges
    }

@router.get("/{policy_id}")
def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        return {"detail": "Policy not found"}
    return policy
