from app.database import SessionLocal
from app.models.user import User
from app.models.policy import Policy
from app.models.claim import Claim

db = SessionLocal()
user = User(username="john", email="john@example.com", role="customer")
db.add(user)
db.commit()
db.refresh(user)

policy = Policy(user_id=user.id, policy_type="Auto", premium=145, status="Active", renewal_date="2024-08-12", policy_number="AUTO-123")
db.add(policy)

claim = Claim(user_id=user.id, policy_id=policy.id, claim_date="2024-05-01", claim_amount=5000, status="Approved")
db.add(claim)

db.commit()
db.close()