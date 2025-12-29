from sqlalchemy import Column, Integer, String
from src.database import Base

class PropertyPolicy(Base):
    __tablename__ = "property_policies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    property_type = Column(String, nullable=False)
    ownership = Column(String, nullable=False)
    coverage = Column(String, nullable=False)
    risk_zone = Column(String, nullable=False)

    premium = Column(Integer, nullable=False)
    sum_insured = Column(Integer, nullable=False)
