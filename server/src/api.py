from fastapi import APIRouter
from server.src.main import get_policies, get_policy_details # Import your policy endpoints

api_router = APIRouter()

# Register your policy routes
api_router.include_router(get_policies, prefix="/policies", tags=["policies"])
api_router.include_router(get_policy_details, prefix="/policies", tags=["policies"])