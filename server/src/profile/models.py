from sqlalchemy import Column, Integer, String, Date
from src.database.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, unique=True, index=True)

    full_name = Column(String, nullable=True)
    email = Column(String, nullable=True)      
    phone = Column(String, nullable=True)
    dob = Column(Date, nullable=True)
    address = Column(String, nullable=True)
