from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, List
from collections import defaultdict

from src.database.core import SessionLocal
from src.users.models import Policy

# Import scoring & recommendation functions
from .reccomentation import compute_final_scores, recommend_best_per_category

router = APIRouter()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------- Helper ----------------------
def orm_to_dict(obj) -> Dict:
    """Convert SQLAlchemy object to dictionary"""
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}


# ---------------------- Routes ----------------------

@router.get("/", response_model=List[Dict])
def get_policies(db: Session = Depends(get_db)) -> List[Dict]:
    """
    Returns all policies with:
    - final_score
    - recommended tag (best per category)
    """
    policies = db.query(Policy).all()
    policy_dicts = [orm_to_dict(p) for p in policies]

    # Compute scores
    scored_policies = compute_final_scores(policy_dicts)

    # Find best per category
    best_per_category = recommend_best_per_category(scored_policies)

    # Tag recommended policies
    for p in scored_policies:
        p["recommended"] = (
            p["policy_type"] in best_per_category
            and best_per_category[p["policy_type"]]["id"] == p["id"]
        )

    return scored_policies

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



@router.get("/{policy_id}", response_model=Dict)
def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)) -> Dict:
    """
    Returns a single policy with:
    - final_score
    - recommended tag
    """
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        return {"detail": "Policy not found"}

    policy_dict = orm_to_dict(policy)

   
    all_policies = [orm_to_dict(p) for p in db.query(Policy).all()]
    all_scored = compute_final_scores(all_policies)
    best_per_category = recommend_best_per_category(all_scored)

   
    policy_scored = next((p for p in all_scored if p["id"] == policy_dict["id"]), None)
    policy_dict["final_score"] = policy_scored["final_score"] if policy_scored else None

    
    policy_dict["recommended"] = (
        policy_dict["policy_type"] in best_per_category
        and best_per_category[policy_dict["policy_type"]]["id"] == policy_dict["id"]
    )

    return policy_dict
