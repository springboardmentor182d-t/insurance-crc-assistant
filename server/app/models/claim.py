# server/app/models/claim.py
from sqlalchemy import Column, Integer, Float, Date, ForeignKey, String
from app.database import Base

class Claim(Base):
    __tablename__ = "claims"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    policy_id = Column(Integer, ForeignKey("policies.id"))
    claim_date = Column(Date)
    claim_amount = Column(Float)
    status = Column(String)