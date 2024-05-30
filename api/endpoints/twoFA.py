from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.crud import get_user, authenticate_user
from db.database import get_db
from core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, generate_otp, send_email
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if user.two_factor_enabled:
        otp = generate_otp()
        user.otp = otp
        db.commit()
        db.refresh(user)
        send_email(user.email, "Your OTP Code", f"Your OTP code is {otp}")
        return {"msg": "OTP code sent to your email"}
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/verify-otp")
def verify_otp(user_id: int, otp: str, db: Session = Depends(get_db)):
    user = get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    if user.otp != otp:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid OTP code",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    user.otp = None  # Сбрасываем OTP после успешной проверки
    db.commit()
    db.refresh(user)
    return {"access_token": access_token, "token_type": "bearer"}