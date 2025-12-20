from app.database import SessionLocal
from app.models.user import User
from app.models.policy import Policy
from app.models.claim import Claim
from datetime import date

# Create a new DB session
db = SessionLocal()

# 1. Create a user
user = User(
    username="john",
    email="john@example.com",
    role="customer"
)
db.add(user)
db.commit()
db.refresh(user)

# 2. Create a policy linked to the user
policy = Policy(
    user_id=user.id,
    policy_type="Auto",
    premium=145,
    status="Active",
    renewal_date=date(2024, 8, 12),
    policy_number="AUTO-123"
)
db.add(policy)
db.commit()
db.refresh(policy)

# 3. Create a claim linked to the policy
claim = Claim(
    policy_id=policy.id,
    claim_date=date(2024, 5, 1),
    claim_amount=5000,
    status="Approved"
)
db.add(claim)

# Final commit
db.commit()
db.close()