from sqlalchemy import Column, Integer, String
from .database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    policy_number = Column(String)
    policy_type = Column(String)
    coverage_amount = Column(String)
    payment_frequency = Column(String)
    holder_name = Column(String)
