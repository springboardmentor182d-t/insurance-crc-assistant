from pydantic import BaseModel
from datetime import date
from typing import Optional
from uuid import UUID


class PolicyBase(BaseModel):
    policy_name: str
    policy_type: str
    provider_name: str
    policy_number: str
    start_date: date
    end_date: date
    renewal_date: date
    premium_amount: float
    payment_frequency: str
    coverage_amount: float
    auto_debit: bool
    next_due_date: Optional[date] = None


class PolicyCreate(PolicyBase):
    pass


class PolicyUpdate(PolicyBase):
    pass


class PolicyResponse(PolicyBase):
    id: UUID
    status: str

    class Config:
        from_attributes = True
