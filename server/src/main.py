from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POLICIES = [
    {
        "id": 1, "name": "Health Shield Pro", "company": "SecureLife", "premium": 12450, "coverage": "5,00,000",
        "hospitals": 1200, "icon": "❤️", "type": "Health", "waiting_period": "30 Days", "claim_settlement": "98%", 
        "score": 8.5, "rating": 4.8, "room_rent": "No Limit", "icu": "Covered",
        "benefits": ["Cashless treatment", "No Claim Bonus", "Free Health Checkup", "Pre-hospitalization (60 days)"], 
        "exclusions": ["Cosmetic surgery", "Self-inflicted injury"]
    },
    {
        "id": 2, "name": "Life Protect Plus", "company": "Guardian", "premium": 25000, "coverage": "1,00,00,000",
        "hospitals": 0, "icon": "🛡️", "type": "Life", "waiting_period": "90 Days", "claim_settlement": "99.2%", 
        "score": 9.2, "rating": 4.9, "room_rent": "N/A", "icu": "N/A",
        "benefits": ["Terminal Illness Cover", "Accidental Death", "Critical Illness Rider"], 
        "exclusions": ["Suicide (within 1 yr)", "Hazardous sports"]
    },
    {
        "id": 3, "name": "Auto Guard Max", "company": "DriveSecure", "premium": 8500, "coverage": "3,00,000",
        "hospitals": 850, "icon": "🚗", "type": "Auto", "waiting_period": "0 Days", "claim_settlement": "94%", 
        "score": 7.8, "rating": 4.5, "room_rent": "N/A", "icu": "N/A",
        "benefits": ["Roadside Assist", "Zero Depreciation", "Engine Protection"], 
        "exclusions": ["Drunk driving", "Racing/Speeding"]
    },
    {
        "id": 4, "name": "Travel Safe Int'l", "company": "GlobeTrot", "premium": 2100, "coverage": "50,000",
        "hospitals": 300, "icon": "✈️", "type": "Travel", "waiting_period": "0 Days", "claim_settlement": "91%", 
        "score": 8.1, "rating": 4.6, "room_rent": "Hospital Dependent", "icu": "Covered",
        "benefits": ["Baggage Loss", "Trip Delay", "Medical Emergency Support"], 
        "exclusions": ["Pre-existing illness", "Adventure sports"]
    },
    {
        "id": 5, "name": "Home Secure 360", "company": "SafeAbode", "premium": 4200, "coverage": "50,00,000",
        "hospitals": 0, "icon": "🏠", "type": "Home", "waiting_period": "15 Days", "claim_settlement": "95%", 
        "score": 8.8, "rating": 4.7, "room_rent": "N/A", "icu": "N/A",
        "benefits": ["Fire & Theft", "Jewelry Cover", "Alternative Accommodation"], 
        "exclusions": ["War/Nuclear perils", "Negligence"]
    },
    {
        "id": 6, "name": "Critical Care Lite", "company": "MediSure", "premium": 9800, "coverage": "10,00,000",
        "hospitals": 1500, "icon": "🏥", "type": "Health", "waiting_period": "60 Days", "claim_settlement": "97%", 
        "score": 8.4, "rating": 4.6, "room_rent": "₹5,000/Day", "icu": "₹10,000/Day",
        "benefits": ["Cancer Cover", "Heart Ailments", "Chemotherapy coverage"], 
        "exclusions": ["Alternative medicine", "Cosmetic treatment"]
    }
]

@app.get("/api/policies")
async def get_policies(): return POLICIES

@app.get("/api/policies/{policy_id}")
async def get_policy(policy_id: int):
    policy = next((p for p in POLICIES if p["id"] == policy_id), None)
    if policy: return policy
    raise HTTPException(status_code=404, detail="Policy not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)