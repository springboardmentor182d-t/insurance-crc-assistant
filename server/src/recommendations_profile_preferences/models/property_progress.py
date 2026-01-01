from sqlalchemy import Column, Integer, String
from src.database import Base

class PropertyProgress(Base):
    __tablename__ = "property_progress"

    id = Column(Integer, primary_key=True, index=True)

    propertyType = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    area = Column(Integer, nullable=False)
    city = Column(String, nullable=False)

    ownership = Column(String, nullable=False)
    occupancy = Column(String, nullable=False)
    construction = Column(String, nullable=False)
    riskZone = Column(String, nullable=False)
    previousClaims = Column(String, nullable=False)

    coverage = Column(String, nullable=False)
    sumInsured = Column(Integer, nullable=False)
    security = Column(String, nullable=False)

    premium = Column(Integer, nullable=False)
