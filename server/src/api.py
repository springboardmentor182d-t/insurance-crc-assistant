from fastapi import APIRouter
from src.comparison.controller import router as policies_router
from src.dashboard.controller import router as dashboard_router
api_router = APIRouter()
api_router.include_router(policies_router)
api_router.include_router(dashboard_router)


