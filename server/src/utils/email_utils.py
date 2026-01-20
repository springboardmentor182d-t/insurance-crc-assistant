import os
import smtplib
from email.message import EmailMessage

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT_RAW = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
EMAIL_FROM = os.getenv("EMAIL_FROM")

try:
    SMTP_PORT = int(SMTP_PORT_RAW) if SMTP_PORT_RAW else None
except ValueError:
    SMTP_PORT = None

# ---------------- Email sending function ----------------
def send_otp_email(to_email: str, otp: str):
    # Check if email is properly configured
    if not all([SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM]):
        print("⚠️ Email not configured. Skipping send.")
        return

    msg = EmailMessage()
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email
    msg["Subject"] = "Your InsureHub OTP"

    msg.set_content(f"""
Your One-Time Password (OTP) is:

{otp}

This OTP is valid for 5 minutes.
Do not share it with anyone.

— InsureHub Team
""")

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
        print(f"✅ OTP email sent to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send email to {to_email}: {e}")

