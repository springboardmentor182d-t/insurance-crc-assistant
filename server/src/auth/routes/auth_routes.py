from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.auth.db import get_db
from src.auth import models, schemas, auth

router = APIRouter(prefix="/auth", tags=["Auth"])


# =========================
# REGISTER (USER ONLY)
# =========================
@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        name=user.name,
        email=user.email,
        mobile=user.mobile,
        hashed_password=auth.hash_password(user.password),
        role="user"  # ✅ FORCE USER ROLE
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# =========================
# LOGIN (USER + ADMIN)
# =========================
@router.post("/login", response_model=schemas.TokenResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = auth.create_access_token(
        data={
            "sub": str(db_user.id),
            "role": db_user.role   # ✅ STORE ROLE IN JWT
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role     # ✅ SEND ROLE TO FRONTEND
    }
