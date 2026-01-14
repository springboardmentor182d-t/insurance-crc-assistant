from sqlalchemy import Column, Integer, String, ARRAY
from src.database import Base

class BusinessPolicy(Base):
    __tablename__ = "business_policies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    # Matching filters
    business_type = Column(String, nullable=False)     # Retail, Manufacturing, etc.
    business_size = Column(String, nullable=False)     # Small, Medium, Large

    # Coverage offered
    coverage = Column(ARRAY(String), nullable=False)

    # Financials
    premium = Column(Integer, nullable=False)
    sum_insured = Column(Integer, nullable=False)
