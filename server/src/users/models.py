from sqlalchemy import Column, Integer, String, Float, ForeignKey
from src.database.core import Base

class Policy(Base):
    __tablename__ = "policies"

    # Primary key
    id = Column(Integer, primary_key=True, index=True)

    # Basic info
    title = Column(String, nullable=False)
    policy_number = Column(String, unique=True, nullable=False)
    policy_type = Column(String, nullable=False)

    # Financials
    coverage_amount = Column(Float, nullable=False)
    annual_premium = Column(Float, nullable=False)
    payment_frequency = Column(String)

    # Recommendation-related fields
    claim_settlement_ratio = Column(Float)     # %
    waiting_period_years = Column(Integer)     
    network_size = Column(Integer)             

    add_ons = Column(String)                   
    risk_level = Column(String)               

class UserPolicy(Base):
    __tablename__ = "userpolicies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)             
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
