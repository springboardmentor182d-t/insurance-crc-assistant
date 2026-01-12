from src.database.core import SessionLocal
from src.users.models import Policy
import random

db = SessionLocal()



policies = [
    Policy(
        title="Health Shield Plan",
        policy_number="HSP-398274",
        policy_type="Health Insurance",
        coverage_amount=500000,
        annual_premium=12000,
        payment_frequency="Monthly",
        claim_settlement_ratio=95.0,
        waiting_period_years=1,
        network_size=5000,
        add_ons="critical_illness,zero_copay",
        risk_level="medium"
    ),
    Policy(
        title="Family Care Plus",
        policy_number="FCP-782341",
        policy_type="Family Insurance",
        coverage_amount=1000000,
        annual_premium=25000,
        payment_frequency="Yearly",
        claim_settlement_ratio=92.0,
        waiting_period_years=0,
        network_size=4500,
        add_ons="maternity_cover,dental_cover",
        risk_level="medium"
    ),
    Policy(
        title="Travel Safe Plan",
        policy_number="TSP-552341",
        policy_type="Travel Insurance",
        coverage_amount=200000,
        annual_premium=5000,
        payment_frequency="One Time",
        claim_settlement_ratio=98.0,
        waiting_period_years=0,
        network_size=1000,
        add_ons="lost_baggage,flight_delay",
        risk_level="low"
    ),
    Policy(
        title="Senior Health Plan",
        policy_number="SHP-998231",
        policy_type="Senior Citizen Insurance",
        coverage_amount=600000,
        annual_premium=15000,
        payment_frequency="Monthly",
        claim_settlement_ratio=90.0,
        waiting_period_years=2,
        network_size=3000,
        add_ons="home_care,annual_checkup",
        risk_level="high"
    ),
    Policy(
        title="Accident Guard",
        policy_number="AG-663218",
        policy_type="Accident Insurance",
        coverage_amount=300000,
        annual_premium=8000,
        payment_frequency="Yearly",
        claim_settlement_ratio=97.0,
        waiting_period_years=0,
        network_size=500,
        add_ons="hospital_cash,disability_cover",
        risk_level="medium"
    ),
    Policy(
        title="Child Future Plan",
        policy_number="CFP-441287",
        policy_type="Child Insurance",
        coverage_amount=1500000,
        annual_premium=30000,
        payment_frequency="Yearly",
        claim_settlement_ratio=96.0,
        waiting_period_years=0,
        network_size=2500,
        add_ons="education_cover,accidental_cover",
        risk_level="low"
    ),
    Policy(
        title="Retirement Plans",
        policy_number="RP-441288",
        policy_type="Retirement Insurance",
        coverage_amount=1500000,
        annual_premium=35000,
        payment_frequency="Yearly",
        claim_settlement_ratio=94.0,
        waiting_period_years=0,
        network_size=4000,
        add_ons="pension_topup,health_cover",
        risk_level="medium"
    ),
    Policy(
        title="Term Life Insurance",
        policy_number="TLI-441289",
        policy_type="Life Insurance",
        coverage_amount=1500000,
        annual_premium=40000,
        payment_frequency="Yearly",
        claim_settlement_ratio=95.0,
        waiting_period_years=0,
        network_size=3500,
        add_ons="critical_illness_cover,accidental_cover",
        risk_level="medium"
    ),
    Policy(
        title="Endowment Plans",
        policy_number="EP-441290",
        policy_type="Savings Plan",
        coverage_amount=1500000,
        annual_premium=30000,
        payment_frequency="Yearly",
        claim_settlement_ratio=93.0,
        waiting_period_years=0,
        network_size=2000,
        add_ons="maturity_bonus,loan_facility",
        risk_level="low"
    ),



    # Health Insurance
    Policy(
        title="Health Prime Plan",
        policy_number="HPP-398290",
        policy_type="Health Insurance",
        coverage_amount=700000,
        annual_premium=15000,
        payment_frequency="Monthly",
        claim_settlement_ratio=97.0,
        waiting_period_years=1,
        network_size=5200,
        add_ons="wellness_check,vision_cover",
        risk_level="medium"
    ),
    
    # Family Insurance
    Policy(
        title="Family Platinum Care",
        policy_number="FPC-782350",
        policy_type="Family Insurance",
        coverage_amount=1300000,
        annual_premium=32000,
        payment_frequency="Yearly",
        claim_settlement_ratio=95.0,
        waiting_period_years=0,
        network_size=4800,
        add_ons="child_education_cover,maternity_cover",
        risk_level="medium"
    ),

    # Travel Insurance
    Policy(
        title="Travel Platinum Plan",
        policy_number="TPP-552350",
        policy_type="Travel Insurance",
        coverage_amount=400000,
        annual_premium=7000,
        payment_frequency="One Time",
        claim_settlement_ratio=98.0,
        waiting_period_years=0,
        network_size=2000,
        add_ons="lost_baggage,emergency_medical",
        risk_level="low"
    ),

    # Senior Citizen Insurance
    Policy(
        title="Senior Diamond Care",
        policy_number="SDC-998240",
        policy_type="Senior Citizen Insurance",
        coverage_amount=850000,
        annual_premium=20000,
        payment_frequency="Monthly",
        claim_settlement_ratio=91.0,
        waiting_period_years=2,
        network_size=3600,
        add_ons="home_care,annual_checkup,critical_illness_cover",
        risk_level="high"
    ),

    # Accident Insurance
    Policy(
        title="Accident Pro Guard",
        policy_number="APG-663230",
        policy_type="Accident Insurance",
        coverage_amount=550000,
        annual_premium=13000,
        payment_frequency="Yearly",
        claim_settlement_ratio=98.0,
        waiting_period_years=0,
        network_size=900,
        add_ons="hospital_cash,disability_cover,accidental_death_cover",
        risk_level="medium"
    ),

    # Retirement Insurance
    Policy(
        title="Retirement Diamond Plan",
        policy_number="RDP-441300",
        policy_type="Retirement Insurance",
        coverage_amount=1800000,
        annual_premium=45000,
        payment_frequency="Yearly",
        claim_settlement_ratio=96.0,
        waiting_period_years=0,
        network_size=4200,
        add_ons="pension_topup,health_cover,loan_facility",
        risk_level="medium"
    ),
]

db.add_all(policies)
db.commit()
db.close()

print("✅ Policies seeded successfully!")
