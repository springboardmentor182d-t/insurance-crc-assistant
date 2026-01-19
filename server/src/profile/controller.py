from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict

from src.database.core import get_db
from src.profile.models import UserPreferences
from src.users.models import Policy
from src.profile.data import get_profile, save_profile

router = APIRouter()


@router.get("/profile")
def fetch_profile():
    return get_profile()


@router.put("/profile")
def update_profile(data: dict):
    return save_profile(data)



@router.get("/preferences")
def get_preferences(db: Session = Depends(get_db)):
    prefs = db.query(UserPreferences).first()
    return prefs


@router.put("/preferences")
def save_preferences(data: dict, db: Session = Depends(get_db)):
    prefs = db.query(UserPreferences).first()
    if not prefs:
        prefs = UserPreferences(**data)
        db.add(prefs)
    else:
        for key, value in data.items():
            setattr(prefs, key, value)
    db.commit()
    db.refresh(prefs)
    return prefs



def orm_to_dict(obj) -> Dict:
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}


def map_risk_level(risk_str: str) -> int:
    mapping = {"low": 25, "medium": 50, "high": 75}
    return mapping.get(risk_str.lower(), 50)



def compute_final_scores(policies: List[Dict], user_prefs: dict) -> List[Dict]:
    scored = []
    coverage_interests = user_prefs.get("coverageInterests", {})
    preferred_providers = user_prefs.get("preferredProviders", [])
    min_p = user_prefs.get("premiumRange", {}).get("min", 0)
    max_p = user_prefs.get("premiumRange", {}).get("max", 1_000_000)

    for p in policies:
        score = 0

      
        policy_risk = map_risk_level(p.get("risk_level", "medium"))
        user_risk = user_prefs.get("riskTolerance", 50)
        score += 100 - abs(policy_risk - user_risk)

       
        policy_coverages = [c.strip().lower() for c in (p.get("add_ons") or "").split(",")]
        for cov, interested in coverage_interests.items():
            if interested and cov.lower() in policy_coverages:
                score += 20

        
        premium = p.get("annual_premium", 0)
        if min_p <= premium <= max_p:
            score += 10

       
        if preferred_providers and p.get("policy_number") in preferred_providers:
            score += 15

     
        if user_prefs.get("autoClaim", False) and p.get("auto_claim_enabled", False):
            score += 5

        scored.append({**p, "final_score": score})

    return scored


def recommend_best_per_category(scored_policies: List[Dict]) -> List[Dict]:
    best = {}
    for p in scored_policies:
        type_ = p.get("policy_type")
        if type_ not in best or p["final_score"] > best[type_]["final_score"]:
            best[type_] = p

    recommended = list(best.values())
    for p in recommended:
        p["recommended"] = True
    return recommended



@router.get("/recommendations", response_model=List[Dict])
def recommend_policies(db: Session = Depends(get_db)):
   
  
    prefs_obj = db.query(UserPreferences).first()
    if not prefs_obj:
        return {"detail": "User preferences not found"}
    user_prefs = orm_to_dict(prefs_obj)

   
    coverage_interests = user_prefs.get("coverageInterests", {})
    allowed_types = [k.lower() for k, v in coverage_interests.items() if v]

    if not allowed_types:
        return {"detail": "No coverage interests selected"}

    min_premium = user_prefs.get("premiumRange", {}).get("min", 0)
    max_premium = user_prefs.get("premiumRange", {}).get("max", 1_000_000)

   
    all_policies = [orm_to_dict(p) for p in db.query(Policy).all()]

 
    filtered = []
    for p in all_policies:
        policy_type = (p.get("policy_type") or "").lower()
        policy_type = policy_type.replace("insurance", "").strip()
        if policy_type not in allowed_types:
            continue

        premium = p.get("annual_premium", 0)
        if not (min_premium <= premium <= max_premium):
            continue

        filtered.append(p)

    if not filtered:
        return {"detail": "No policies match your coverage interests and premium range"}

    
    scored = compute_final_scores(filtered, user_prefs)
    recommended = recommend_best_per_category(scored)
    return recommended
