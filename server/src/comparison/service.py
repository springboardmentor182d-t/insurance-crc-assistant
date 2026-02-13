def get_comparison_rules():
    """
    Master definition of comparison rules.
    Frontend MUST NOT hardcode comparison logic.
    """

    return [
        # --------------------
        # PRICE & COVERAGE
        # --------------------
        {
            "key": "premium",
            "label": "Annual Premium",
            "type": "number",
            "better": "lower",
            "source": "premium",
        },
        {
            "key": "coverage",
            "label": "Sum Insured",
            "type": "number",
            "better": "higher",
            "source": "coverage",
        },
        {
            "key": "cashlessHospitals",
            "label": "Cashless Hospitals",
            "type": "number",
            "better": "higher",
            "source": "cashlessHospitals",
        },

        # --------------------
        # TIME / WAITING
        # --------------------
        {
            "key": "waitingPeriod",
            "label": "Waiting Period",
            "type": "number",
            "better": "lower",
            "source": "waitingPeriod",
        },
        {
            "key": "preExistingCoverage",
            "label": "Pre-existing Coverage",
            "type": "text",
            "better": "lower",
            "source": "preExistingCoverage",
        },

        # --------------------
        # QUALITY METRICS
        # --------------------
        {
            "key": "claimSettlement",
            "label": "Claim Settlement",
            "type": "percentage",
            "better": "higher",
            "source": "claimSettlement",
        },

        # --------------------
        # ROOM RENT (RANKED)
        # --------------------
        {
            "key": "roomRent",
            "label": "Room Rent Limit",
            "type": "rank",
            "better": "higher",
            "source": "roomRent",
            "ranking": {
                "No Limit": 3,
                "Single Private Room": 2,
                "1% of SI": 1,
                "Shared Room": 0,
            },
        },

        # --------------------
        # BOOLEAN BENEFITS
        # --------------------
        {
            "key": "dayCare",
            "label": "Day Care Procedures",
            "type": "boolean",
            "source": "benefits",
            "match": ["day care"],
        },
        {
            "key": "ambulance",
            "label": "Ambulance Cover",
            "type": "boolean",
            "source": "benefits",
            "match": ["ambulance"],
        },
        {
            "key": "healthCheckup",
            "label": "Health Check-up",
            "type": "boolean",
            "source": "benefits",
            "match": ["health check"],
        },
    ]


def evaluate_comparison(policies, rules):
    """
    Evaluates comparison rows for given policies.
    Returns frontend-ready comparison rows.
    """

    rows = []

    for rule in rules:
        rule_type = rule["type"]
        source = rule.get("source")
        better = rule.get("better")
        match_keywords = rule.get("match", [])
        ranking = rule.get("ranking", {})

        values = []
        scores = []

        for policy in policies:
            value = None
            score = None

            # --------------------
            # NUMBER / CURRENCY
            # --------------------
            if rule_type == "number":
                raw = policy.get(source)
                if isinstance(raw, (int, float)):
                    value = raw
                    score = raw

            # --------------------
            # PERCENTAGE
            # --------------------
            elif rule_type == "percentage":
                raw = policy.get(source)
                if isinstance(raw, (int, float)):
                    value = raw
                    score = raw

            # --------------------
            # TEXT
            # --------------------
            elif rule_type == "text":
                value = policy.get(source)

            # --------------------
            # BOOLEAN (FROM BENEFITS)
            # --------------------
            elif rule_type == "boolean":
                benefits = policy.get("benefits", [])
                value = any(
                    kw.lower() in b.lower()
                    for kw in match_keywords
                    for b in benefits
                )
                score = 1 if value else 0

            # --------------------
            # RANK
            # --------------------
            elif rule_type == "rank":
                raw = policy.get(source)
                value = raw
                score = ranking.get(raw, -1)

            values.append(value)
            scores.append(score)

        # --------------------
        # BEST VALUE LOGIC
        # --------------------
        best_index = None
        valid_scores = [s for s in scores if s is not None]

        if valid_scores and better:
            if better == "higher":
                best_score = max(valid_scores)
            else:
                best_score = min(valid_scores)

            if best_score in scores:
                best_index = scores.index(best_score)

        rows.append({
            "key": rule["key"],
            "label": rule["label"],
            "type": rule_type,
            "values": values,
            "bestIndex": best_index,
        })

    return rows
