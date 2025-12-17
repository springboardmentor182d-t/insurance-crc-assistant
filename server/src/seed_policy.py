from src.database import SessionLocal
from src.models import Policy

db = SessionLocal()

policies = [
    Policy(
        name="Health Shield Pro",
        provider="SecureLife Insurance",
        type="Health",
        premium=15000,
        coverage=500000,
    ),
    Policy(
        name="Life Protect Plus",
        provider="Guardian Insurance",
        type="Life",
        premium=18000,
        coverage=1000000,
    ),
    Policy(
        name="Auto Guard Complete",
        provider="DriveSecure",
        type="Auto",
        premium=12000,
        coverage=300000,
    ),
]

db.add_all(policies)
db.commit()
db.close()

print("✅ Policies seeded successfully")
