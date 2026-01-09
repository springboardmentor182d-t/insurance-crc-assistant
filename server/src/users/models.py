from sqlalchemy import Column, Integer, String, DateTime, Enum, ARRAY, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.database.core import Base
import enum

class Role(str, enum.Enum):
    admin = "admin"
    super_admin = "super_admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    initials = Column(String)
    role = Column(Enum(Role), default=Role.admin)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    created_rules = relationship("Rule", back_populates="creator", foreign_keys="Rule.created_by_id")
    owned_rules = relationship("Rule", back_populates="owner", foreign_keys="Rule.owner_id")
    rule_versions = relationship("RuleVersion", back_populates="creator")
