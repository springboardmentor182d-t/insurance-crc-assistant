
from fastapi import APIRouter
from pydantic import BaseModel, Field
from enum import Enum
from pathlib import Path
import pandas as pd

router = APIRouter(prefix="/premium-calculator", tags=["Premium Calculator"])
BASE_DIR = Path(__file__).resolve().parent
MIN_PREMIUM = 500  

class VehicleType(str, Enum):
    car = "car"
    bike = "bike"

class CoverageType(str, Enum):
    comprehensive = "comprehensive"
    third_party = "third_party"

class OwnershipType(str, Enum):
    owned = "owned"
    rented = "rented"

class DestinationType(str, Enum):
    domestic = "domestic"
    international = "international"

class ConstructionType(str, Enum):
    rcc = "rcc"
    mixed = "mixed"
    wooden = "wooden"

class RiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class HealthPremiumIn(BaseModel):
    age: int = Field(..., gt=0)
    cover_amount: float = Field(..., gt=0)
    family_size: int = Field(..., gt=0)

class MotorPremiumIn(BaseModel):
    vehicle_type: VehicleType
    vehicle_age: int = Field(..., ge=0)
    coverage_type: CoverageType
    vehicle_value: float = Field(..., gt=0)

class LifePremiumIn(BaseModel):
    age: int = Field(..., gt=0)
    sum_assured: int = Field(..., gt=0)
    smoker: bool

class HomePremiumIn(BaseModel):
    property_value: int = Field(..., gt=0)
    property_age: int = Field(..., ge=0)
    ownership: OwnershipType

class TravelPremiumIn(BaseModel):
    trip_days: int = Field(..., gt=0)
    travelers: int = Field(..., gt=0)
    destination_type: DestinationType

class FirePremiumIn(BaseModel):
    property_value: int = Field(..., gt=0)
    construction_type: ConstructionType

class BusinessPremiumIn(BaseModel):
    annual_revenue: int = Field(..., gt=0)
    risk_level: RiskLevel

class PremiumOut(BaseModel):
    premium: float

def safe_rate(df, exposure_col):
    total_claims = df["claims_amount"].sum()
    total_exposure = df[exposure_col].sum()
    if total_exposure == 0 or len(df) < 10:
        return 0.01
    return total_claims / total_exposure


def derive_life_rate(age: int, smoker: bool):
    df = pd.read_csv(BASE_DIR / "life_history.csv")
    df_band = df[(df["age"].between(age-5, age+5)) & (df["smoker"]==smoker)]
    if len(df_band) < 5:
        df_band = df[df["smoker"]==smoker]
    return safe_rate(df_band, "sum_assured")


def derive_health_rate(age: int):
    df = pd.read_csv(BASE_DIR / "health_history.csv")
    df_band = df[df["age"].between(age-5, age+5)]
    return safe_rate(df_band, "cover_amount")


def derive_motor_rate(vehicle_type: str, vehicle_age: int):
    df = pd.read_csv(BASE_DIR / "motor_history.csv")
    df_band = df[(df["vehicle_type"]==vehicle_type) & (df["vehicle_age"].between(vehicle_age-3, vehicle_age+3))]
    if len(df_band) < 5:
        df_band = df[df["vehicle_type"]==vehicle_type]
    return safe_rate(df_band, "vehicle_value")

def derive_home_rate(property_age: int):
    df = pd.read_csv(BASE_DIR / "home_history.csv")
    df_band = df[df["property_age"].between(property_age-5, property_age+5)]
    return safe_rate(df_band, "property_value")


def derive_fire_rate(construction_type: str):
    df = pd.read_csv(BASE_DIR / "fire_history.csv")
    df_band = df[df["construction_type"]==construction_type]
    return safe_rate(df_band, "property_value")

def derive_travel_rate(trip_days: int):
    df = pd.read_csv(BASE_DIR / "travel_history.csv")
    df["exposure"] = df["trip_days"] * df["travelers"]
    df_band = df[df["trip_days"].between(trip_days-3, trip_days+3)]
    return safe_rate(df_band, "exposure")


def derive_business_rate(risk_level: str):
    df = pd.read_csv(BASE_DIR / "business_history.csv")
    df_band = df[df["risk_level"]==risk_level]
    return safe_rate(df_band, "annual_revenue")


@router.post("/life", response_model=PremiumOut)
def calculate_life_premium(data: LifePremiumIn):
    rate = derive_life_rate(data.age, data.smoker)
    base = data.sum_assured * rate

    age_factor = base * 0.1 * max(data.age - 30, 0)   
    smoker_factor = base * 0.25 if data.smoker else 0  

    premium = base + age_factor + smoker_factor
    premium = max(MIN_PREMIUM, min(premium, data.sum_assured * 0.05))  
    return {"premium": round(premium, 2)}


@router.post("/health", response_model=PremiumOut)
def calculate_health_premium(data: HealthPremiumIn):
    rate = derive_health_rate(data.age)
    base = data.cover_amount * rate
    age_factor = max(data.age-30,0)*1.5
    family_factor = data.family_size*100
    premium = base + age_factor + family_factor
    premium = max(MIN_PREMIUM, min(premium, data.cover_amount*0.5))
    return {"premium": round(premium,2)}


@router.post("/motor", response_model=PremiumOut)
def calculate_motor_premium(data: MotorPremiumIn):
    rate = derive_motor_rate(data.vehicle_type.value, data.vehicle_age)
    base = data.vehicle_value * rate
    age_factor = data.vehicle_age*50
    coverage_factor = 200 if data.coverage_type==CoverageType.comprehensive else 0
    premium = base + age_factor + coverage_factor
    premium = max(MIN_PREMIUM, min(premium, data.vehicle_value*0.5))
    return {"premium": round(premium,2)}

@router.post("/home", response_model=PremiumOut)
def calculate_home_premium(data: HomePremiumIn):
    rate = derive_home_rate(data.property_age)
    base = data.property_value * rate
    age_factor = data.property_age*50
    ownership_factor = 0 if data.ownership==OwnershipType.owned else 200
    premium = base + age_factor + ownership_factor
    premium = max(MIN_PREMIUM, min(premium, data.property_value*0.5))
    return {"premium": round(premium,2)}


@router.post("/fire", response_model=PremiumOut)
def calculate_fire_premium(data: FirePremiumIn):
    rate = derive_fire_rate(data.construction_type.value)
    base = data.property_value * rate

    
    construction_factor = base * 0.3 if data.construction_type==ConstructionType.wooden else 0  
    premium = base + construction_factor

    premium = max(MIN_PREMIUM, min(premium, data.property_value * 0.25))  
    return {"premium": round(premium, 2)}


@router.post("/travel", response_model=PremiumOut)
def calculate_travel_premium(data: TravelPremiumIn):
    rate = derive_travel_rate(data.trip_days)
    base = data.trip_days * data.travelers * rate
    destination_factor = 200 if data.destination_type==DestinationType.international else 0
    premium = base + destination_factor
    premium = max(MIN_PREMIUM, min(premium, 50000))
    return {"premium": round(premium,2)}


@router.post("/business", response_model=PremiumOut)
def calculate_business_premium(data: BusinessPremiumIn):
    rate = derive_business_rate(data.risk_level.value)
    base = data.annual_revenue * rate
    risk_factor = {"low":0,"medium":1000,"high":2000}[data.risk_level.value]
    premium = base + risk_factor
    premium = max(MIN_PREMIUM, min(premium, data.annual_revenue*0.5))
    return {"premium": round(premium,2)}
