from sqlalchemy import Column, Integer, String, JSON
from app.database import Base

class TravelProgress(Base):
    __tablename__ = "travel_progress"

    id = Column(Integer, primary_key=True, index=True)

    tripType = Column(String)
    destination = Column(String)
    startDate = Column(String)
    endDate = Column(String)

    travellers = Column(JSON)

    coverage = Column(String)
    planType = Column(String)
    tenure = Column(String)

    medicalSumInsured = Column(String)
    preExisting = Column(String)
    adventureCover = Column(String)

    premium = Column(Integer)
