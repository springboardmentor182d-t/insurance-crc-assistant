def get_all_policies(category: str | None = None):
    policies = [
        {
            "id": 1,
            "name": "Health Shield Pro",
            "provider": "SecureLife Insurance",
            "category": "Health",
            "premium": 15000,
            "coverage": 500000,
            "term": "1 Year (Renewable)",
            "deductible": 25000,
            "waitingPeriod": "30 Days",
            "roomRent": "No Limit",
            "score": 8.5,
            "benefits": [
                "Cashless hospitalization at 5000+ hospitals",
                "Coverage for pre-existing diseases after 3 years",
                "Annual health check-up included",
                "No claim bonus up to 50%",
                "Ambulance charges covered"
            ],
            "exclusions": [
                "Cosmetic procedures",
                "Self-inflicted injuries",
                "Experimental treatments"
            ]
        },
        {
            "id": 2,
            "name": "Health Care Essential",
            "provider": "MediSure",
            "category": "Health",
            "premium": 10000,
            "coverage": 300000,
            "term": "1 Year",
            "deductible": 20000,
            "waitingPeriod": "45 Days",
            "roomRent": "Shared Room",
            "score": 7.8,
            "benefits": [
                "Cashless hospitalization",
                "Day-care procedures covered",
                "Pre & post hospitalization"
            ],
            "exclusions": [
                "Cosmetic surgery",
                "Non-prescribed treatments"
            ]
        },
        {
            "id": 3,
            "name": "Life Secure Plan",
            "provider": "LifeGuard",
            "category": "Life",
            "premium": 15000,
            "coverage": 500000,
            "term": "20 Years",
            "deductible": None,
            "waitingPeriod": "None",
            "roomRent": None,
            "score": 9.1,
            "benefits": [
                "Death benefit",
                "Tax benefits under 80C",
                "Accidental death cover"
            ],
            "exclusions": [
                "Suicide within 1 year"
            ]
        },
        {
            "id": 4,
            "name": "Auto Shield",
            "provider": "DriveSafe",
            "category": "Auto",
            "premium": 12000,
            "coverage": 200000,
            "term": "1 Year",
            "deductible": 5000,
            "waitingPeriod": "None",
            "roomRent": None,
            "score": 8.0,
            "benefits": [
                "Own damage cover",
                "Third-party liability",
                "Roadside assistance"
            ],
            "exclusions": [
                "Drunk driving",
                "Illegal racing"
            ]
        },
        {
            "id": 5,
            "name": "Travel Safe",
            "provider": "GlobeCare",
            "category": "Travel",
            "premium": 8000,
            "coverage": 100000,
            "term": "30 Days",
            "deductible": 3000,
            "waitingPeriod": "None",
            "roomRent": None,
            "score": 7.5,
            "benefits": [
                "Medical emergencies",
                "Trip cancellation",
                "Lost baggage"
            ],
            "exclusions": [
                "Adventure sports",
                "Pre-existing illness"
            ]
        },
        {
            "id": 6,
            "name": "Home Protect",
            "provider": "SafeNest",
            "category": "Home",
            "premium": 18000,
            "coverage": 600000,
            "term": "1 Year",
            "deductible": 10000,
            "waitingPeriod": "None",
            "roomRent": None,
            "score": 8.3,
            "benefits": [
                "Fire damage cover",
                "Theft protection",
                "Natural disaster cover"
            ],
            "exclusions": [
                "Intentional damage",
                "War & nuclear risks"
            ]
        }
    ]

    if category:
        policies = [p for p in policies if p["category"] == category]

    return policies


def get_policy_by_id(policy_id: int):
    for policy in get_all_policies():
        if policy["id"] == policy_id:
            return policy
    return None
