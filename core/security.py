
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
from fastapi import HTTPException, status, Depends


# Настройки безопасности
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



# Настройка контекста для хеширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Создает JWT токен.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Декодирует JWT токен.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception


# def generate_two_factor_code():
#     return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
#
#
# def send_two_factor_code(email: str, code: str):
#     sender_email = SMTP_USERNAME
#     sender_password = SMTP_PASSWORD
#     receiver_email = email
#
#     message = MIMEMultipart("alternative")
#     message["Subject"] = "Your Two-Factor Authentication Code"
#     message["From"] = sender_email
#     message["To"] = receiver_email
#
#     text = f"Your two-factor authentication code is {code}"
#     part = MIMEText(text, "plain")
#     message.attach(part)
#
#     context = ssl.create_default_context()
#     with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
#         server.login(sender_email, sender_password)
#         server.sendmail(sender_email, receiver_email, message.as_string())


