from sqlalchemy import Column, Integer, String, Float
from src.database.core import Base


class MarketPremium(Base):
    __tablename__ = "market_premium"

    id = Column(Integer, primary_key=True)
    category = Column(String, nullable=False)
    frequency = Column(String, nullable=False)  # monthly / annual
    market_cost = Column(Float, nullable=False)
