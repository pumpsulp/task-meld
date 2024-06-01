from sqlalchemy.orm import Session

from api import schemas
from core.security import get_password_hash,  verify_password
from db.entities import User, Task, TaskAssignment, Role


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_login(db: Session, login: str):
    return db.query(User).filter(User.login == login).first()


def get_task_by_attribute(db: Session, **kwargs):
    return db.query(Task).filter_by(**kwargs).all()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # Создать пользователя
    hashed_password = get_password_hash(user.password)
    del user.password
    
    # code = generate_two_factor_code()
    # expiry = datetime.utcnow() + timedelta(minutes=10)
    #
    # send_two_factor_code(code, user.email)
    
    db_user = User(**user.model_dump(),
                   hashed_password=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    # Получить задачи
    return db.query(Task).offset(skip).limit(limit).all()


def create_task(db: Session, task: schemas.TaskCreate):
    # Создать задачу
    db_item = Task(**task.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def create_assignment(db: Session, assignment: schemas.TaskAssignmentCreate):
    # Назначить задачу пользователю
    db_item = TaskAssignment(**assignment.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_assignments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TaskAssignment).offset(skip).limit(limit).all()


def get_tasks_by_user_id(db: Session, user_id: int):
    return (
        db.query(Task)
        .join(TaskAssignment, Task.id == TaskAssignment.task_id)
        .where(TaskAssignment.user_id == user_id)
        .all()
    )


def get_users_by_task_id(db: Session, task_id: int):
    return (
        db.query(User)
        .join(TaskAssignment, User.id == TaskAssignment.user_id)
        .where(TaskAssignment.task_id == task_id)
        .all()
    )


def authenticate_user(db: Session, login: str, password: str):
    user = get_user_by_login(db, login)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def set_user_role(db: Session, user_id: int, role: str):
    user = get_user(db, user_id=user_id)
    user.role = role
    db.commit()
    db.refresh(user)
    return user
