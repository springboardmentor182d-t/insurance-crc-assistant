from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.health_progress import HealthProgress

router = APIRouter(
    prefix="/api/health",
    tags=["Health Progress"]
)

@router.post("/save-progress")
def save_progress(data: dict, db: Session = Depends(get_db)):
    """
    Saves latest health questionnaire progress.
    Only one active progress row is kept.
    """

    # clear previous progress
    db.query(HealthProgress).delete()

    progress = HealthProgress(
        policy=data.get("policy"),
        adults=data.get("adults"),
        children=data.get("children"),
        medicalHistory=data.get("medicalHistory", []),

        goal=data.get("goal"),
        premium=data.get("premium"),

        # 🔥 NEW FIELDS
        ageGroup=data.get("ageGroup"),
        cityTier=data.get("cityTier"),
        roomPreference=data.get("roomPreference"),
        waitingTolerance=data.get("waitingTolerance"),
        hospitalPreference=data.get("hospitalPreference"),
    )

    db.add(progress)
    db.commit()

    return {"success": True}


@router.get("/load-progress")
def load_progress(db: Session = Depends(get_db)):
    """
    Loads last saved questionnaire progress.
    """
    progress = db.query(HealthProgress).first()
    return {"data": progress}
