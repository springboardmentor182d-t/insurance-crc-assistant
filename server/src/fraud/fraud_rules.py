from datetime import datetime

def rule_high_claim_amount(claim):
    if claim["claim_amount"] >= 0.8 * claim["sum_insured"]:
        return 30, "High claim amount"
    return 0, None


def rule_early_claim(claim):
    days = (
        datetime.strptime(claim["claim_date"], "%Y-%m-%d")
        - datetime.strptime(claim["policy_start_date"], "%Y-%m-%d")
    ).days

    if days <= 30:
        return 25, "Early policy claim"
    return 0, None


def rule_multiple_claims(claim):
    if claim["claims_last_6_months"] > 2:
        return 20, "Multiple claims in short duration"
    return 0, None


def rule_document_issue(claim):
    if not claim["documents_ok"]:
        return 20, "Document issues"
    return 0, None


def rule_shared_bank(claim):
    if claim["shared_bank_account"]:
        return 30, "Shared bank account"
    return 0, None


FRAUD_RULES = {
    "FRD-001": rule_high_claim_amount,
    "FRD-002": rule_early_claim,
    "FRD-003": rule_multiple_claims,
    "FRD-004": rule_document_issue,
    "FRD-005": rule_shared_bank,
}
