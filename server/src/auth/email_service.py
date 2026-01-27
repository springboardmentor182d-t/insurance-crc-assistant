src/auth/email_service.py

def send_otp_email(to_email: str, otp: str):
    """
    Email sending is disabled because Render blocks SMTP
    and no email API is configured yet.

    OTP will be printed in logs for testing.
    """
    print(f"[OTP DEBUG] Email: {to_email} | OTP: {otp}")


import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")   # your email
SMTP_PASS = os.getenv("SMTP_PASS")   # app password

import requests

def send_otp_email(to_email: str, otp: str):
    requests.post(
        "https://api.sendgrid.com/v3/mail/send",
        headers={
            "Authorization": f"Bearer {SENDGRID_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "personalizations": [{"to": [{"email": to_email}]}],
            "from": {"email": "no-reply@yourdomain.com"},
            "subject": "Your OTP Code",
            "content": [{"type": "text/plain", "value": f"Your OTP is {otp}"}],
        },
    )

# def send_otp_email(to_email: str, otp: str):
#     subject = "Your OTP Verification Code"
#     body = f"""
# Hello,

# Your OTP is: {otp}

# This OTP is valid for 10 minutes.
# If you did not request this, please ignore this email.

# Thanks,
# Insurance CRC Team
# """

    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
