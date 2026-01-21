from sqlalchemy import Column, Integer, String, Float, TIMESTAMP
from sqlalchemy.sql import func
from src.database.core import Base


class SavedQuote(Base):
    __tablename__ = "saved_quotes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)

    policy_type = Column(String(50), nullable=False)   # health / life / motor etc
    policy_id = Column(Integer, nullable=False)

    policy_name = Column(String(255), nullable=False)
    insurer_name = Column(String(255), nullable=False)

    tenure = Column(Integer, nullable=False)

    base_premium = Column(Float, nullable=False)
    gst = Column(Float, nullable=False)
    total_premium = Column(Float, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.now())
