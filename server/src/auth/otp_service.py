import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from src.auth.models import PasswordOTP


# ========================
# Helper functions
# ========================

def generate_otp() -> str:
    return str(random.randint(100000, 999999))


def otp_expiry_time(minutes: int = 10):
    return datetime.utcnow() + timedelta(minutes=minutes)


# ========================
# Service functions
# ========================

def create_otp(db: Session, email: str, purpose: str) -> str:
    otp = generate_otp()

    # Invalidate previous OTPs
    db.query(PasswordOTP).filter(
        PasswordOTP.email == email,
        PasswordOTP.purpose == purpose,
        PasswordOTP.is_used == False,
    ).update({"is_used": True})

    record = PasswordOTP(
        email=email,
        otp=otp,
        purpose=purpose,
        expires_at=otp_expiry_time(),
        is_used=False,
    )

    db.add(record)
    db.commit()

    return otp


def verify_otp_code(db: Session, email: str, purpose: str, otp: str) -> bool:
    record = db.query(PasswordOTP).filter(
        PasswordOTP.email == email,
        PasswordOTP.purpose == purpose,
        PasswordOTP.otp == otp,
        PasswordOTP.is_used == False,
        PasswordOTP.expires_at > datetime.utcnow(),
    ).order_by(PasswordOTP.created_at.desc()).first()

    if not record:
        return False

    record.is_used = True
    db.commit()
    return True
