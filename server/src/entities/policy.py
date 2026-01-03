from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, JSON, DateTime
from datetime import datetime
from src.database.core import Base


class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("providers.id"))
    policy_type = Column(String, index=True)
    title = Column(String)
    coverage = Column(JSON)
    premium = Column(Numeric)
    term_months = Column(Integer)
    deductible = Column(Numeric)
    tnc_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
