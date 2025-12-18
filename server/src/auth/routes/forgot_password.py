from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import random

from src.auth.db import get_db
from src.auth.auth import hash_password
from src.auth.utils.email import send_otp_email
from src.auth.utils.otp_store import save_otp, verify_otp
from src.auth.models import User  # adjust if name differs
from src.auth.schemas import VerifyOtpSchema

router = APIRouter(prefix="/auth", tags=["Forgot Password"])


@router.post("/forgot-password")
def forgot_password(data: dict, db: Session = Depends(get_db)):
    email = data["email"]

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = str(random.randint(100000, 999999))
    save_otp(email, otp)
    send_otp_email(email, otp)

    return {"message": "OTP sent to email"}


@router.post("/verify-otp")
def verify_otp_route(data: VerifyOtpSchema):
    if not verify_otp(data.email, data.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    return {"message": "OTP verified"}



@router.post("/reset-password")
def reset_password(data: dict, db: Session = Depends(get_db)):
    email = data["email"]
    new_password = data["new_password"]

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = hash_password(new_password)
    db.commit()

    return {"message": "Password reset successful"}
