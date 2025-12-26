from sqlalchemy import Column, Integer, String, JSON
from app.database import Base

class MotorProgress(Base):
    __tablename__ = "motor_progress"

    id = Column(Integer, primary_key=True, index=True)

    vehicleType = Column("vehicle_type", String, nullable=False)
    fuelType = Column("fuel_type", String, nullable=False)
    vehicleAge = Column("vehicle_age", Integer, nullable=False)

    usage = Column(Integer, nullable=False)
    ownership = Column(String, nullable=False)
    claims = Column(String, nullable=False)
    ncb = Column(String, nullable=False)

    garage = Column(String, nullable=False)
    antiTheft = Column("anti_theft", String, nullable=False)

    plan = Column(String, nullable=False)
    addons = Column(JSON, nullable=False)
    idv = Column(String, nullable=False)
    premium = Column(Integer, nullable=False)
