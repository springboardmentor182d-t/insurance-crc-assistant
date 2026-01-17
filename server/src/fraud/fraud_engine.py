from src.fraud.fraud_rules import FRAUD_RULES

def calculate_fraud_with_rules(claim, selected_rules=None):
    score = 0
    triggered_rules = []

    rules_to_apply = (
        selected_rules if selected_rules else FRAUD_RULES.keys()
    )

    for rule_id in rules_to_apply:
        rule_fn = FRAUD_RULES.get(rule_id)
        if rule_fn:
            rule_score, rule_name = rule_fn(claim)
            score += rule_score
            if rule_name:
                triggered_rules.append(rule_name)

    if score <= 30:
        risk = "Low"
    elif score <= 60:
        risk = "Medium"
    else:
        risk = "High"

    return {
        "fraud_score": score,
        "risk": risk,
        "triggered_rules": triggered_rules
    }
