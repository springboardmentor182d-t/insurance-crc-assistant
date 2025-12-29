from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.database import get_db
import json
from pathlib import Path

router = APIRouter(prefix="/api/profile", tags=["Profile"])

UPLOAD_DIR = Path("uploads/avatars")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


# ================= GET PROFILE =================
@router.get("/{profile_id}")
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    profile = db.execute(
        text("""
            SELECT name, dob, address, family_size, avatar_path
            FROM user_profile WHERE id = :id
        """),
        {"id": profile_id}
    ).mappings().first()

    prefs = db.execute(
        text("""
            SELECT budget_preferences, goal_preferences, coverage_preferences
            FROM profile_preferences WHERE profile_id = :id
        """),
        {"id": profile_id}
    ).mappings().first()

    return {
        "name": profile["name"] if profile else "John Doe",
        "dob": profile["dob"] if profile else "",
        "address": profile["address"] if profile else "",
        "familySize": profile["family_size"] if profile else 1,
        "avatar": profile["avatar_path"] if profile else None,
        "monthlyBudget": prefs["budget_preferences"]["monthly_max"] if prefs else 15000,
        "goal": prefs["goal_preferences"]["goal"] if prefs else "Family Protection",
        "categories": prefs["coverage_preferences"]["categories"] if prefs else [],
        "riskLevel": "Medium",
    }


# ================= SAVE PROFILE =================
@router.post("/{profile_id}")
def save_profile(
    profile_id: int,
    name: str = Form(None),
    dob: str = Form(None),
    address: str = Form(None),
    family_size: int = Form(None),

    # 🔴 IMPORTANT FIX: NOT REQUIRED ANYMORE
    preferences: str = Form(None),

    avatar: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    # ensure profile row exists
    db.execute(
        text("INSERT INTO user_profile (id) VALUES (:id) ON CONFLICT (id) DO NOTHING"),
        {"id": profile_id},
    )

    avatar_path = None
    if avatar:
        ext = avatar.filename.split(".")[-1]
        filename = f"profile_{profile_id}.{ext}"
        path = UPLOAD_DIR / filename
        with open(path, "wb") as f:
            f.write(avatar.file.read())
        avatar_path = f"/uploads/avatars/{filename}"

    db.execute(
        text("""
            UPDATE user_profile SET
              name = :name,
              dob = :dob,
              address = :address,
              family_size = :family_size,
              avatar_path = COALESCE(:avatar_path, avatar_path)
            WHERE id = :id
        """),
        {
            "id": profile_id,
            "name": name,
            "dob": dob,
            "address": address,
            "family_size": family_size,
            "avatar_path": avatar_path,
        },
    )

    # 🔴 SAFE preferences handling
    prefs = json.loads(preferences) if preferences else {
        "categories": [],
        "monthly_budget": 15000,
        "goal": "Family Protection",
    }

    db.execute(
        text("""
            INSERT INTO profile_preferences
            (profile_id, budget_preferences, goal_preferences, coverage_preferences)
            VALUES (:id, :budget, :goal, :coverage)
            ON CONFLICT (profile_id) DO UPDATE SET
              budget_preferences = EXCLUDED.budget_preferences,
              goal_preferences = EXCLUDED.goal_preferences,
              coverage_preferences = EXCLUDED.coverage_preferences
        """),
        {
            "id": profile_id,
            "budget": json.dumps({"monthly_max": prefs["monthly_budget"]}),
            "goal": json.dumps({"goal": prefs["goal"]}),
            "coverage": json.dumps({"categories": prefs["categories"]}),
        },
    )

    db.commit()
    return {"success": True}
