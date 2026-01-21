from pydantic import BaseModel, EmailStr

class RegisterOtpRequest(BaseModel):
    email: EmailStr

class VerifyRegisterOTPRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    otp: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    password: str
