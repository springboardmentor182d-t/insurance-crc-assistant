from app.database import SessionLocal, engine, Base
from app.models.policy import Policy

Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Clear old data (optional but recommended during dev)
db.query(Policy).delete()
db.commit()

policies = [

    # ---------------- HEALTH (5) ----------------
    Policy(name="Health Secure Plus", category="Health", premium=12000, coverage="Hospitalization up to 10L", risk_level="Low"),
    Policy(name="Family Health Protect", category="Health", premium=18000, coverage="Family floater 15L", risk_level="Medium"),
    Policy(name="Senior Care Plan", category="Health", premium=22000, coverage="Senior citizens coverage", risk_level="High"),
    Policy(name="Health Max Ultra", category="Health", premium=25000, coverage="Unlimited hospitalization", risk_level="High"),
    Policy(name="Budget Health Cover", category="Health", premium=8000, coverage="Basic hospitalization", risk_level="Low"),

    # ---------------- AUTO (5) ----------------
    Policy(name="Auto Shield", category="Auto", premium=8000, coverage="Comprehensive car insurance", risk_level="Low"),
    Policy(name="Two Wheeler Secure", category="Auto", premium=3000, coverage="Bike insurance", risk_level="Low"),
    Policy(name="Premium Car Protect", category="Auto", premium=15000, coverage="Zero depreciation cover", risk_level="Medium"),
    Policy(name="Commercial Vehicle Plan", category="Auto", premium=20000, coverage="Commercial vehicle insurance", risk_level="High"),
    Policy(name="Third Party Auto Basic", category="Auto", premium=2500, coverage="Third party liability", risk_level="Low"),

    # ---------------- LIFE (5) ----------------
    Policy(name="Life Secure Plan", category="Life", premium=15000, coverage="Term life cover 1Cr", risk_level="Medium"),
    Policy(name="Life Wealth Builder", category="Life", premium=30000, coverage="Investment + insurance", risk_level="High"),
    Policy(name="Child Future Secure", category="Life", premium=18000, coverage="Child education fund", risk_level="Medium"),
    Policy(name="Whole Life Advantage", category="Life", premium=22000, coverage="Lifetime coverage", risk_level="Low"),
    Policy(name="Basic Term Shield", category="Life", premium=9000, coverage="Basic term insurance", risk_level="Low"),

    # ---------------- HOME (4) ----------------
    Policy(name="Home Safe Insurance", category="Home", premium=10000, coverage="Home structure + contents", risk_level="Low"),
    Policy(name="Apartment Shield", category="Home", premium=8000, coverage="Flat insurance", risk_level="Low"),
    Policy(name="Premium Home Guard", category="Home", premium=18000, coverage="Luxury home coverage", risk_level="Medium"),
    Policy(name="Rented Home Cover", category="Home", premium=6000, coverage="Tenant insurance", risk_level="Low"),

    # ---------------- TRAVEL (4) ----------------
    Policy(name="Travel Easy International", category="Travel", premium=5000, coverage="International travel cover", risk_level="Low"),
    Policy(name="Student Travel Protect", category="Travel", premium=7000, coverage="Student overseas insurance", risk_level="Medium"),
    Policy(name="Senior Travel Secure", category="Travel", premium=9000, coverage="Senior citizen travel", risk_level="High"),
    Policy(name="Domestic Trip Shield", category="Travel", premium=3000, coverage="Domestic travel insurance", risk_level="Low"),

    # ---------------- FIRE (4) ----------------
    Policy(name="Fire Protect Basic", category="Fire", premium=6000, coverage="Fire damage protection", risk_level="Low"),
    Policy(name="Industrial Fire Shield", category="Fire", premium=25000, coverage="Factory fire insurance", risk_level="High"),
    Policy(name="Warehouse Fire Cover", category="Fire", premium=18000, coverage="Warehouse protection", risk_level="Medium"),
    Policy(name="Shop Fire Insurance", category="Fire", premium=9000, coverage="Retail shop fire cover", risk_level="Low"),

    # ---------------- BUSINESS (3) ----------------
    Policy(name="Business Liability Protect", category="Business", premium=20000, coverage="Third-party liability", risk_level="Medium"),
    Policy(name="Startup Secure Plan", category="Business", premium=12000, coverage="Startup insurance bundle", risk_level="Low"),
    Policy(name="Enterprise Risk Shield", category="Business", premium=40000, coverage="Large enterprise coverage", risk_level="High"),
]

db.add_all(policies)
db.commit()
db.close()

print("✅ 30 policies seeded successfully")
