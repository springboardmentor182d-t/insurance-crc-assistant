from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime,timedelta

import random


from src.database.core import SessionLocal
from src.users.models import User
from src.auth.models import PasswordOTP
from src.auth.service import (
    hash_password,
    verify_password,
    create_access_token,
)
from src.auth.otp_service import generate_otp, otp_expiry_time

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------
# REGISTER
# --------------------
@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=email,
        hashed_password=hash_password(password),
        role="USER",
    )

    db.add(user)
    db.commit()

    return {"message": "User registered successfully"}


# --------------------
# LOGIN (OAuth2)
# --------------------
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {"sub": user.email, "role": user.role}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
    }


# --------------------
# FORGOT PASSWORD
# --------------------
@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = str(random.randint(100000, 999999))

    db.query(PasswordOTP).filter(PasswordOTP.email == email).delete()

    db.add(
        PasswordOTP(
            email=email,
            otp=otp,
            expires_at=datetime.utcnow() + timedelta(minutes=10)
        )
    )
    db.commit()

    # (For now, print OTP instead of email)
    print("OTP for", email, ":", otp)

    return {"message": "OTP sent successfully"}



# --------------------
# RESET PASSWORD
# --------------------
@router.post("/reset-password")
def reset_password(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = hash_password(password)

    db.query(PasswordOTP).filter(PasswordOTP.email == email).delete()
    db.commit()

    return {"message": "Password reset successful"}


@router.post("/verify-otp")
def verify_otp(email: str, otp: str, db: Session = Depends(get_db)):
    record = db.query(PasswordOTP).filter(
        PasswordOTP.email == email,
        PasswordOTP.otp == otp
    ).first()

    if not record or record.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    return {"message": "OTP verified"}
