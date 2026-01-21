from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.auth.dependencies import get_current_user
from src.policies_recommendations_profile_preferences.models.saved_quote import SavedQuote

router = APIRouter(prefix="/saved-quotes", tags=["Saved Quotes"])


@router.post("")
@router.post("")
def save_quote(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):

    policy_type = payload.get("policy_type")

    # ✅ HARD VALIDATION (VERY IMPORTANT)
    allowed_types = {
        "health",
        "motor",
        "life",
        "travel",
        "home",
        "business",
        "fire",
    }

    if not policy_type or policy_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid policy_type: {policy_type}"
        )

    quote = SavedQuote(
        user_id=user.id,
        policy_type=policy_type,   # ✅ TRUSTED & VERIFIED
        policy_id=payload["policy_id"],
        policy_name=payload["policy_name"],
        insurer_name=payload["insurer_name"],
        tenure=payload["tenure"],
        base_premium=payload["base_premium"],
        gst=payload["gst"],
        total_premium=payload["total_premium"],
    )

    db.add(quote)
    db.commit()
    db.refresh(quote)

    return {"message": "Quote saved successfully"}



@router.get("")
def get_saved_quotes(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return (
        db.query(SavedQuote)
        .filter(SavedQuote.user_id == user.id)
        .order_by(SavedQuote.created_at.desc())
        .all()
    )


@router.delete("/{quote_id}")
def delete_saved_quote(quote_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    quote = (
        db.query(SavedQuote)
        .filter(SavedQuote.id == quote_id, SavedQuote.user_id == user.id)
        .first()
    )

    if not quote:
        raise HTTPException(404, "Quote not found")

    db.delete(quote)
    db.commit()

    return {"message": "Quote deleted"}
