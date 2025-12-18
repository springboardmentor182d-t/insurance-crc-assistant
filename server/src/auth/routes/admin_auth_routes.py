from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.auth.db import get_db
from src.auth import models, schemas, auth

router = APIRouter(prefix="/admin", tags=["Admin Auth"])

@router.post("/login")
def admin_login(
    data: schemas.AdminLogin,
    db: Session = Depends(get_db)
):
    admin = db.query(models.Admin).filter(
        models.Admin.email == data.email
    ).first()

    if not admin or not auth.verify_password(
        data.password, admin.hashed_password
    ):
        raise HTTPException(status_code=401, detail="Invalid admin credentials")

    token = auth.create_access_token(
        data={"sub": str(admin.id), "role": "admin"}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
