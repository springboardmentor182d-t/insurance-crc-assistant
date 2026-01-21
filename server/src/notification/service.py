from sqlalchemy.ext.asyncio import AsyncSession
from src.notifications.models import Notification

async def create_notification_async(
    db: AsyncSession,
    user_id: int,
    title: str,
    message: str,
    type_: str
):
    notif = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=type_
    )
    db.add(notif)
    await db.commit()
    await db.refresh(notif)
    return notif

