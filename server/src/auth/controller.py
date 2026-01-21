from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.database.core import SessionLocal
from src.users.models import User
from src.auth.schemas import (
    RegisterOtpRequest,
    VerifyRegisterOTPRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from src.auth.service import hash_password, verify_password, create_access_token
from src.auth.validators import validate_password
from src.auth.otp_service import create_otp, verify_otp_code
from src.auth.email_service import send_otp_email

router = APIRouter(prefix="/auth", tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= REGISTER (SEND OTP) =================
@router.post("/register")
@router.post("/register")
def send_register_otp(
    payload: RegisterOtpRequest,
    db: Session = Depends(get_db)
):
    email = payload.email.lower().strip()

    # 🔒 BLOCK DUPLICATE REGISTRATION
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered. Please login."
        )

    otp = create_otp(db, email, "REGISTER")
    send_otp_email(email, otp)

    return {"message": "OTP sent to email for verification"}



# ================= VERIFY REGISTER OTP =================
@router.post("/verify-register-otp")
def verify_register_otp(
    payload: VerifyRegisterOTPRequest,
    db: Session = Depends(get_db)
):
    email = payload.email.lower().strip()

    if not verify_otp_code(db, email, "REGISTER", payload.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    validate_password(payload.password)

    user = User(
        email=email,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role="USER",
    )
    db.add(user)
    db.commit()

    return {"message": "Registration successful"}


# ================= LOGIN =================
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    email = form_data.username.lower().strip()
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
    {
        "sub": user.email,
        "user_id": user.id,
        "full_name": user.full_name,  # ✅ ADD THIS
        "role": user.role,
    }
    )

    return {"access_token": token, "token_type": "bearer", "role": user.role}


# ================= FORGOT PASSWORD (SEND OTP) =================
@router.post("/forgot-password")
def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db)
):
    email = payload.email.lower().strip()

    user = db.query(User).filter(User.email == email).first()
    if user:
        otp = create_otp(db, email, "FORGOT_PASSWORD")
        send_otp_email(email, otp)

    return {"message": "If the email is registered, a verification code has been sent."}


# ================= VERIFY FORGOT PASSWORD OTP =================
@router.post("/verify-forgot-otp")
def verify_forgot_password_otp(
    email: str,
    otp: str,
    db: Session = Depends(get_db)
):
    email = email.lower().strip()

    if not verify_otp_code(db, email, "FORGOT_PASSWORD", otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    return {"message": "OTP verified"}


# ================= RESET PASSWORD =================
@router.post("/reset-password")
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    email = payload.email.lower().strip()
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid request")

    validate_password(payload.password)
    user.hashed_password = hash_password(payload.password)
    db.commit()

    return {"message": "Password reset successful"}
