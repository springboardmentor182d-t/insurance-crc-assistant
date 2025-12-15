from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime

from app.database import get_db
from app import models, schemas
from app.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
)
from app.dependencies import get_current_user
from app.otp_utils import generate_otp, otp_expiry
from app.email_utils import send_otp_email   # ✅ already correct

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ---------------- REGISTER ----------------
@router.post("/register", response_model=schemas.Token)
async def register(payload: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    q = await db.execute(select(models.User).where(models.User.email == payload.email))
    if q.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = models.User(
        full_name=payload.full_name,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return {
        "access_token": create_access_token(str(user.id)),
        "token_type": "bearer",
        "refresh_token": create_refresh_token(str(user.id)),
    }


# ---------------- LOGIN ----------------
@router.post("/login", response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    q = await db.execute(select(models.User).where(models.User.email == form_data.username))
    user = q.scalar_one_or_none()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "access_token": create_access_token(str(user.id)),
        "token_type": "bearer",
        "refresh_token": create_refresh_token(str(user.id)),
    }


# ---------------- CURRENT USER ----------------
@router.get("/me")
async def me(current_user=Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role.name if current_user.role else None,
    }


# ---------------- FORGOT PASSWORD ----------------
@router.post("/forgot-password")
async def forgot_password(
    payload: schemas.ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    q = await db.execute(select(models.User).where(models.User.email == payload.email))
    user = q.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp_code = generate_otp()

    otp = models.OTP(
        email=payload.email,
        code=otp_code,
        expires_at=otp_expiry(),
        used=False,
    )

    db.add(otp)
    await db.commit()

    send_otp_email(payload.email, otp_code)

    return {"message": "OTP sent successfully"}


# ---------------- VERIFY OTP ----------------
@router.post("/verify-otp")
async def verify_otp(payload: schemas.VerifyOtpRequest, db: AsyncSession = Depends(get_db)):
    q = await db.execute(
        select(models.OTP)
        .where(models.OTP.email == payload.email)
        .where(models.OTP.code == payload.code)
        .where(models.OTP.used.is_(False))
        .order_by(models.OTP.created_at.desc())
    )

    otp = q.scalar_one_or_none()

    if not otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if otp.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    otp.used = True
    await db.commit()

    return {"message": "OTP verified successfully"}


# ---------------- RESET PASSWORD ----------------
@router.post("/reset-password")
async def reset_password(payload: schemas.ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    q = await db.execute(
        select(models.OTP)
        .where(models.OTP.email == payload.email)
        .where(models.OTP.used.is_(True))
        .order_by(models.OTP.created_at.desc())
        .limit(1)
    )
    otp = q.scalar_one_or_none()

    if not otp:
        raise HTTPException(status_code=400, detail="OTP not verified")

    q = await db.execute(select(models.User).where(models.User.email == payload.email))
    user = q.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.hashed_password = get_password_hash(payload.new_password)
    await db.commit()

    return {"message": "Password reset successful"}
