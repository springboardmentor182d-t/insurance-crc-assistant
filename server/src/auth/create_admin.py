# src/auth/create_admin.py
import asyncio
from sqlalchemy import select
from src.database.database import async_session_maker
from src.users.models import User, Role
from src.auth.security import get_password_hash

ADMIN_EMAIL = "admin@insurehub.local"
ADMIN_PASSWORD = "Admin123!"  # change after first login


async def create_admin():
    async with async_session_maker() as db:

        # 1️⃣ Ensure ADMIN role exists
        result = await db.execute(
            select(Role).where(Role.name == "ADMIN")
        )
        admin_role = result.scalar_one_or_none()

        if not admin_role:
            admin_role = Role(name="ADMIN")
            db.add(admin_role)
            await db.commit()
            await db.refresh(admin_role)

        # 2️⃣ Check if admin user already exists
        result = await db.execute(
            select(User).where(User.email == ADMIN_EMAIL)
        )
        admin_user = result.scalar_one_or_none()

        if admin_user:
            print("✅ Admin already exists.")
            return

        # 3️⃣ Create admin user
        admin = User(
            full_name="Admin",
            email=ADMIN_EMAIL,
            hashed_password=get_password_hash(ADMIN_PASSWORD),
            is_active=True,
            role_id=admin_role.id
        )

        db.add(admin)
        await db.commit()

        print("✅ Admin user created successfully")
        print(f"Email: {ADMIN_EMAIL}")
        print("Password: Admin123! (change after login)")


if __name__ == "__main__":
    asyncio.run(create_admin())
