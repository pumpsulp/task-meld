from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api import schemas
from api.schemas import UserCreate, User
from db.crud import create_user, get_user_by_login, get_user_by_email
from db.database import get_db
from core.security import get_password_hash

router = APIRouter()


@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли пользователь с таким логином или email
    existing_user = get_user_by_login(db, login=user.login)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Login already registered"
        )
    
    existing_email = get_user_by_email(db, email=user.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    return create_user(db, user)