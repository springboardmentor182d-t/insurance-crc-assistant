from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.property_progress import PropertyProgress

router = APIRouter(
    prefix="/api/property",
    tags=["Property Progress"]
)

@router.post("/save-progress")
def save_property_progress(data: dict, db: Session = Depends(get_db)):
    # single-user style (same as health & life)
    db.query(PropertyProgress).delete()

    progress = PropertyProgress(
        propertyType=data["propertyType"],
        age=data["age"],
        area=data["area"],
        city=data["city"],

        ownership=data["ownership"],
        occupancy=data["occupancy"],
        construction=data["construction"],
        riskZone=data["riskZone"],
        previousClaims=data["previousClaims"],

        coverage=data["coverage"],
        sumInsured=data["sumInsured"],
        security=data["security"],

        premium=data["premium"],
    )

    db.add(progress)
    db.commit()

    return {"success": True}


@router.get("/load-progress")
def load_property_progress(db: Session = Depends(get_db)):
    return {"data": db.query(PropertyProgress).first()}
