from sqlalchemy import Column, Integer, String, Date, Enum, Numeric, Text
from src.database.database import Base
import enum


class ClaimStatus(enum.Enum):
    approved = "Approved"
    under_review = "Under Review"
    pending_documents = "Pending Documents"
    rejected = "Rejected"


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)

    claim_number = Column(String(50), unique=True, nullable=False, index=True)

    policy_name = Column(String(100), nullable=False)
    policy_type = Column(String(50), nullable=False)
    policy_number = Column(String(50), nullable=False)

    filed_date = Column(Date, nullable=False)

    amount = Column(Numeric(10, 2), nullable=False)
    payable_amount = Column(Numeric(10, 2), nullable=True)

    status = Column(Enum(ClaimStatus), nullable=False)

    description = Column(Text, nullable=True)
    location = Column(String(100), nullable=True)
    claim_type = Column(String(50), nullable=True)
