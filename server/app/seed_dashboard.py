from datetime import date
from server.app.database import SessionLocal
from server.app.models.user import User
from server.app.models.policy import Policy
from server.app.models.claim import Claim
from server.app.models.profile import UserProfile
from server.app.models.premium_analysis import PremiumAnalysis
from server.app.models.recommendation import Recommendation

def run():
    db = SessionLocal()

    # 1. User (get-or-create)
    user = db.query(User).filter_by(email="john@example.com").first()
    if not user:
        user = User(username="john", email="john@example.com", role="customer")
        db.add(user)
        db.commit()
        db.refresh(user)

    # 2. Profile (get-or-create)
    profile = db.query(UserProfile).filter_by(id=user.id).first()
    if not profile:
        profile = UserProfile(
            id=user.id,
            dob=date(1990, 5, 20),
            address="Hyderabad",
            categories="Auto, Health",
            budget=3000,
            risk="Low",
            family_size=3,
            goal="Save for retirement"
        )
        db.add(profile)

    # 3. Policy (get-or-create)
    policy = db.query(Policy).filter_by(policy_number="AUTO-123").first()
    if not policy:
        policy = Policy(
            user_id=user.id,
            policy_type="Auto",
            premium=145,
            status="Active",
            renewal_date=date(2026, 8, 12),
            policy_number="AUTO-123"
        )
        db.add(policy)
        db.commit()
        db.refresh(policy)

    # 4. Claim (get-or-create)
    claim = db.query(Claim).filter_by(policy_id=policy.id).first()
    if not claim:
        claim = Claim(
            policy_id=policy.id,
            claim_date=date(2025, 5, 1),
            claim_amount=5000,
            status="Approved"
        )
        db.add(claim)

    # 5. Premium Analysis (get-or-create)
    analysis = db.query(PremiumAnalysis).filter_by(user_id=user.id, category="Auto").first()
    if not analysis:
        analysis = PremiumAnalysis(
            user_id=user.id,
            category="Auto",
            market_cost=200,
            user_cost=145,
            frequency="monthly"
        )
        db.add(analysis)

    # 6. Recommendation (get-or-create)
    rec = db.query(Recommendation).filter_by(user_id=user.id, title="Upgrade to Comprehensive Auto Plan").first()
    if not rec:
        rec = Recommendation(
            user_id=user.id,
            title="Upgrade to Comprehensive Auto Plan",
            description="Covers theft, fire, and natural disasters.",
            link="http://example.com/auto-plan"
        )
        db.add(rec)

    # Final commit
    db.commit()
    db.close()  # close

if __name__ == "__main__":
    run()