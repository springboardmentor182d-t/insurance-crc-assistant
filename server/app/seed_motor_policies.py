from app.database import SessionLocal
from app.models.motor_policy import MotorPolicy

db = SessionLocal()

# Clear old data
db.query(MotorPolicy).delete()

policies = [
    MotorPolicy(
        company="HDFC Ergo",
        name="Comprehensive Plus",
        vehicle_type="Car",
        fuel_type="Petrol",
        plan_type="Comprehensive",
        coverage="Own Damage + Third Party",
        addons=["Zero Dep", "Roadside Assistance"],
        premium=14500,
        max_vehicle_age=10,
    ),
    MotorPolicy(
        company="ICICI Lombard",
        name="Smart Drive",
        vehicle_type="Car",
        fuel_type="Petrol",
        plan_type="Comprehensive",
        coverage="Full Coverage",
        addons=["Engine Protection"],
        premium=16000,
        max_vehicle_age=15,
    ),
    MotorPolicy(
        company="Bajaj Allianz",
        name="Bike Shield",
        vehicle_type="Bike",
        fuel_type="Petrol",
        plan_type="Comprehensive",
        coverage="Two Wheeler Protection",
        addons=["Zero Dep"],
        premium=4200,
        max_vehicle_age=8,
    ),
]

db.add_all(policies)
db.commit()
db.close()

print("✅ Motor policies inserted successfully")
