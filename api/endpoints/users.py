from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import schemas
from api.schemas import RoleUpdate
from db import crud
from api.endpoints.auth import get_current_active_admin, get_current_user
from db.crud import set_user_role
from db.database import get_db

router = APIRouter()


# @router.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db),
#                 current_user: schemas.User = Depends(get_current_active_admin)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     db_user = crud.get_user_by_login(db, login=user.login)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Login already registered")
#     return crud.create_user(db=db, user=user)


@router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db),
               current_user: schemas.User = Depends(get_current_active_admin)):
    return crud.get_users(db, skip=skip, limit=limit)


@router.get("/users/tasks/{task_id}", response_model=list[schemas.User])
def read_task_users(task_id: int, db: Session = Depends(get_db),
                    current_user: schemas.User = Depends(get_current_active_admin)):
    return crud.get_users_by_task_id(db, task_id=task_id)


@router.get("/users/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user

@router.put("/users/{user_id}/role", response_model=schemas.User)
def update_user_role(user_id: int, role_update: RoleUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_active_admin)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role_update.role
    db.commit()
    db.refresh(user)
    return user


