import asyncio
from src.database.database import engine, Base
from src import models  # 🔥 THIS LINE IS REQUIRED

async def init():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init())
