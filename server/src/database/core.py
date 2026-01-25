import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# register models
from src.users.models import User
from src.policies_recommendations_profile_preferences.models.premium_analysis import PremiumAnalysis
from src.policies_recommendations_profile_preferences.models.recommendation import Recommendation
