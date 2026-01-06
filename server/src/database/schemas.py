# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    full_name: Optional[str] = None
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    role: str | None


class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str
    user: UserOut


class ForgotPasswordRequest(BaseModel):
    email: str

class VerifyOtpRequest(BaseModel):
    email: str
    code: str

class ResetPasswordRequest(BaseModel):
    email: str
    new_password: str