from sqlalchemy import Column, Integer, String
from src.auth.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # ✅ ROLE BASED LOGIN
    role = Column(String, default="user")  # user | admin
