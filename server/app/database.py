from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://kartheek_dashboard_user:kartheek777@127.0.0.1:5432/db_insurance"

# Engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True, echo=True)

# Session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Shared Base class for all models
Base = declarative_base()

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()