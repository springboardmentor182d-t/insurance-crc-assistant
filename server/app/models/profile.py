from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Profile(Base):
    __tablename__ = "user_profile"

    id = Column(Integer, primary_key=True, index=True)
    dob = Column(Date, nullable=True)
    address = Column(String, nullable=True)
    categories = Column(String, nullable=True)
    budget = Column(Integer, nullable=True)
    risk = Column(String, nullable=True)
    family_size = Column(Integer, nullable=True)
    goal = Column(String, nullable=True)
