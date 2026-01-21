from sqlalchemy.orm import Session
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.market_premium import MarketPremium


CATEGORY_MAP = {
    "Auto": "Motor",
    "Motor": "Motor",
    "Health": "Health",
    "Life": "Life",
    "Home": "Home",
    "Travel": "Travel",
    "Fire": "Fire",
    "Business": "Business",
}


def generate_premium_analysis(
    db: Session,
    user_id: int,
    annual_budget: int,
    categories: list[str],
):
    # 🔴 Clear old rows
    db.query(PremiumAnalysis).filter(
        PremiumAnalysis.user_id == user_id
    ).delete()

    if not categories or annual_budget <= 0:
        db.commit()
        return []

    # ✅ Convert annual → monthly
    monthly_budget = annual_budget / 12
    per_category_budget = monthly_budget / len(categories)

    premium_rows = []

    for category in categories:
        db_category = CATEGORY_MAP.get(category)
        if not db_category:
            continue

        # Get market monthly premium
        market_row = (
            db.query(MarketPremium)
            .filter(
                MarketPremium.category == db_category,
                MarketPremium.frequency == "monthly",
            )
            .first()
        )

        # Fallback: annual → monthly
        if not market_row:
            annual_row = (
                db.query(MarketPremium)
                .filter(
                    MarketPremium.category == db_category,
                    MarketPremium.frequency == "annual",
                )
                .first()
            )
            market_cost = annual_row.market_cost / 12 if annual_row else 0
        else:
            market_cost = market_row.market_cost

        analysis = PremiumAnalysis(
            user_id=user_id,
            category=db_category,  # 🔥 normalized
            market_cost=round(float(market_cost), 2),
            user_cost=round(float(per_category_budget), 2),
            frequency="monthly",
        )

        db.add(analysis)
        premium_rows.append(analysis)

    db.commit()
    return premium_rows
