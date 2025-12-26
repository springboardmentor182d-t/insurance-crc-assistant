from sqlalchemy import Column, Integer, String
from app.database import Base

class TravelPolicy(Base):
    __tablename__ = "travel_policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    trip_type = Column(String)
    coverage = Column(String)
    plan_type = Column(String)

    medical_sum_insured = Column(Integer)
    premium = Column(Integer)
