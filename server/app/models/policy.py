
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from server.app.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    policy_type = Column(String, nullable=False)
    premium = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    renewal_date = Column(Date, nullable=False)
    policy_number = Column(String, unique=True, nullable=False)