from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
def get_admin_dashboard():
    return {
        "total_claims": 328,
        "total_payouts": 174,
        "active_policies": 1245,
        "fraud_cases": 13,

        "claims_overview": [
            {"month": "Jan", "approved": 35, "rejected": 5},
            {"month": "Feb", "approved": 42, "rejected": 6},
            {"month": "Mar", "approved": 38, "rejected": 4},
            {"month": "Apr", "approved": 50, "rejected": 7},
            {"month": "May", "approved": 45, "rejected": 6},
            {"month": "Jun", "approved": 60, "rejected": 8},
        ],

        "fraud_stats": [
            {"name": "Legitimate", "value": 87},
            {"name": "Suspicious", "value": 10},
            {"name": "Flagged", "value": 3},
        ],

        "monthly_payouts": [
            {"month": "Jan", "amount": 2.5},
            {"month": "Feb", "amount": 2.8},
            {"month": "Mar", "amount": 2.6},
            {"month": "Apr", "amount": 3.2},
            {"month": "May", "amount": 2.9},
            {"month": "Jun", "amount": 3.5},
        ],
    }
