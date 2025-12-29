from sqlalchemy import Column, Integer, String, Date
from src.database import Base

class Profile(Base):
    __tablename__ = "user_profile"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    dob = Column(Date, nullable=True)
    address = Column(String, nullable=True)
    family_size = Column(Integer, nullable=True)
    avatar_path = Column(String, nullable=True)
