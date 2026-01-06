from sqlalchemy import Column, Integer, String, Numeric, JSON
from src.database.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    category = Column(String, index=True)

    premium = Column(Numeric, nullable=False)
    coverage = Column(Numeric, nullable=False)

    term = Column(String)
    deductible = Column(Numeric, nullable=True)

    waitingPeriod = Column(String, nullable=True)
    roomRent = Column(String, nullable=True)

    benefits = Column(JSON)     # list[str]
    exclusions = Column(JSON)   # list[str]
