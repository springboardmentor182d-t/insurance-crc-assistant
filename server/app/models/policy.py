from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    premium = Column(Float, nullable=False)
    coverage = Column(String, nullable=False)
    risk_level = Column(String, nullable=False)
