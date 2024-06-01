from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import schemas
from api.endpoints.auth import get_current_active_admin, get_current_user
from db import crud
from db.database import get_db

router = APIRouter()


@router.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db),
                current_user: schemas.User = Depends(get_current_active_admin)):
    return crud.create_task(db=db, task=task)


@router.get("/tasks/", response_model=list[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db),
               current_user: schemas.User = Depends(get_current_active_admin)):
    return crud.get_tasks(db, skip=skip, limit=limit)


@router.get("/tasks/{user_id}", response_model=list[schemas.Task])
def read_user_tasks(
        user_id: int, db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_active_admin)
):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.get_tasks_by_user_id(db, user_id=user_id)


@router.get("/tasks/search_by/", response_model=list[schemas.Task])
def read_task(
        attr: Literal["id", "name", "description", "start_date", "end_date", "status"],
        val,
        db: Session = Depends(get_db),
        current_user: schemas.User = Depends(get_current_active_admin)
):
    
    return crud.get_task_by_attribute(db, **{attr: val})


@router.get("/tasks/own/", response_model=list[schemas.Task])
def read_own_tasks(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    return crud.get_tasks_by_user_id(db, user_id=current_user.id)
