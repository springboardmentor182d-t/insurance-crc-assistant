from fastapi import APIRouter
from src.policies.controller import router as policy_router

api_router = APIRouter()
api_router.include_router(policy_router)
