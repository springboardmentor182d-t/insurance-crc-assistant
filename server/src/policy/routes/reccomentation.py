from typing import List, Dict
from collections import defaultdict


RISK_MAP = {"low": 1.0, "medium": 0.6, "high": 0.3}

WEIGHTS = {
    "coverage": 0.25,
    "affordability": 0.20,
    "claim": 0.20,
    "waiting": 0.10,
    "network": 0.10,
    "addons": 0.05,
    "risk": 0.10
}


def custom_policy_score(policy: Dict) -> Dict:
    ptype = policy["policy_type"]

 
    if ptype in ["Health Insurance", "Life Insurance"]:
        coverage_score = policy["coverage_amount"] * 1.2
    elif ptype in ["Retirement Insurance", "Savings Plan"]:
        coverage_score = policy["coverage_amount"] * 0.8
    else:
        coverage_score = policy["coverage_amount"]

 
    if ptype in ["Travel Insurance", "Child Insurance"]:
        affordability_score = 1 / (policy["annual_premium"] + 1) * 1.2
    else:
        affordability_score = 1 / (policy["annual_premium"] + 1)


    if ptype in ["Health Insurance", "Accident Insurance"]:
        claim_score = policy["claim_settlement_ratio"] / 100 * 1.1
    else:
        claim_score = policy["claim_settlement_ratio"] / 100

  
    if ptype in ["Health Insurance", "Life Insurance"]:
        waiting_score = 1 / (1 + policy["waiting_period_years"]) * 1.1
    else:
        waiting_score = 1 / (1 + policy["waiting_period_years"])

 
    network_score = policy["network_size"]

    addons_score = len(policy["add_ons"].split(",")) if policy["add_ons"] else 0

   
    risk_score = RISK_MAP.get(policy["risk_level"], 0.5)

    return {
        "coverage": coverage_score,
        "affordability": affordability_score,
        "claim": claim_score,
        "waiting": waiting_score,
        "network": network_score,
        "addons": addons_score,
        "risk": risk_score
    }


def normalize_scores_per_category(scores_list: List[Dict]) -> List[Dict]:
    categories = WEIGHTS.keys()
    min_max = {}
    for cat in categories:
        vals = [s[cat] for s in scores_list]
        min_max[cat] = (min(vals), max(vals))

    normalized_list = []
    for s in scores_list:
        norm = {}
        for cat in categories:
            min_v, max_v = min_max[cat]
            if max_v == min_v:
                norm[cat] = 1.0
            else:
                norm[cat] = (s[cat] - min_v) / (max_v - min_v)
        normalized_list.append(norm)
    return normalized_list

def compute_final_scores(policies: List[Dict]) -> List[Dict]:
    raw_scores = [custom_policy_score(p) for p in policies]
    normalized = normalize_scores_per_category(raw_scores)

    final_list = []
    for i, policy in enumerate(policies):
        score = sum(normalized[i][cat] * WEIGHTS[cat] for cat in WEIGHTS)
        final_policy = policy.copy()
        final_policy["final_score"] = round(score, 3)
        final_list.append(final_policy)

    final_list.sort(key=lambda x: x["final_score"], reverse=True)
    return final_list


def recommend_best_per_category(policies: List[Dict]) -> Dict[str, Dict]:
    grouped = defaultdict(list)
    for p in policies:
        grouped[p["policy_type"]].append(p)

    recommendations = {}
    for ptype, plist in grouped.items():
        ranked = compute_final_scores(plist)
        recommendations[ptype] = ranked[0]  

    return recommendations




