from fastapi import APIRouter

from fastapi import  Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.profile.models import UserPreferences




from src.profile.data import (
    get_profile,
    save_profile,
)



from fastapi import Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.profile.models import UserPreferences


router = APIRouter()

@router.get("/profile")
def fetch_profile():
    return get_profile()

@router.put("/profile")
def update_profile(data: dict):
    return save_profile(data)

# @router.get("/preferences")
# def fetch_preferences():
#     return get_preferences()

# @router.put("/preferences")
# def update_preferences(data: dict):
#     return save_preferences(data)

# @router.get("/preferences")
# def fetch_preferences(db: Session = Depends(get_db)):
#     prefs = db.query(UserPreferences).first()
#     return prefs

# @router.put("/preferences")
# def update_preferences(data: dict, db: Session = Depends(get_db)):
#     prefs = db.query(UserPreferences).first()

#     if not prefs:
#         prefs = UserPreferences(**data, user_id=1)  # temp user_id
#         db.add(prefs)
#     else:
#         for key, value in data.items():
#             setattr(prefs, key, value)

#     db.commit()
#     db.refresh(prefs)
#     return prefs






@router.get("/preferences")
def get_preferences(db: Session = Depends(get_db)):
    prefs = db.query(UserPreferences).first()
    return prefs

@router.put("/preferences")
def save_preferences(data: dict, db: Session = Depends(get_db)):
    prefs = db.query(UserPreferences).first()

    if not prefs:
        prefs = UserPreferences(**data)
        db.add(prefs)
    else:
        for key, value in data.items():
            setattr(prefs, key, value)

    db.commit()         
    db.refresh(prefs)
    return prefs

