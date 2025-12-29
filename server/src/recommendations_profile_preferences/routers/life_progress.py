from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.recommendations_profile_preferences.models.life_progress import LifeProgress

router = APIRouter(
    prefix="/api/life",
    tags=["Life Progress"]
)

@router.post("/save-progress")
def save_life_progress(data: dict, db: Session = Depends(get_db)):
    """
    Saves latest life insurance questionnaire progress.
    Only one active progress row is maintained.
    """

    # Clear previous progress
    db.query(LifeProgress).delete()

    progress = LifeProgress(
        policyType=data.get("policyType"),
        dependents=data.get("dependents"),

        ageGroup=data.get("ageGroup"),
        employment=data.get("employment"),
        income=data.get("income"),

        goal=data.get("goal"),
        riskAppetite=data.get("riskAppetite"),

        coverage=data.get("coverage"),
        tenure=data.get("tenure"),

        hasLoans=data.get("hasLoans"),

        tobacco=data.get("tobacco"),
        alcohol=data.get("alcohol"),

        premium=data.get("premium"),
    )

    db.add(progress)
    db.commit()

    return {"success": True}


@router.get("/load-progress")
def load_life_progress(db: Session = Depends(get_db)):
    """
    Loads last saved life questionnaire progress.
    """
    progress = db.query(LifeProgress).first()
    return {"data": progress}
