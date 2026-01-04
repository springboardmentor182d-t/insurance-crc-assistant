from sqlalchemy import Column, Integer, String, ForeignKey
from src.database.core import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    policy_number = Column(String)
    policy_type = Column(String)
    coverage_amount = Column(String)
    payment_frequency = Column(String)
    
class UserPolicy(Base):
    __tablename__ = "user_policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)             
    policy_id = Column(Integer, ForeignKey("policies.id"))    
