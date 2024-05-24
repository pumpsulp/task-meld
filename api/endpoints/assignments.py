from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import schemas
from db import crud
from db.database import get_db

router = APIRouter()


@router.post("/assignments/", response_model=schemas.TaskAssignment)
def create_assignment(
    assignment: schemas.TaskAssignmentCreate, db: Session = Depends(get_db)
):
    db_task = crud.get_task_by_attribute(db=db, id=assignment.task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db_user = crud.get_user(db=db, user_id=assignment.user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return crud.create_assignment(db=db, assignment=assignment)


@router.get("/assignments/", response_model=list[schemas.TaskAssignment])
def read_assignments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_assignments(db, skip=skip, limit=limit)
