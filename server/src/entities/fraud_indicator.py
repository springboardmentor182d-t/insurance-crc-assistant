from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from src.database.database import Base


class FraudIndicator(Base):
    __tablename__ = "fraud_indicators"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    label = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
