from sqlalchemy import Column, Integer, String, ARRAY
from src.database import Base

class FireProgress(Base):
    __tablename__ = "fire_progress"

    id = Column(Integer, primary_key=True, index=True)

    propertyType = Column(String, nullable=False)
    constructionType = Column(String, nullable=False)
    propertyAge = Column(Integer, nullable=True)
    location = Column(String, nullable=True)

    coverage = Column(ARRAY(String), nullable=False)

    stockValue = Column(Integer, nullable=True)
    machineryValue = Column(Integer, nullable=True)
    totalSum = Column(Integer, nullable=True)

    premium = Column(Integer, nullable=False)
