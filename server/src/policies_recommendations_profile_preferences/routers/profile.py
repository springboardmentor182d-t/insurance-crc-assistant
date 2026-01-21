from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.policies_recommendations_profile_preferences.schemas.profile import ProfileCreate
from src.policies_recommendations_profile_preferences.services.profile_services import (
    save_profile,
    get_profile,
)
from src.auth.dependencies import get_current_user
import json
import os
import uuid

router = APIRouter(prefix="/api/profile", tags=["Profile"])

MEDIA_DIR = "src/policies_recommendations_profile_preferences/static/media"
os.makedirs(MEDIA_DIR, exist_ok=True)

# ✅ FIX: GET WITHOUT TRAILING SLASH
@router.get("")
def load_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_profile(db, current_user.id)

# ✅ POST ALSO WITHOUT TRAILING SLASH
@router.post("", response_model=dict)
def update_profile(
    name: str = Form(None),
    dob: str = Form(None),
    address: str = Form(None),
    family_size: int = Form(1),
    preferences: str = Form(...),
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    pref = json.loads(preferences)

    data = ProfileCreate(
        name=name,
        dob=dob,
        address=address,
        familySize=family_size,
        monthlyBudget=pref.get("monthly_budget"),
        goal=pref.get("goal"),
        categories=pref.get("categories", []),
    )

    avatar_path = None
    if avatar:
        ext = os.path.splitext(avatar.filename)[1]
        filename = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(MEDIA_DIR, filename)

        with open(file_path, "wb") as f:
            f.write(avatar.file.read())

        avatar_path = f"/media/{filename}"

    return save_profile(db, current_user.id, data, avatar_path)
