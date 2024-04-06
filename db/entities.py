import enum

from sqlalchemy import Column, ForeignKey, Integer, String, Enum, DateTime, func
from sqlalchemy.orm import relationship

from db.database import Base


class Role(enum.Enum):
    EMPLOYEE = "employee"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)

    login = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)

    first_name = Column(String)
    last_name = Column(String)

    role = Column(Enum(Role), default=Role.EMPLOYEE)
    hashed_password = Column(String)

    tasks = relationship("Task", secondary="TaskAssignment", back_populates="users")


class TaskStatus(enum.Enum):
    CREATED = "created"
    ASSIGNED = "assigned"
    COMPLETE = "complete"
    EXPIRED = "expired"


class TaskAssignment(Base):
    __tablename__ = "TaskAssignment"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    task_id = Column(Integer, ForeignKey("Task.id"))
    description = Column(String, nullable=True)


class Task(Base):
    __tablename__ = "Task"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    start_date = Column(DateTime, default=func.now())
    end_date = Column(DateTime)
    status = Column(Enum(TaskStatus), default=TaskStatus.CREATED)

    users = relationship("User", secondary="TaskAssignment", back_populates="tasks")
