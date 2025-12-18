# app/create_tables.py
import asyncio
from src.database.database import async_engine, Base
from src import models

async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(create_tables())
    print("All tables created (or already exist).")
