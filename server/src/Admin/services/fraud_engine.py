from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from src.Admin.models.fraud_rule import FraudRule
from src.Admin.models.fraud_event import FraudEvent
from src.Admin.models.rule_trigger import RuleTrigger
from src.claims.models import Claim


def evaluate_claim_fraud(db: Session, claim: Claim):
    print("🔥 FRAUD ENGINE CALLED FOR CLAIM:", claim.id)

    policy = claim.user_policy
    rules = db.query(FraudRule).filter(FraudRule.active == True).all()

    total_score = 0
    rule_triggered = False

    def trigger(rule):
        nonlocal total_score, rule_triggered
        total_score += rule.threshold
        rule_triggered = True

        db.add(
            RuleTrigger(
                rule_name=rule.rule_name,
                claim_id=claim.id,
            )
        )

    for rule in rules:

        if rule.rule_name == "Claim Exceeds Coverage":
            if claim.amount_claimed > policy.coverage_amount:
                trigger(rule)

        elif rule.rule_name == "High Coverage Utilization":
            if claim.amount_claimed >= 0.9 * policy.coverage_amount:
                trigger(rule)

        elif rule.rule_name == "Backdated Claim":
            if claim.incident_date < policy.start_date:
                trigger(rule)

        elif rule.rule_name == "Expired Policy Claim":
            if claim.incident_date > policy.end_date:
                trigger(rule)

        elif rule.rule_name == "Early Claim After Purchase":
            days_active = (claim.incident_date - policy.start_date).days
            if days_active <= 7:
                trigger(rule)

        elif rule.rule_name == "Premium to Claim Ratio Abuse":
            if claim.amount_claimed > policy.premium_amount * 10:
                trigger(rule)

        elif rule.rule_name == "Rapid Multiple Claims Submission":
            recent_claims = (
                db.query(Claim)
                .filter(
                    Claim.user_id == claim.user_id,
                    Claim.created_at >= datetime.utcnow() - timedelta(days=30),
                )
                .count()
            )
            if recent_claims >= 3:
                trigger(rule)

        elif rule.rule_name == "Repeated Policy Claims":
            policy_claims = (
                db.query(Claim)
                .filter(Claim.user_policy_id == claim.user_policy_id)
                .count()
            )
            if policy_claims >= 2:
                trigger(rule)

    # ---------------- FINAL DECISION ----------------
    flagged = rule_triggered  # ✅ ANY rule → flagged

    severity = (
        "HIGH" if total_score >= 70
        else "MEDIUM" if total_score >= 40
        else "LOW"
    )

    fraud_event = FraudEvent(
        claim_id=claim.id,
        event_date=datetime.utcnow(),
        fraud_score=total_score,
        flagged=flagged,
        severity=severity,
    )

    db.add(fraud_event)
    db.commit()
    db.refresh(fraud_event)

    return fraud_event
