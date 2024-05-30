from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from core.security import SECRET_KEY, ALGORITHM
from db.crud import get_user
from db.entities import User, Role
from api.schemas import TokenData
from db.database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    user = get_user(db, user_id=token_data.user_id)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.role != Role.EMPLOYEE:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return current_user


def get_current_active_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != Role.ADMIN:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return current_user
