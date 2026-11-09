import smtplib
from email.message import EmailMessage
from config import settings


def send_contact_email(name: str, email: str, message: str) -> None:
    if not all([settings.SMTP_HOST, settings.SMTP_USER, settings.SMTP_PASS, settings.CONTACT_EMAIL]):
        raise RuntimeError("Email settings not configured")

    msg = EmailMessage()
    msg["Subject"] = f"Portfolio Contact: {name}"
    msg["From"] = settings.SMTP_USER
    msg["To"] = settings.CONTACT_EMAIL
    msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.send_message(msg)
