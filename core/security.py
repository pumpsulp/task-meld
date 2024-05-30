import random
import string
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
from fastapi import HTTPException, status

# Настройки безопасности
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Настройки SMTP
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
SMTP_USERNAME = "your-email@gmail.com"
SMTP_PASSWORD = "your-email-password"

# Настройка контекста для хеширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """
    Хеширует пароль.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Проверяет соответствие пароля и его хеша.
    """
    return pwd_context.verify(plain_password, hashed_password)

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

def generate_otp() -> str:
    """
    Генерирует одноразовый пароль (OTP).
    """
    return ''.join(random.choices(string.digits, k=6))

def send_email(recipient: str, subject: str, body: str):
    """
    Отправляет email.
    """
    # Создаем MIMEText объект для email
    msg = MIMEMultipart()
    msg["From"] = SMTP_USERNAME
    msg["To"] = recipient
    msg["Subject"] = subject

    # Добавляем тело сообщения
    msg.attach(MIMEText(body, "plain"))

    # Настраиваем соединение с сервером SMTP
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, recipient, msg.as_string())
