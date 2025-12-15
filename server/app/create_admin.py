# app/create_admin.py
import asyncio
from sqlalchemy import select
from app.database import async_session
from app.models import User, Role
from app.security import get_password_hash

ADMIN_EMAIL = "admin@insurehub.local"
ADMIN_PASSWORD = "Admin123!"


async def create_admin():
    async with async_session() as db:
        # Check if admin role exists
        result = await db.execute(select(Role).where(Role.name == "admin"))
        admin_role = result.scalar_one_or_none()

        if not admin_role:
            admin_role = Role(name="admin")
            db.add(admin_role)
            await db.commit()
            await db.refresh(admin_role)

        # Check if admin user exists
        result = await db.execute(select(User).where(User.email == ADMIN_EMAIL))
        admin_user = result.scalar_one_or_none()

        if admin_user:
            print("Admin already exists.")
            return

        admin = User(
            full_name="Admin",
            email=ADMIN_EMAIL,
            hashed_password=get_password_hash(ADMIN_PASSWORD),
            role_id=admin_role.id
        )

        db.add(admin)
        await db.commit()

        print(f"Admin created: {ADMIN_EMAIL} / {ADMIN_PASSWORD}")


if __name__ == "__main__":
    asyncio.run(create_admin())
