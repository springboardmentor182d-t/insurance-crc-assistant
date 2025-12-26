from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.motor_progress import MotorProgress

router = APIRouter(prefix="/api/motor", tags=["Motor Progress"])

@router.post("/save-progress")
def save_motor_progress(data: dict, db: Session = Depends(get_db)):
    db.query(MotorProgress).delete()

    progress = MotorProgress(**data)
    db.add(progress)
    db.commit()

    return {"success": True}

@router.get("/load-progress")
def load_motor_progress(db: Session = Depends(get_db)):
    return {"data": db.query(MotorProgress).first()}
