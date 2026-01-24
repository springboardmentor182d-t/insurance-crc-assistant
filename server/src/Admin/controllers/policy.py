from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session

from src.database.core import SessionLocal
from src.policies_recommendations_profile_preferences.models.business_policy import BusinessPolicy
from src.policies_recommendations_profile_preferences.models.health_policy import HealthPolicy
from src.policies_recommendations_profile_preferences.models.life_policy import LifePolicy
from src.policies_recommendations_profile_preferences.models.fire_policy import FirePolicy
from src.policies_recommendations_profile_preferences.models.motor_policy import MotorPolicy
from src.policies_recommendations_profile_preferences.models.home_policy import HomePolicy
from src.policies_recommendations_profile_preferences.models.travel_policy import TravelPolicy

router = APIRouter(prefix="/admin/policies", tags=["Policy Management"])

model_map = {
    "business": BusinessPolicy,
    "health": HealthPolicy,
    "life": LifePolicy,
    "fire": FirePolicy,
    "motor": MotorPolicy,
    "home": HomePolicy,
    "travel": TravelPolicy,
}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_policies(
    policy_type: str = Query("all"),
    db: Session = Depends(get_db),
):
    results = []

    def add(items, type_name, premium_field, frequency):
        for p in items:
            results.append({
                "id": p.id,
                "policy_name": p.policy_name,
                "type": type_name,
                "premium": float(getattr(p, premium_field)),
                "premium_frequency": frequency,  # ✅ NEW
                "status": p.status,
            })

    if policy_type in ["all", "business"]:
        add(
            db.query(BusinessPolicy).all(),
            "Business",
            "base_premium",
            "annual",
        )

    if policy_type in ["all", "health"]:
        add(
            db.query(HealthPolicy).all(),
            "Health",
            "monthly_premium",
            "monthly",
        )

    if policy_type in ["all", "life"]:
        add(
            db.query(LifePolicy).all(),
            "Life",
            "min_monthly_premium",
            "monthly",
        )

    if policy_type in ["all", "fire"]:
        add(
            db.query(FirePolicy).all(),
            "Fire",
            "base_premium",
            "annual",
        )

    if policy_type in ["all", "motor"]:
        add(
            db.query(MotorPolicy).all(),
            "Motor",
            "min_annual_premium",
            "annual",
        )

    if policy_type in ["all", "home"]:
        add(
            db.query(HomePolicy).all(),
            "Home",
            "min_annual_premium",
            "annual",
        )

    if policy_type in ["all", "travel"]:
        add(
            db.query(TravelPolicy).all(),
            "Travel",
            "min_premium",
            "annual",
        )

    return results

@router.get("/{policy_type}/{policy_id}")
def get_policy(policy_type: str, policy_id: int, db: Session = Depends(get_db)):
    model = model_map.get(policy_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid policy type")

    policy = db.query(model).filter(model.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    data = policy.__dict__
    data.pop("_sa_instance_state", None)
    return data


@router.put("/{policy_type}/{policy_id}")
def update_policy(
    policy_type: str,
    policy_id: int,
    payload: dict,
    db: Session = Depends(get_db),
):
    model = model_map.get(policy_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid policy type")

    policy = db.query(model).filter(model.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    for key, value in payload.items():
        if hasattr(policy, key) and key not in ["id", "created_at"]:
            setattr(policy, key, value)


    db.commit()
    db.refresh(policy)
    data = policy.__dict__
    data.pop("_sa_instance_state", None)
    return data


@router.delete("/{policy_type}/{policy_id}")
def delete_policy(
    policy_type: str,
    policy_id: int,
    db: Session = Depends(get_db),
):
    model = model_map.get(policy_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid policy type")

    policy = db.query(model).filter(model.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    db.delete(policy)
    db.commit()

    return {"message": "Policy deleted successfully"}

@router.post("/{policy_type}")
def create_policy(
    policy_type: str,
    payload: dict,
    db: Session = Depends(get_db),
):
    model = model_map.get(policy_type)
    if not model:
        raise HTTPException(status_code=400, detail="Invalid policy type")

    # clean empty values
    payload = {k: v for k, v in payload.items() if v not in ["", None]}

    try:
        policy = model(**payload)
        db.add(policy)
        db.commit()
        db.refresh(policy)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    data = policy.__dict__
    data.pop("_sa_instance_state", None)
    return data


