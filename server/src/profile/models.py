from sqlalchemy import Column, Integer, Boolean, JSON, ForeignKey
from src.database.core import Base

# class UserPreferences(Base):
#     __tablename__ = "user_preferences"

#     id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, unique=True, index=True)
#     risk_tolerance = Column(Integer)
#     coverage_interests = Column(JSON)
#     premium_min = Column(Integer)
#     premium_max = Column(Integer)
#     preferred_providers = Column(JSON)
#     communication = Column(JSON)
#     auto_claim = Column(Boolean)


# from sqlalchemy import Column, Integer, Boolean, JSON
# from src.database.core import Base

class UserPreferences(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, index=True)

    riskTolerance = Column(Integer, nullable=False)
    coverageInterests = Column(JSON, nullable=False)
    premiumRange = Column(JSON, nullable=False)
    preferredProviders = Column(JSON, nullable=False)
    communication = Column(JSON, nullable=False)
    autoClaim = Column(Boolean, default=False)
