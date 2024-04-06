from typing import Any

from passlib.context import CryptContext

from core.config import settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password + settings.SALT, hashed_password)


def get_password_hash(password) -> Any:
    return pwd_context.hash(password + settings.SALT)
