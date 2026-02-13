from sqlalchemy.ext.asyncio import AsyncSession
from src.entities.policy import Policy


POLICIES = [
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
        "benefits": [
            "Cashless hospitalization at 5000+ hospitals",
            "Coverage for pre-existing diseases after 3 years",
            "Annual health check-up included",
            "No claim bonus up to 50%",
            "Ambulance charges covered",
        ],
        "exclusions": [
            "Cosmetic procedures",
            "Self-inflicted injuries",
            "Experimental treatments",
        ],
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
        "benefits": [
            "Cashless hospitalization",
            "Day-care procedures covered",
            "Pre & post hospitalization",
        ],
        "exclusions": [
            "Cosmetic surgery",
            "Non-prescribed treatments",
        ],
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
        "benefits": [
            "Death benefit",
            "Tax benefits under 80C",
            "Accidental death cover",
        ],
        "exclusions": [
            "Suicide within 1 year",
        ],
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
        "benefits": [
            "Own damage cover",
            "Third-party liability",
            "Roadside assistance",
        ],
        "exclusions": [
            "Drunk driving",
            "Illegal racing",
        ],
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
        "benefits": [
            "Medical emergencies",
            "Trip cancellation",
            "Lost baggage",
        ],
        "exclusions": [
            "Adventure sports",
            "Pre-existing illness",
        ],
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
        "benefits": [
            "Fire damage cover",
            "Theft protection",
            "Natural disaster cover",
        ],
        "exclusions": [
            "Intentional damage",
            "War & nuclear risks",
        ],
    },
]


async def seed_policies(db: AsyncSession):
    """
    Seeds policy master data.
    Run ONLY ONCE in development.
    """
    for policy in POLICIES:
        db.add(Policy(**policy))

    await db.commit()
