# -------------------------------------------------
# Recommendation Scoring Logic
# -------------------------------------------------

def score_policy(policy, prefs):
    """
    Calculates a match score (0–100) for a policy
    based on user preferences.

    ✔ This function ONLY scores
    ✔ It does NOT decide visibility
    ✔ It is reusable by list + view APIs
    """

    score = 0
    reasons = []

    # 1️⃣ Insurance type match
    if prefs.get("insuranceTypes"):
        if policy["type"] in prefs["insuranceTypes"]:
            score += 40
            reasons.append("Matches your preferred insurance type")

    # 2️⃣ Budget fit
    if prefs.get("annualBudget") is not None:
        if policy["premium"] <= prefs["annualBudget"]:
            score += 25
            reasons.append("Fits your annual budget")

    # 3️⃣ Risk appetite
    if prefs.get("riskAppetite") == "Medium":
        score += 15
        reasons.append("Balanced coverage for medium risk appetite")

    # 4️⃣ Coverage requirement
    if prefs.get("desiredCoverage") is not None:
        if policy["coverage"] >= prefs["desiredCoverage"]:
            score += 20
            reasons.append("Meets your desired coverage")

    return min(score, 100), ", ".join(reasons)


# -------------------------------------------------
# HARD FILTER — Insurance Type
# -------------------------------------------------

def passes_type_filter(policy, prefs):
    """
    Returns True if the policy should be considered
    based on selected insurance types.

    ✔ Filtering responsibility ONLY
    ✔ Keeps scoring logic clean
    """

    selected_types = prefs.get("insuranceTypes", [])

    # If user didn't select anything → allow all
    if not selected_types:
        return True

    return policy.get("type") in selected_types
