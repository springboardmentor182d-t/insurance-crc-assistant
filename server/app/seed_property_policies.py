from app.database import SessionLocal
from app.models.property_policy import PropertyPolicy

db = SessionLocal()

db.query(PropertyPolicy).delete()

db.add_all([
    PropertyPolicy(
        name="Standard Home Secure",
        property_type="Apartment",
        ownership="Owned",
        coverage="Structure",
        risk_zone="Low",
        premium=8000,
        sum_insured=3000000,
    ),
    PropertyPolicy(
        name="Premium Home Shield",
        property_type="Independent House",
        ownership="Owned",
        coverage="Contents",
        risk_zone="Medium",
        premium=15000,
        sum_insured=5000000,
    ),
])

db.commit()
db.close()

print("✅ Property policies seeded")
