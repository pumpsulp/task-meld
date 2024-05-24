from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    login: str
    email: str
    first_name: str
    last_name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    role: str

    class Config:
        from_attributes = True


class TaskBase(BaseModel):
    name: str
    description: str
    end_date: datetime

    class Config:
        from_attributes = True


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int

    class Config:
        from_attributes = True


class TaskAssignmentBase(BaseModel):
    user_id: int
    task_id: int
    description: str


class TaskAssignment(TaskAssignmentBase):
    id: int

    class Config:
        from_attributes = True


class TaskAssignmentCreate(TaskAssignmentBase):
    pass
