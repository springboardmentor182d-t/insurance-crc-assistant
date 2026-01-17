from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.database.config import DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()






# import os
# from dotenv import load_dotenv
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base
# <<<<<<< HEAD
# from urllib.parse import quote_plus

# load_dotenv()

# DB_HOST = os.getenv("DB_HOST", "localhost")
# DB_PORT = os.getenv("DB_PORT", "5432")
# DB_NAME = os.getenv("DB_NAME", "insurance_db")
# DB_USER = os.getenv("DB_USER", "postgres")
# DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
# DB_PASSWORD_ENCODED = quote_plus(DB_PASSWORD)
# DATABASE_URL = (
#     f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD_ENCODED}"
#     f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# )

# engine = create_engine(
#     DATABASE_URL,
#     pool_size=int(os.getenv("DB_POOL_SIZE", 10)),
#     max_overflow=int(os.getenv("DB_MAX_OVERFLOW", 5)),
#     pool_pre_ping=True,
#     echo=False
# )
# =======
# from src.database.config import DATABASE_URL

# load_dotenv()

# engine = create_engine(DATABASE_URL)
# >>>>>>> 4790594d94780cbeb720105190214d29bef46674

# SessionLocal = sessionmaker(
#     autocommit=False,
#     autoflush=False,
#     bind=engine
# )

# Base = declarative_base()


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
