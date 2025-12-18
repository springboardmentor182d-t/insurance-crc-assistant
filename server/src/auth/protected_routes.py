# app/protected_routes.py
from fastapi import APIRouter, Depends
from src.database.dependencies import require_role

router = APIRouter(prefix="/api", tags=["protected"])


@router.get("/admin-only")
async def admin_only(current_user=Depends(require_role("admin"))):
    return {
        "message": f"Hello Admin {current_user.email}"
    }


@router.get("/editor-or-owner")
async def editor_or_owner(current_user=Depends(require_role("editor", "owner"))):
    return {
        "message": f"Hello {current_user.role.name}"
    }
