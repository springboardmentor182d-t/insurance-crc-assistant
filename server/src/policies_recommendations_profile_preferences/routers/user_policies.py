from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from src.database.core import get_db
from src.auth.dependencies import get_current_user
from src.policies_recommendations_profile_preferences.schemas.user_policies import (
    PolicyCreate,
    PolicyUpdate,
)
from src.policies_recommendations_profile_preferences.services.user_services import (
    create_policy,
    get_active_policies,
    update_policy,
    delete_policy,
)

router = APIRouter(prefix="/policies", tags=["Policies"])


@router.post("/")
def add_policy(
    policy: PolicyCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return create_policy(db, user.id, policy)


@router.get("/")
def my_policies(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return get_active_policies(db, user.id)


@router.put("/{policy_id}")
def edit_policy(
    policy_id: UUID,
    policy: PolicyUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    updated = update_policy(db, user.id, policy_id, policy)
    if not updated:
        raise HTTPException(status_code=404, detail="Policy not found")
    return updated


@router.delete("/{policy_id}")
def remove_policy(
    policy_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    success = delete_policy(db, user.id, policy_id)
    if not success:
        raise HTTPException(status_code=404, detail="Policy not found")
    return {"message": "Policy deleted successfully"}
