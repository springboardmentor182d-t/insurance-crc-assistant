def score_policy(policy, prefs):
    score = 0
    reasons = []

    if policy["type"] in prefs["insuranceTypes"]:
        score += 40
        reasons.append("Matches your preferred insurance type")

    if policy["premium"] <= prefs["annualBudget"]:
        score += 25
        reasons.append("Fits your annual budget")

    if prefs["riskAppetite"] == "Medium":
        score += 15
        reasons.append("Balanced coverage for medium risk appetite")

    if policy["coverage"] >= prefs["desiredCoverage"]:
        score += 20
        reasons.append("Meets your desired coverage")

    return min(score, 100), ", ".join(reasons)
