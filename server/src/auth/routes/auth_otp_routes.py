from fastapi import APIRouter
import random, time
from src.auth.utils.otp_store import otp_store
from src.auth.utils.email import send_otp_email

router = APIRouter(prefix="/auth", tags=["OTP"])

@router.post("/send-otp")
def send_otp(email: str):
    otp = str(random.randint(100000, 999999))
    otp_store[email] = {
        "otp": otp,
        "expires": time.time() + 300  
    }
    send_otp_email(email, otp)
    return {"message": "OTP sent"}

@router.post("/verify-otp")
def verify_otp(email: str, otp: str):
    record = otp_store.get(email)

    if not record:
        return {"verified": False}

    if time.time() > record["expires"]:
        return {"verified": False}

    if record["otp"] != otp:
        return {"verified": False}

    del otp_store[email] 
    return {"verified": True}
