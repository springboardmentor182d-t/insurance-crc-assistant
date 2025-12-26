from src.database.core import SessionLocal
from src.users.models import UserPolicy

db = SessionLocal()

purchases = [
    UserPolicy(user_id=1, policy_id=1),
    UserPolicy(user_id=1, policy_id=3),
    UserPolicy(user_id=1, policy_id=5),
]

db.add_all(purchases)
db.commit()
db.close()

print("✅ User policies inserted")
