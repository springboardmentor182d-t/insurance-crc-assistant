import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/insurance_db"
>>>>>>> origin/main-group-C
# Example for your friend:
DATABASE_URL = "postgresql://postgres:Nandini%40163@localhost:5432/insurance_crc"
=======
# 👉 Change ONLY this line when needed
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://postgres:Nandini%40163@localhost:5432/insurance_crc")
=======
#DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/insurance_db"
>>>>>>> origin/main-group-C
# Example for your friend:
DATABASE_URL = "postgresql://postgres:Nandini%40163@localhost:5432/insurance_crc"

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
