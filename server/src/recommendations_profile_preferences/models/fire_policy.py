from sqlalchemy import Column, Integer, String, JSON
from src.database import Base

class FirePolicy(Base):
    __tablename__ = "fire_policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    property_type = Column(String, nullable=False)
    construction_type = Column(String, nullable=False)

    coverage = Column(JSON, nullable=False)   # ✅ SAFE

    premium = Column(Integer, nullable=False)
    sum_insured = Column(Integer, nullable=False)
