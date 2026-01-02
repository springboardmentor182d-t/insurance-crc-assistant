from fastapi import APIRouter, HTTPException
from .service import get_all_policies, get_policy_by_id

router = APIRouter(prefix="/policies", tags=["Policies"])

@router.get("")
def fetch_policies(category: str | None = None):
    return get_all_policies(category)

@router.get("/{policy_id}")
def get_policy(policy_id: int):
    policy = get_policy_by_id(policy_id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy

@router.get("/compare")
def compare_policies(ids: list[int]):
    policies = get_all_policies()
    return [p for p in policies if p["id"] in ids]
