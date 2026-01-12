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


@router.get("/types", response_model=List[str])
def get_policy_types(db: Session = Depends(get_db)) -> List[str]:
    """Return all unique policy types"""
    types = db.query(Policy.policy_type).distinct().all()
    return [t[0] for t in types]


@router.get("/filters", response_model=Dict[str, List[Dict]])
def get_policy_filters(db: Session = Depends(get_db)) -> Dict[str, List[Dict]]:
    """Return filters for frontend"""
    types = db.query(Policy.policy_type).distinct().all()

    return {
        "types": [t[0] for t in types],
        "ranges": [
            {"label": "Below ₹5L", "min": 0, "max": 500000},
            {"label": "₹5L - ₹10L", "min": 500001, "max": 1000000},
            {"label": "Above ₹10L", "min": 1000001, "max": 2000000},
        ],
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
