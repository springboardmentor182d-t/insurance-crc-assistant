from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

Base = declarative_base()


engine = None
AsyncSessionLocal = None

if DATABASE_URL:
    from sqlalchemy.ext.asyncio import create_async_engine

    engine = create_async_engine(
        DATABASE_URL,
        echo=True,   # debugging
    )

    AsyncSessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

async def get_db():
    # If DB not configured, yield None instead of crashing
    if AsyncSessionLocal is None:
        yield None
        return

    async with AsyncSessionLocal() as session:
        yield session

async_session_maker = AsyncSessionLocal
