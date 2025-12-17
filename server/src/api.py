from fastapi import APIRouter
from src.dashboard.controller import router as dashboard_router

router = APIRouter()
router.include_router(dashboard_router)


