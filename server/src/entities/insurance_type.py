from sqlalchemy import Column, Integer, String
from src.database.database import Base

class InsuranceType(Base):
    __tablename__ = "insurance_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
