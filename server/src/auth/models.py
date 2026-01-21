from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime

from src.database.core import Base


class PasswordOTP(Base):
    __tablename__ = "password_otps"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, nullable=False)
    otp = Column(String, nullable=False)

    # 🔥 THIS WAS MISSING
    purpose = Column(String(30), nullable=False)

    expires_at = Column(DateTime, nullable=False)
    is_used = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
