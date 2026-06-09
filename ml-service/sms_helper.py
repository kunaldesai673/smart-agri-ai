import os
from twilio.rest import Client

# 🔑 Replace these placeholders with your real values from the Twilio Console
TWILIO_ACCOUNT_SID = 'AC60bb40f3fc74e5f4cd3c6eacf24e247a'
TWILIO_AUTH_TOKEN = 'f373e0b3892b8ceb0e74919f1f4895f6'
TWILIO_PHONE_NUMBER = '+17692071104' # Must include country code, e.g., '+1234567890'

def send_agri_sms(to_number, message_body):
    """
    Sends an automated cellular notification token directly to a mobile client handset.
    """
    try:
        # Prevent runtime crashes if placeholders aren't configured yet
        if 'YOUR' in TWILIO_ACCOUNT_SID or 'YOUR' in TWILIO_AUTH_TOKEN:
            print("⚠️ SMS skipped: Twilio credentials not fully set up yet.")
            return False
            
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        message = client.messages.create(
            from_=TWILIO_PHONE_NUMBER,
            body=message_body,
            to=to_number # The destination mobile format, e.g., '+91XXXXXXXXXX'
        )
        print(f"📱 Automated Alert Sent Successfully! Message SID: {message.sid}")
        return True
    except Exception as e:
        print(f"❌ SMS notification dropped: {str(e)}")
        return False