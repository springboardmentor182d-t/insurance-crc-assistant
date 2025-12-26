from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.travel_progress import TravelProgress

router = APIRouter(
    prefix="/api/travel",
    tags=["Travel Progress"]
)

@router.post("/save-progress")
def save_travel_progress(data: dict, db: Session = Depends(get_db)):
    db.query(TravelProgress).delete()

    progress = TravelProgress(**data)
    db.add(progress)
    db.commit()

    return {"success": True}

@router.get("/load-progress")
def load_travel_progress(db: Session = Depends(get_db)):
    return {"data": db.query(TravelProgress).first()}
