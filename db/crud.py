from sqlalchemy.orm import Session

from db import entities
from api import schemas
from core.security import get_password_hash


def get_user(db: Session, user_id: int):
    return db.query(entities.User).filter(entities.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(entities.User).filter(entities.User.email == email).first()


def get_user_by_login(db: Session, login: str):
    return db.query(entities.User).filter(entities.User.login == login).first()


def get_task_by_attribute(db: Session, **kwargs):
    return db.query(entities.Task).filter_by(**kwargs).all()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(entities.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # Создать пользователя
    hashed_password = get_password_hash(user.password)
    del user.password

    db_user = entities.User(**user.model_dump(), hashed_password=hashed_password)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_users_tasks(db: Session, skip: int = 0, limit: int = 100, user_id: int = None):
    if user_id is not None:
        return (
            db.query(entities.TaskAssignment)
            .filter_by(user_id=user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    # Получить задачи
    return db.query(entities.Task).offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate):
    # Создать задачу
    db_item = entities.Task(**task.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
