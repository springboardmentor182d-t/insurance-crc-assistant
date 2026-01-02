from sqlalchemy import Column, Integer, String, JSON
from src.database.database import Base

class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True)
    insurance_types = Column(JSON)
    annual_budget = Column(Integer)
    desired_coverage = Column(Integer)
    risk_appetite = Column(String)
