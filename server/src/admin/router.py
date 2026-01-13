from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.admin.service import (
    get_dashboard_cards,
    get_risk_distribution,
    get_fraud_trend
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"]
)


@router.get("/cards")
def dashboard_cards(db: Session = Depends(get_db)):
    return get_dashboard_cards(db)


@router.get("/risk-distribution")
def risk_distribution(db: Session = Depends(get_db)):
    return get_risk_distribution(db)


@router.get("/fraud-trend")
def fraud_trend(db: Session = Depends(get_db)):
    return get_fraud_trend(db)
