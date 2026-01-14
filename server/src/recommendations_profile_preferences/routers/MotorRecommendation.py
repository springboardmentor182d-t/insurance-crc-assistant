from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.recommendations_profile_preferences.models.motor_policy import MotorPolicy

router = APIRouter(prefix="/api/motor", tags=["Motor Recommendation"])

@router.post("/recommendations/")
def recommend_motor_policies(data: dict, db: Session = Depends(get_db)):

    vehicle_type = data["vehicleType"]
    fuel_type = data["fuelType"]
    vehicle_age = data["vehicleAge"]
    plan = data["plan"]
    premium = data["premium"]

    policies = (
        db.query(MotorPolicy)
        .filter(
            MotorPolicy.vehicle_type == vehicle_type,
            MotorPolicy.fuel_type == fuel_type,
            MotorPolicy.plan_type == plan,
            MotorPolicy.max_vehicle_age >= vehicle_age,
        )
        .all()
    )

    # Relax if none found
    if not policies:
        policies = db.query(MotorPolicy).filter(
            MotorPolicy.vehicle_type == vehicle_type
        ).all()

    # Sort by closest premium (PYTHON SIDE)
    policies = sorted(
        policies,
        key=lambda p: abs(p.premium - premium)
    )[:5]

    return [
        {
            "id": p.id,
            "name": f"{p.company} - {p.name}",
            "premium": p.premium,
            "coverage": p.coverage,
            "plan_type": p.plan_type,
            "vehicle_type": p.vehicle_type,
            "score": 100 - abs(p.premium - premium) // 100,
        }
        for p in policies
    ]
