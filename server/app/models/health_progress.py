from sqlalchemy import Column, Integer, String, JSON
from app.database import Base

class HealthProgress(Base):
    __tablename__ = "health_progress"

    id = Column(Integer, primary_key=True, index=True)

    # coverage basics
    policy = Column(String)
    adults = Column(Integer)
    children = Column(Integer)

    # health
    medicalHistory = Column(JSON)

    # preferences
    goal = Column(String)
    premium = Column(Integer)

    # 🔥 NEW QUESTIONNAIRE SIGNALS
    ageGroup = Column(String)
    cityTier = Column(String)
    roomPreference = Column(String)
    waitingTolerance = Column(String)
    hospitalPreference = Column(String)
