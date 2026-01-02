from sqlalchemy import Column, Integer, String
from src.database.core import Base

class Provider(Base):
    __tablename__ = "providers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    contact_email = Column(String)
