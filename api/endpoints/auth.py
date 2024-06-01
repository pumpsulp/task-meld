import enum
import logging
from datetime import timedelta, datetime

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from api.schemas import Token, UserLogin, UserCreate, User, TokenData, Role
from db.crud import get_user, authenticate_user, get_user_by_email, create_user
from db.database import get_db
from core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, verify_password, ALGORITHM, SECRET_KEY
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer, OAuth2

logging.basicConfig(level=logging.INFO)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="app/token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    logging.info(f"Received token: {token}")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email: str = payload.get("sub")
        if user_email is None:
            raise credentials_exception
        token_data = TokenData(email=user_email)
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_admin(current_user: User = Depends(get_current_user)):
    logging.info(f"Checking role for user: {current_user.email}")
    if current_user.role != Role.ADMIN:
        logging.warning(f"User {current_user.username} with role {current_user.role} does not have admin permissions")
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return current_user


@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email})
    logging.info(f"Generated token for user {user.email}: {access_token}")
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли пользователь с таким логином или email
    existing_user = get_user_by_email(db, email=user.email)
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    return create_user(db, user)


# Эндпоинт для проверки двухфакторного кода
# @router.post("/verify-2fa/", response_model=Token)
# def verify_two_factor(email: str, code: str, db: Session = Depends(get_db)):
#     user = get_user_by_email(db, email=email)
#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid email")
#
#     if user.two_factor_code != code or user.two_factor_expiry < datetime.utcnow():
#         raise HTTPException(status_code=400, detail="Invalid or expired code")
#
#     # Очистка кода после успешной проверки
#     user.two_factor_code = None
#     user.two_factor_expiry = None
#     db.commit()
#     db.refresh(user)
#
#     # Возврат JWT токена после успешной проверки
#     access_token = create_access_token(data={"sub": user.username})
#     return {"access_token": access_token, "token_type": "bearer"}