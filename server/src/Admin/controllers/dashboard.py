from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import date, timedelta
import csv
from io import StringIO
from fastapi.responses import StreamingResponse

from src.database.core import SessionLocal
from src.Admin.dependencies import get_current_admin
from src.claims.models import Claim
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger

router = APIRouter(
    prefix="/admin/dashboard",
    tags=["Admin Dashboard"],
)


# ---------------- DB ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =================================================
# DASHBOARD SUMMARY (SMART TIME WINDOW)
# =================================================
@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    # 🔹 Use most recent event date as anchor
    latest_event_date = (
        db.query(func.max(FraudEvent.event_date))
        .scalar()
    )

    if latest_event_date:
        anchor_date = latest_event_date.date()
    else:
        anchor_date = date.today()

    start_date = anchor_date - timedelta(days=6)
    end_date = anchor_date

    # ---------- TOTAL CLAIMS ----------
    total_claims = db.query(Claim).count()

    # ---------- FLAGGED CLAIMS ----------
    flagged_claims = db.query(FraudEvent).filter(
    FraudEvent.flagged.is_(True)
    ).count()


    # ---------- AVG FRAUD SCORE ----------
    avg_fraud_score = (
    db.query(func.avg(FraudEvent.fraud_score))
    .scalar()
) or 0


    # ---------- RISK DISTRIBUTION ----------
    high = db.query(FraudEvent).filter(
    FraudEvent.severity == "HIGH"
    ).count()


    medium = db.query(FraudEvent).filter(
    FraudEvent.severity == "MEDIUM"
    ).count()

    low = db.query(FraudEvent).filter(
        FraudEvent.severity == "LOW"
    ).count()


    # ---------- RISK EXPOSURE ----------
    risk_exposure = (
    db.query(func.sum(Claim.amount_claimed))
    .join(FraudEvent, FraudEvent.claim_id == Claim.id)
    .filter(FraudEvent.flagged.is_(True))
    .scalar()
    ) or 0


    # ---------- FRAUD TREND (CLAIMS vs FLAGGED) ----------
    trend_rows = (
        db.query(
            func.date(Claim.created_at).label("day"),
            func.count(Claim.id).label("total"),
            func.sum(
                case(
                    (FraudEvent.flagged.is_(True), 1),
                    else_=0,
                )
            ).label("flagged"),
        )
        .outerjoin(
            FraudEvent,
            FraudEvent.claim_id == Claim.id
        )
        .filter(
            Claim.created_at >= start_date,
            Claim.created_at <= end_date,
        )
        .group_by(func.date(Claim.created_at))
        .all()
    )


    trend_map = {
        row.day: {
            "total": int(row.total),
            "flagged": int(row.flagged or 0),
        }
        for row in trend_rows
    }

    trend = []
    for i in range(6, -1, -1):
        day = anchor_date - timedelta(days=i)
        stats = trend_map.get(day, {"total": 0, "flagged": 0})

        trend.append({
            "date": day.isoformat(),
            "day": day.strftime("%a"),
            "total": stats["total"],
            "flagged": stats["flagged"],
        })

    # ---------- TOP RULES ----------
    latest_rule_trigger = (
    db.query(func.max(RuleTrigger.triggered_at))
    .scalar()
    )

    if latest_rule_trigger:
        rules_end = latest_rule_trigger
        rules_start = rules_end - timedelta(days=6)
    else:
        rules_start = start_date
        rules_end = end_date

    top_rules = (
        db.query(
            RuleTrigger.rule_name,
            func.count(RuleTrigger.id).label("count"),
        )
        .filter(
            RuleTrigger.triggered_at >= rules_start,
            RuleTrigger.triggered_at <= rules_end,
        )
        .group_by(RuleTrigger.rule_name)
        .order_by(func.count(RuleTrigger.id).desc())
        .limit(5)
        .all()
    )


    return {
        "total_claims": total_claims,
        "flagged_claims": flagged_claims,
        "avg_fraud_score": round(avg_fraud_score),
        "risk_exposure": risk_exposure,
        "risk_distribution": {
            "high": high,
            "medium": medium,
            "low": low,
        },
        "top_rules": [
            {"rule": r.rule_name, "count": r.count}
            for r in top_rules
        ],
        "trend": trend,
    }


# =================================================
# CSV EXPORT
# =================================================
@router.get("/export")
def export_dashboard_csv(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    output = StringIO()
    writer = csv.writer(output)

    # ---------------- CLAIMS OVERVIEW ----------------
    total_claims = db.query(Claim).count()

    flagged_claims = db.query(FraudEvent).filter(
        FraudEvent.flagged.is_(True)
    ).count()

    high_risk_claims = db.query(FraudEvent).filter(
        FraudEvent.severity == "HIGH"
    ).count()

    # ---------------- INVESTIGATIONS OVERVIEW ----------------
    from src.Admin.models.investigation import Investigation

    total_investigations = db.query(Investigation).count()
    high_inv = db.query(Investigation).filter(
        Investigation.priority == "High"
    ).count()
    medium_inv = db.query(Investigation).filter(
        Investigation.priority == "Medium"
    ).count()
    low_inv = db.query(Investigation).filter(
        Investigation.priority == "Low"
    ).count()

    # ---------------- SUMMARY CARDS ----------------
    avg_fraud_score = round(
        db.query(func.avg(FraudEvent.fraud_score)).scalar() or 0
    )

    risk_exposure = (
        db.query(func.sum(Claim.amount_claimed))
        .join(FraudEvent, FraudEvent.claim_id == Claim.id)
        .filter(FraudEvent.flagged.is_(True))
        .scalar()
    ) or 0

    # ---------------- RISK DISTRIBUTION ----------------
    high = db.query(FraudEvent).filter(
        FraudEvent.severity == "HIGH"
    ).count()
    medium = db.query(FraudEvent).filter(
        FraudEvent.severity == "MEDIUM"
    ).count()
    low = db.query(FraudEvent).filter(
        FraudEvent.severity == "LOW"
    ).count()

    # ---------------- TOP TRIGGERED RULES ----------------
    top_rules = (
        db.query(
            RuleTrigger.rule_name,
            func.count(RuleTrigger.id).label("count"),
        )
        .group_by(RuleTrigger.rule_name)
        .order_by(func.count(RuleTrigger.id).desc())
        .limit(5)
        .all()
    )

    # ================= WRITE CSV =================

    writer.writerow(["SECTION", "METRIC", "VALUE"])

    # Claims Overview
    writer.writerow(["Claims Overview", "Total Claims", total_claims])
    writer.writerow(["Claims Overview", "High Risk Claims", high_risk_claims])
    writer.writerow(["Claims Overview", "Flagged Claims", flagged_claims])

    # Investigations Overview
    writer.writerow(["Investigations Overview", "Total", total_investigations])
    writer.writerow(["Investigations Overview", "High", high_inv])
    writer.writerow(["Investigations Overview", "Medium", medium_inv])
    writer.writerow(["Investigations Overview", "Low", low_inv])

    # Summary Cards
    writer.writerow(["Summary", "Risk Exposure (INR)", risk_exposure])
    writer.writerow(["Summary", "Avg Fraud Score", avg_fraud_score])

    # Risk Distribution
    writer.writerow(["Risk Distribution", "High", high])
    writer.writerow(["Risk Distribution", "Medium", medium])
    writer.writerow(["Risk Distribution", "Low", low])

    # Top Triggered Rules
    for rule in top_rules:
        writer.writerow([
            "Top Triggered Rules",
            rule.rule_name,
            rule.count,
        ])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=fraud_dashboard.csv"
        },
    )
