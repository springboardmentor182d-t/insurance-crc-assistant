from sqlalchemy import Column, Integer, String
from app.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    premium = Column(Integer)
