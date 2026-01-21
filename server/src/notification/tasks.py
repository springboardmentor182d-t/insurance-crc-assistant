# server/src/notifications/tasks.py

from celery import Celery
from .email import send_email

celery_app = Celery(
    "notifications",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery_app.task
def send_notification_email(to_email: str, subject: str, body: str):
    send_email(to_email, subject, body)

