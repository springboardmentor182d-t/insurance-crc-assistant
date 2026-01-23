from sqlalchemy.orm import Session
from uuid import UUID
from src.policies_recommendations_profile_preferences.models.user_policy import UserPolicy


def create_policy(db: Session, user_id: int, policy):
    new_policy = UserPolicy(
        user_id=user_id,
        **policy.dict()
    )
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    return new_policy


def get_active_policies(db: Session, user_id: int):
    return (
        db.query(UserPolicy)
        .filter(
            UserPolicy.user_id == user_id,
            UserPolicy.status == "active"
        )
        .order_by(UserPolicy.renewal_date.asc())
        .all()
    )



def update_policy(db: Session, user_id: int, policy_id: UUID, policy):
    existing = (
        db.query(UserPolicy)
        .filter(UserPolicy.id == policy_id, UserPolicy.user_id == user_id)
        .first()
    )

    if not existing:
        return None

    for key, value in policy.dict().items():
        setattr(existing, key, value)

    db.commit()
    db.refresh(existing)
    return existing


def delete_policy(db: Session, user_id: int, policy_id: UUID):
    policy = (
        db.query(UserPolicy)
        .filter(UserPolicy.id == policy_id, UserPolicy.user_id == user_id)
        .first()
    )

    if not policy:
        return False

    db.delete(policy)
    db.commit()
    return True
