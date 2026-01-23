from sqlalchemy.orm import Session
from typing import List
from datetime import date, datetime  # <-- add at TOP of file
from src.policies_recommendations_profile_preferences.models.profile import Profile
from src.policies_recommendations_profile_preferences.models.profile_category import ProfileCategory
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.services.premium_analysis_service import (
    generate_premium_analysis,
)


# =========================================================
# 🔥 RISK LEVEL CALCULATION
# =========================================================
def calculate_risk_level(
    profile: Profile,
    premium_rows: List[PremiumAnalysis],
) -> str:
    """
    Risk is based on:
    1. Coverage gap (user < market)
    2. Family size
    3. Insurance goal
    """

    score = 0

    # 1️⃣ Coverage gap (MOST IMPORTANT)
    for p in premium_rows:
        if p.user_cost < p.market_cost:
            score += 1

    # 2️⃣ Family size risk
    if profile.family_size >= 4:
        score += 2
    elif profile.family_size >= 2:
        score += 1

    # 3️⃣ Goal-based risk
    if profile.goal == "Family Protection":
        score += 1

    # 🎯 FINAL CLASSIFICATION
    if score >= 6:
        return "High"
    elif score >= 3:
        return "Medium"
    return "Low"


# =========================================================
# 💾 SAVE / UPDATE PROFILE (UPSERT)
# =========================================================
def save_profile(
    db: Session,
    user_id: int,
    data,
    avatar_path: str | None = None,
):
    # ---------- FETCH OR CREATE PROFILE ----------
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if not profile:
        profile = Profile(user_id=user_id)
        db.add(profile)
        db.flush()

    # ---------- BASIC INFO ----------
    if data.dob:
        try:
            profile.dob = date.fromisoformat(data.dob)  # YYYY-MM-DD
        except ValueError:
            profile.dob = datetime.strptime(data.dob, "%d-%m-%Y").date()

    profile.name = data.name
    profile.address = data.address
    profile.family_size = data.familySize

    # ⚠️ IMPORTANT:
    # UI sends ANNUAL budget (even though field name says monthly)
    profile.monthly_budget = data.monthlyBudget

    profile.goal = data.goal

    if avatar_path:
        profile.avatar = avatar_path

    # ---------- CATEGORIES ----------
    db.query(ProfileCategory).filter(
        ProfileCategory.profile_id == profile.id
    ).delete()

    for cat in data.categories:
        db.add(ProfileCategory(profile_id=profile.id, category=cat))

    db.commit()
    db.refresh(profile)

    # ---------- PREMIUM ANALYSIS ----------
    premium_rows = generate_premium_analysis(
        db=db,
        user_id=user_id,
        annual_budget=profile.monthly_budget,
        categories=data.categories,
    )

    # ---------- 🔥 AUTO RISK LEVEL ----------
    profile.risk_level = calculate_risk_level(profile, premium_rows)
    db.commit()

    # ---------- RESPONSE ----------
    return {
        "id": profile.id,
        "name": profile.name,
        "dob": profile.dob.isoformat() if profile.dob else None,
        "address": profile.address,
        "familySize": profile.family_size,
        "monthlyBudget": profile.monthly_budget,
        "goal": profile.goal,
        "riskLevel": profile.risk_level,
        "avatar": profile.avatar,
        "categories": data.categories,
    }


# =========================================================
# 📥 LOAD PROFILE
# =========================================================
def get_profile(db: Session, user_id: int):
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    # ✅ DO NOT AUTO-CREATE
    if not profile:
        return None

    categories = db.query(ProfileCategory.category).filter(
        ProfileCategory.profile_id == profile.id
    ).all()

    return {
        "user_id": profile.user_id,
        "id": profile.id,
        "name": profile.name,
        "dob": profile.dob.isoformat() if profile.dob else None,
        "address": profile.address,
        "familySize": profile.family_size,
        "monthlyBudget": profile.monthly_budget,
        "goal": profile.goal,
        "riskLevel": profile.risk_level,
        "avatar": profile.avatar,
        "categories": [c[0] for c in categories],
    }



