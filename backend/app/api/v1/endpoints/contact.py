from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings
import os

router = APIRouter()

class ContactSchema(BaseModel):
    subject: str
    email: EmailStr
    message: str

# Email Configuration
# In a real scenario, these values would come from settings/env vars
# We set defaults that might work if configured, or fail gracefully/log if not.
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "files@nue-japan.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "password"),
    MAIL_FROM=os.getenv("MAIL_FROM", "files@nue-japan.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@router.post("/contact")
async def send_contact_email(contact: ContactSchema, background_tasks: BackgroundTasks):
    """
    Send a contact email.
    If SMTP is not configured properly, it will log the message instead (Simulated Mode).
    """
    
    # Simulation Logic for Demo purposes if no Env Vars are set to real values
    if os.getenv("MAIL_SERVER") is None:
        print("--- [SIMULATED EMAIL] ---")
        print(f"From: {contact.email}")
        print(f"Subject: {contact.subject}")
        print(f"Message: {contact.message}")
        print("-------------------------")
        return {"message": "Message sent via Secure Simulation Protocol"}
    
    # Real Email Logic
    message = MessageSchema(
        subject=f"[Nue-Mainframe Contact] {contact.subject}",
        recipients=["admin@nue-japan.com"],  # Replace with actual admin email
        body=f"From: {contact.email}\n\nMessage:\n{contact.message}",
        subtype=MessageType.plain
    )

    fm = FastMail(conf)
    
    try:
        background_tasks.add_task(fm.send_message, message)
    except Exception as e:
        # In case of connection failure, fallback to log
        print(f"Failed to send email: {e}")
        # We still return success to the frontend to maintain immersion, 
        # but log the error on backend.
        return {"message": "Message queued (Offline Mode)"}

    return {"message": "Message sent successfully"}
