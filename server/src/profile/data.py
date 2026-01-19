import json
from pathlib import Path
from typing import Any, Dict
from typing import List, Dict
from src.users.models import Policy
from src.profile.models import UserPreferences

BASE_PATH = Path(__file__).resolve().parent.parent / "data"
PROFILE_FILE = BASE_PATH / "user_profile.json"
PREFS_FILE = BASE_PATH / "user_preferences.json"


def read_json(file: Path) -> Dict[str, Any]:
    """Read JSON data from a file safely."""
    if not file.exists():
        return {}
    with file.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(file: Path, data: Dict[str, Any]) -> None:
    """Write JSON data to a file, creating folders if needed."""
    file.parent.mkdir(parents=True, exist_ok=True)
    with file.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


# -----------------------------
# Profile functions
# -----------------------------
def get_profile() -> Dict[str, Any]:
    """Return user profile data."""
    return read_json(PROFILE_FILE)


def save_profile(data: Dict[str, Any]) -> Dict[str, Any]:
    """Save user profile data."""
    write_json(PROFILE_FILE, data)
    return data


# -----------------------------
# Preferences functions
# -----------------------------
def get_preferences() -> Dict[str, Any]:
    """Return user preferences data."""
    return read_json(PREFS_FILE)


def save_preferences(data: Dict[str, Any]) -> Dict[str, Any]:
    """Save user preferences data."""
    write_json(PREFS_FILE, data)
    return data
# src/recommendations/engine.py

from typing import List, Dict
from src.users.models import Policy
from src.profile.models import UserPreferences

# Define risk mapping and weights
RISK_MAP = {"low": 1.0, "medium": 0.6, "high": 0.3}

WEIGHTS = {
    "coverage": 0.25,
    "affordability": 0.20,
    "claim": 0.20,
    "waiting": 0.10,
    "network": 0.10,
    "addons": 0.05,
    "risk": 0.10,
}


def custom_policy_score(policy: Dict) -> Dict:
    """Convert raw policy data into scoring components."""
    return {
        "coverage": policy["coverage_amount"],
        "affordability": 1 / (policy["annual_premium"] + 1),
        "claim": (policy.get("claim_settlement_ratio") or 0) / 100,
        "waiting": 1 / (1 + (policy.get("waiting_period_years") or 0)),
        "network": policy.get("network_size") or 0,
        "addons": len(policy.get("add_ons", "").split(",")) if policy.get("add_ons") else 0,
        "risk": RISK_MAP.get(policy.get("risk_level"), 0.5),
    }


def normalize(scores: List[Dict]) -> List[Dict]:
    """Normalize each scoring dimension to [0,1]."""
    for key in WEIGHTS:
        vals = [s[key] for s in scores]
        min_v, max_v = min(vals), max(vals)
        for s in scores:
            s[key] = 1.0 if min_v == max_v else (s[key] - min_v) / (max_v - min_v)
    return scores


def compute_scores(policies: List[Dict]) -> List[Dict]:
    """Compute final weighted score for each policy."""
    raw = [custom_policy_score(p) for p in policies]
    normalized = normalize(raw)

    results = []
    for i, p in enumerate(policies):
        score = sum(normalized[i][k] * WEIGHTS[k] for k in WEIGHTS)
        p["final_score"] = round(score, 3)
        results.append(p)

    return sorted(results, key=lambda x: x["final_score"], reverse=True)


def recommendation_engine(db, user_id: int) -> List[Dict]:
   
    # Get user preferences from database
    prefs: UserPreferences = db.query(UserPreferences).filter_by(user_id=1).first()
    if not prefs:
        return []

    # Fetch all policies
    policies: List[Policy] = db.query(Policy).all()

    policy_dicts = []
    for p in policies:
        # Coverage interest filter
        key = p.policy_type.split()[0].lower()
        if not prefs.coverageInterests.get(key, False):
            continue

        # Premium range filter
        if not (prefs.premiumRange["min"] <= p.annual_premium <= prefs.premiumRange["max"]):
            continue

        policy_dicts.append({
            "id": p.id,
            "title": p.title,
            "policy_type": p.policy_type,
            "coverage_amount": p.coverage_amount,
            "annual_premium": p.annual_premium,
            "claim_settlement_ratio": p.claim_settlement_ratio,
            "waiting_period_years": p.waiting_period_years,
            "network_size": p.network_size,
            "add_ons": p.add_ons,
            "risk_level": p.risk_level,
        })

    return compute_scores(policy_dicts)[:5]