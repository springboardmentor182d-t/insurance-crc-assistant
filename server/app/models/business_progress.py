from sqlalchemy import Column, Integer, String, ARRAY
from app.database import Base

class BusinessProgress(Base):
    __tablename__ = "business_progress"

    id = Column(Integer, primary_key=True, index=True)

    businessType = Column(String, nullable=False)
    businessSize = Column(String, nullable=False)
    revenue = Column(Integer, nullable=True)
    address = Column(String, nullable=True)

    coverage = Column(ARRAY(String), nullable=False)

    assetsValue = Column(Integer, nullable=True)
    existingInsurance = Column(String, nullable=False)

    premium = Column(Integer, nullable=False)
