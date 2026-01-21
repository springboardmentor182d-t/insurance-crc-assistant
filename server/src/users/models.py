from sqlalchemy import Column, Integer, String
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)   # ✅ NEW
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="USER")
