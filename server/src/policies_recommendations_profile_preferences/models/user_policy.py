import uuid
from sqlalchemy import Column, String, Date, Boolean, Float, Integer
from sqlalchemy.dialects.postgresql import UUID
from src.database.core import Base


class UserPolicy(Base):
    __tablename__ = "user_policies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Integer, nullable=False)

    policy_name = Column(String, nullable=False)
    policy_type = Column(String, nullable=False)
    provider_name = Column(String, nullable=False)
    policy_number = Column(String, nullable=False)

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    renewal_date = Column(Date, nullable=False)

    premium_amount = Column(Float, nullable=False)
    payment_frequency = Column(String, nullable=False)
    next_due_date = Column(Date, nullable=True)

    coverage_amount = Column(Float, nullable=False)

    auto_debit = Column(Boolean, default=False)
    status = Column(String, default="active")
