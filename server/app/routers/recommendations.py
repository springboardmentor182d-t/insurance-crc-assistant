from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from sqlalchemy import text

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"]
)

@router.get("/{profile_id}")
def get_recommendations(profile_id: int, db: Session = Depends(get_db)):
    query = text("""
        SELECT
          p.id AS policy_id,
          p.name,
          (p.pricing_rules->>'base_premium')::INT AS premium,
          p.coverage_details->>'category' AS category,

          jsonb_build_object(
            'risk', lpr.risk_score,
            'budget_ok', (
              (pref.budget_preferences->>'monthly_max')::INT
              >= (p.pricing_rules->>'base_premium')::INT
            ),
            'goal', pref.goal_preferences->>'goal'
          ) AS explanation

        FROM policies p
        JOIN latest_profile_risk lpr
          ON lpr.profile_id = :profile_id
        JOIN profile_preferences pref
          ON pref.profile_id = :profile_id

        WHERE p.is_active = true

          -- risk filter
          AND (p.eligibility_rules->'allowed_risk_levels') ? lpr.risk_score

          -- budget filter
          AND (
            (pref.budget_preferences->>'monthly_max')::INT
            >= (p.pricing_rules->>'base_premium')::INT
          )

          -- ✅ CATEGORY FILTER (THE FIX)
          AND (
            p.coverage_details->>'category' IN (
              SELECT jsonb_array_elements_text(
                pref.coverage_preferences->'categories'
              )
            )
          )

        ORDER BY premium ASC;
    """)

    result = db.execute(
        query,
        {"profile_id": profile_id}
    ).mappings().all()

    return {
        "profile_id": profile_id,
        "recommendations": result
    }
