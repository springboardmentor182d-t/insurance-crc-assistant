import json
from pathlib import Path
from fastapi import APIRouter
from src.fraud.fraud_engine import calculate_fraud_with_rules

router = APIRouter()

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "claim_report.json"


@router.get("/fraud/claims")
def get_claims_default():
    with open(DATA_PATH) as f:
        claims = json.load(f)

    result = []
    for claim in claims:
        fraud = calculate_fraud_with_rules(claim)
        result.append({
            "id": claim["id"],
            "name": claim["name"],
            "claim_amount": claim["claim_amount"],
            "claim_date": claim["claim_date"],
            **fraud
        })

    return result


@router.post("/fraud/analyze")
def run_fraud_analytics(payload: dict):
    selected_rules = payload.get("rule_ids", [])

    with open(DATA_PATH) as f:
        claims = json.load(f)

    analyzed = []
    risk_count = {"Low": 0, "Medium": 0, "High": 0}

    for claim in claims:
        fraud = calculate_fraud_with_rules(claim, selected_rules)
        risk_count[fraud["risk"]] += 1

        analyzed.append({
            "id": claim["id"],
            "name": claim["name"],
            "fraud_score": fraud["fraud_score"],
            "risk": fraud["risk"],
            "triggered_rules": fraud["triggered_rules"]
        })

    return {
        "applied_rules": selected_rules or "ALL",
        "claims": analyzed,
        "risk_distribution": risk_count
    }
