from sqlalchemy import Column, Integer, String, JSON
from app.database import Base

class MotorPolicy(Base):
    __tablename__ = "motor_policies"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String, nullable=False)
    name = Column(String, nullable=False)

    vehicle_type = Column(String, nullable=False)
    fuel_type = Column(String, nullable=False)
    plan_type = Column(String, nullable=False)

    coverage = Column(String, nullable=False)
    addons = Column(JSON, nullable=False)

    premium = Column(Integer, nullable=False)
    max_vehicle_age = Column(Integer, nullable=False)
