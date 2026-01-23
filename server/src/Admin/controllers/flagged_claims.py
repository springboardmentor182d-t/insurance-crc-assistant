from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from src.database.core import SessionLocal
from src.claims.models import Claim
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger
from src.users.models import User
from src.policies_recommendations_profile_preferences.models.user_policy import UserPolicy
from src.Admin.models.investigation import Investigation

router = APIRouter(prefix="/admin", tags=["Flagged Claims"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================
# GET FLAGGED CLAIMS
# ============================
@router.get("/flagged-claims")
def flagged_claims(
    severity: str | None = None,
    min_score: int = 0,
    db: Session = Depends(get_db),
):
    query = (
        db.query(
            Claim.id.label("claim_id"),
            UserPolicy.policy_name.label("policy"),
            Claim.claim_type,
            Claim.amount_claimed,
            Claim.status,
            Claim.incident_date,
            Claim.description,

            Claim.user_id,
            User.email.label("policyholder_name"),

            FraudEvent.fraud_score,
        )
        .join(FraudEvent, FraudEvent.claim_id == Claim.id)
        .join(User, User.id == Claim.user_id)
        .join(UserPolicy, UserPolicy.id == Claim.user_policy_id)
        .filter(FraudEvent.flagged.is_(True))
        .filter(FraudEvent.fraud_score >= min_score)
    )

    if severity == "HIGH":
        query = query.filter(FraudEvent.fraud_score >= 70)
    elif severity == "MEDIUM":
        query = query.filter(
            FraudEvent.fraud_score >= 40,
            FraudEvent.fraud_score < 70,
        )
    elif severity == "LOW":
        query = query.filter(FraudEvent.fraud_score < 40)

    rows = query.order_by(FraudEvent.fraud_score.desc()).all()

    results = []
    for r in rows:
        rules = (
            db.query(RuleTrigger.rule_name)
            .filter(RuleTrigger.claim_id == r.claim_id)
            .all()
        )

        severity_label = (
            "HIGH" if r.fraud_score >= 70
            else "MEDIUM" if r.fraud_score >= 40
            else "LOW"
        )

        results.append({
            "claim_id": r.claim_id,
            "policy": r.policy,
            "claim_type": r.claim_type,
            "amount": r.amount_claimed,
            "status": r.status,
            "incident_date": r.incident_date,
            "description": r.description,
            "fraud_score": r.fraud_score,
            "severity": severity_label,
            "rules": [x.rule_name for x in rules],

            "policyholder_id": r.user_id,
            "policyholder_name": r.policyholder_name,
        })

    return {
        "total": len(results),
        "high": sum(1 for r in results if r["severity"] == "HIGH"),
        "medium": sum(1 for r in results if r["severity"] == "MEDIUM"),
        "low": sum(1 for r in results if r["severity"] == "LOW"),
        "results": results,
    }


# ============================
# APPROVE CLAIM
# ============================
@router.post("/flagged-claims/{claim_id}/approve")
def approve_flagged_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(404, "Claim not found")

    fraud_event = db.query(FraudEvent).filter(
        FraudEvent.claim_id == claim_id,
        FraudEvent.flagged.is_(True)
    ).first()

    if not fraud_event:
        raise HTTPException(400, "Claim is not flagged")

    claim.status = "approved"
    fraud_event.flagged = False
    db.commit()

    return {"message": "Claim approved successfully"}



# ============================
# DENY CLAIM
# ============================
@router.post("/flagged-claims/{claim_id}/deny")
@router.post("/flagged-claims/{claim_id}/deny")
def deny_flagged_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(404, "Claim not found")

    fraud_event = db.query(FraudEvent).filter(
        FraudEvent.claim_id == claim_id,
        FraudEvent.flagged.is_(True)
    ).first()

    if not fraud_event:
        raise HTTPException(400, "Claim is not flagged")

    claim.status = "rejected"
    fraud_event.flagged = False
    db.commit()

    return {"message": "Claim rejected successfully"}



# ============================
# INVESTIGATE CLAIM
# ============================
@router.post("/flagged-claims/{claim_id}/investigate")
@router.post("/flagged-claims/{claim_id}/investigate")
def investigate_flagged_claim(claim_id: int, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(404, "Claim not found")

    fraud_event = db.query(FraudEvent).filter(
        FraudEvent.claim_id == claim_id,
        FraudEvent.flagged.is_(True)
    ).first()

    if not fraud_event:
        raise HTTPException(400, "Claim is not flagged")

    claim.status = "under_review"

    priority = (
        "High" if fraud_event.severity == "HIGH"
        else "Medium" if fraud_event.severity == "MEDIUM"
        else "Low"
    )

    investigation = Investigation(
        claim_id=claim_id,
        investigator="Admin",
        investigator_id=1,
        priority=priority,
        status="PENDING",
        notes="Auto-created from flagged claims",
        created_at=datetime.utcnow(),
    )

    db.add(investigation)
    fraud_event.flagged = False
    db.commit()

    return {
        "message": "Claim sent for investigation",
        "priority": priority,
    }

