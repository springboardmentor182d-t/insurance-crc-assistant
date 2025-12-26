from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.fire_progress import FireProgress
from app.schemas.fire_progress import FireProgressRequest

router = APIRouter(
    prefix="/api/fire",
    tags=["Fire Progress"]
)

# ================= SAVE =================
@router.post("/save-progress")
def save_fire_progress(
    payload: FireProgressRequest,
    db: Session = Depends(get_db),
):
    try:
        db.query(FireProgress).delete(synchronize_session=False)

        progress = FireProgress(
            propertyType=payload.propertyType,
            constructionType=payload.constructionType,
            propertyAge=payload.propertyAge,
            location=payload.location,
            coverage=payload.coverage if payload.coverage is not None else [],
            stockValue=payload.stockValue,
            machineryValue=payload.machineryValue,
            totalSum=payload.totalSum,
            premium=payload.premium,
        )

        db.add(progress)
        db.commit()

        return {"success": True}

    except Exception as e:
        db.rollback()
        print("🔥 POSTGRES SAVE ERROR:", e)
        raise


# ================= LOAD (THIS WAS MISSING) =================
@router.get("/load-progress")
def load_fire_progress(db: Session = Depends(get_db)):
    progress = db.query(FireProgress).first()

    if not progress:
        return {"data": None}

    return {
        "data": {
            "propertyType": progress.propertyType,
            "constructionType": progress.constructionType,
            "propertyAge": progress.propertyAge,
            "location": progress.location,
            "coverage": progress.coverage,
            "stockValue": progress.stockValue,
            "machineryValue": progress.machineryValue,
            "totalSum": progress.totalSum,
            "premium": progress.premium,
        }
    }
