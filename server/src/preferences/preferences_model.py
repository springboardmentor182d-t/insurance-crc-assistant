from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from src.database.database import Base


class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, nullable=False)
    insurance_types = Column(ARRAY(String), nullable=True)
    annual_budget = Column(Integer)
    desired_coverage = Column(Integer)
    risk_appetite = Column(String)
