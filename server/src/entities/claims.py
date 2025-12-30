from sqlalchemy import Column, Integer, String, Date, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    user_policy_id = Column(Integer, index=True) # ForeignKey to UserPolicy when implemented
    claim_number = Column(String, unique=True, index=True)
    claim_type = Column(String)
    incident_date = Column(Date)
    amount_claimed = Column(Numeric(10, 2))
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    documents = relationship("ClaimDocument", back_populates="claim")

class ClaimDocument(Base):
    __tablename__ = "claim_documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"))
    file_url = Column(String)
    doc_type = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    claim = relationship("Claim", back_populates="documents")
