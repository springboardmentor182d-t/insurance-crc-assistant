from sqlalchemy import Column, Integer, String, ForeignKey
from src.database.database import Base


class PolicyHolder(Base):
    __tablename__ = "policy_holders"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), unique=True)
    holder_name = Column(String, nullable=False)
