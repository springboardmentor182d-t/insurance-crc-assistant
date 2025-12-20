from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.policy import Policy
from app.models.claim import Claim
from app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    policies = db.query(Policy).filter(Policy.user_id == user_id).all()
    claims = db.query(Claim).filter(Claim.user_id == user_id).all()

    return {"user": user, "policies": policies, "claims": claims}