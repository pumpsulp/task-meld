import enum
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class Role:
    EMPLOYEE = "employee"
    ADMIN = "admin"


class User(BaseModel):
    id: int
    username: str
    email: str
    role: str


class UserCreate(BaseModel):
    username: str
    login: str
    password: str
    email: str


# class UserBase(BaseModel):
#     login: str
#     email: str
#     first_name: str
#     last_name: str
#     two_factor_code: Optional[str] = None
#     two_factor_expiry: Optional[datetime] = None
#
#
# class UserCreate(BaseModel):
#     password: str
#
# class User(UserBase):
#     id: int
#     role: Optional[Role] = Role.EMPLOYEE
#
#     class Config:
#         from_attributes = True


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



class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None


class UserLogin(BaseModel):
    email: str
    password: str


class RoleUpdate(BaseModel):
    role: str