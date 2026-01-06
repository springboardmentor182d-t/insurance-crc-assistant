from sqlalchemy import Column, Integer, String, Float, DateTime,Enum, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
from src.database.base import Base
import enum


class ClaimStatus(str, enum.Enum):
    pending = "pending"
    review = "review"
    approved = "approved"
    rejected = "rejected"

    
class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)

    claim_number = Column(String, unique=True, index=True)  # ✅ ADD
    policy_name = Column(String)
    policy_number = Column(String)
    claim_type = Column(String)

    incident_date = Column(DateTime)
    location = Column(String)
    amount = Column(Float)
    description = Column(String)

    status = Column(String, default="Submitted")
    filed_date = Column(DateTime, default=datetime.utcnow)  # ✅ USE THIS

class ClaimDocument(Base):
    __tablename__ = "claim_documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    file_name = Column(String)
    file_path = Column(String)

    claim = relationship("Claim", back_populates="documents")
