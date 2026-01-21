from sqlalchemy.orm import Session

from src.policies_recommendations_profile_preferences.services.profile_adapter import ProfileAdapter
from src.policies_recommendations_profile_preferences.services.health_scoring import recommend_health_policies
from src.policies_recommendations_profile_preferences.services.life_scoring import recommend_life_policies
from src.policies_recommendations_profile_preferences.services.motor_scoring import recommend_motor_policies
from src.policies_recommendations_profile_preferences.services.home_scoring import recommend_home_policies
from src.policies_recommendations_profile_preferences.services.travel_scoring import recommend_travel_policies
from src.policies_recommendations_profile_preferences.services.fire_scoring import recommend_fire_policies
from src.policies_recommendations_profile_preferences.services.business_scoring import recommend_business_policies


CATEGORY_SERVICE_MAP = {
    "Health": recommend_health_policies,
    "Life": recommend_life_policies,
    "Auto": recommend_motor_policies,
    "Home": recommend_home_policies,
    "Travel": recommend_travel_policies,
    "Fire": recommend_fire_policies,
    "Business": recommend_business_policies,
}


def extract_premium(policy):
    for field in [
        "monthly_premium",
        "min_monthly_premium",
        "min_annual_premium",
        "base_premium",
        "min_premium",
    ]:
        if hasattr(policy, field) and getattr(policy, field):
            return float(getattr(policy, field))
    return 0.0


def get_recommendations_for_profile(db: Session, profile: dict):
    """
    FINAL FIX:
    - Works even if profile categories are missing or lowercase
    - NO dependency on recommendations table
    """

    user_input = ProfileAdapter(profile)
    recommendations = []

    categories = profile.get("categories")

    # 🔑 GUARANTEED FALLBACK
    if not categories or not isinstance(categories, list):
        categories = [
            "Health",
            "Life",
            "Auto",
            "Home",
            "Travel",
            "Fire",
            "Business",
        ]

    for raw_category in categories:
        category = raw_category.strip().title()
        service = CATEGORY_SERVICE_MAP.get(category)

        if not service:
            continue

        results = service(db, user_input)

        for item in results:
            policy = item["policy"]

            recommendations.append({
                "policy_id": policy.id,
                "name": getattr(policy, "policy_name", ""),
                "category": category,
                "premium": extract_premium(policy),
                "explanation": {
                    "goal": profile.get("goal"),
                    "risk": profile.get("riskLevel"),
                },
            })

    return recommendations
