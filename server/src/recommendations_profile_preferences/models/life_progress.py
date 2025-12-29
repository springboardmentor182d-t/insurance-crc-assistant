from sqlalchemy import Column, Integer, String, Float
from src.database import Base

class LifeProgress(Base):
    __tablename__ = "life_progress"

    id = Column(Integer, primary_key=True, index=True)

    # Coverage basics
    policyType = Column(String, nullable=False)
    dependents = Column(Integer, nullable=False)

    # Personal details
    ageGroup = Column(String, nullable=False)
    employment = Column(String, nullable=False)
    income = Column(Integer, nullable=False)

    # Goals & preferences
    goal = Column(String, nullable=False)
    riskAppetite = Column(String, nullable=False)

    # Coverage
    coverage = Column(String, nullable=False)
    tenure = Column(String, nullable=False)

    # Liabilities
    hasLoans = Column(String, nullable=False)

    # Lifestyle
    tobacco = Column(String, nullable=False)
    alcohol = Column(String, nullable=False)

    # Budget
    premium = Column(Float, nullable=False)
