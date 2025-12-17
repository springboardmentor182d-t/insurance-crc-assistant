from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import UserPreference


router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/preferences")
def save_preferences(data: dict, db: Session = Depends(get_db)):
    pref = db.query(UserPreference).first()

    if not pref:
        pref = UserPreference(**data)
        db.add(pref)
    else:
        for key, value in data.items():
            setattr(pref, key, value)

    db.commit()
    return {"message": "Preferences saved"}
