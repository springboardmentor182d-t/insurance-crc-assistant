from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from src.entities.claim import Claim
from src.notifications.service import create_notification_async
from src.notifications.email_tasks import send_notification_email_async


# -------------------------------
# Existing functions (unchanged)
# -------------------------------

async def get_all_claims(db: AsyncSession):
    stmt = select(Claim).order_by(Claim.filed_date.desc())
    result = await db.execute(stmt)
    return result.scalars().all()


async def get_claim_by_number(db: AsyncSession, claim_number: str):
    stmt = select(Claim).where(Claim.claim_number == claim_number)
    result = await db.execute(stmt)
    return result.scalars().first()


# -------------------------------
# NEW: Create / Submit Claim
# -------------------------------

async def create_claim(db: AsyncSession, claim_data: dict, user):
    """
    Called when a user files a new claim.
    """

    claim = Claim(**claim_data)
    db.add(claim)
    await db.commit()
    await db.refresh(claim)

    # 🔔 In-app notification
    await create_notification_async(
        db=db,
        user_id=user.id,
        title="Claim Submitted",
        message=f"Your claim {claim.claim_number} has been submitted successfully.",
        type_="claim"
    )

    # 📧 Email notification (async background)
    await send_notification_email_async(
        to_email=user.email,
        subject="Claim Submitted",
        body=(
            f"Dear {user.name},\n\n"
            f"Your claim {claim.claim_number} has been submitted and is under review.\n\n"
            "Thank you,\nInsurance Team"
        )
    )

    return claim


# -------------------------------
# NEW: Update Claim Status
# -------------------------------

async def update_claim_status(
    db: AsyncSession,
    claim_id: int,
    new_status: str,
    user
):
    """
    Called when admin/system updates claim status.
    """

    stmt = (
        update(Claim)
        .where(Claim.id == claim_id)
        .values(status=new_status)
        .returning(Claim)
    )

    result = await db.execute(stmt)
    await db.commit()

    updated_claim = result.fetchone()
    if not updated_claim:
        return None

    claim = updated_claim[0]

    # 🔔 In-app notification
    await create_notification_async(
        db=db,
        user_id=user.id,
        title="Claim Status Updated",
        message=f"Your claim {claim.claim_number} status is now '{new_status}'.",
        type_="claim"
    )

    # 📧 Email notification
    await send_notification_email_async(
        to_email=user.email,
        subject="Claim Status अपडेट",
        body=(
            f"Dear {user.name},\n\n"
            f"Your claim {claim.claim_number} status has been updated to: {new_status}.\n\n"
            "Please log in to track further updates.\n\n"
            "Regards,\nInsurance Team"
        )
    )

    return claim
