from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])


def percent_change(current: float, previous: float) -> float:
    if previous == 0:
        return 0.0
    return round(((current - previous) / previous) * 100, 2)


@router.get("/dashboard")
def get_admin_dashboard():

    previous = {
        "total_claims": 300,
        "total_payouts": 170,
        "active_policies": 1200,
        "fraud_cases": 16,
    }

    current = {
        "total_claims": 320,
        "total_payouts": 180,
        "active_policies": 1250,
        "fraud_cases": 14,
        "total_users": 1500,
        "avg_settlement_days": 7.2,
        "settlement_rate": "94.2%",
    }

    def percent_change(curr, prev):
        return round(((curr - prev) / prev) * 100, 2) if prev else 0

    return {
        # KPI
        **current,

        # Growth
        "claims_growth_pct": percent_change(
            current["total_claims"], previous["total_claims"]
        ),
        "payout_growth_pct": percent_change(
            current["total_payouts"], previous["total_payouts"]
        ),
        "policies_growth_pct": percent_change(
            current["active_policies"], previous["active_policies"]
        ),
        "fraud_growth_pct": percent_change(
            current["fraud_cases"], previous["fraud_cases"]
        ),

        # Charts
        "claims_overview": [
            {"month": "Jan", "approved": 40, "rejected": 6},
            {"month": "Feb", "approved": 48, "rejected": 7},
            {"month": "Mar", "approved": 45, "rejected": 5},
            {"month": "Apr", "approved": 52, "rejected": 8},
            {"month": "May", "approved": 55, "rejected": 6},
            {"month": "Jun", "approved": 60, "rejected": 9},
        ],

        "fraud_stats": [
            {"name": "Legitimate", "value": 82},
            {"name": "Suspicious", "value": 12},
            {"name": "Flagged", "value": 6},
        ],

        "monthly_payouts": [
            {"month": "Jan", "amount": 2.4},
            {"month": "Feb", "amount": 2.6},
            {"month": "Mar", "amount": 2.8},
            {"month": "Apr", "amount": 3.0},
            {"month": "May", "amount": 3.2},
            {"month": "Jun", "amount": 3.5},
        ],
    }
