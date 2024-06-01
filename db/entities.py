import enum

from sqlalchemy import Column, ForeignKey, Integer, String, Enum, DateTime, func, Boolean
from sqlalchemy.orm import relationship

from db.database import Base


class Role:
    EMPLOYEE = "employee"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)
    
    username = Column(String, nullable=False)

    login = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    role = Column(String, default=Role.EMPLOYEE, nullable=False)
    hashed_password = Column(String, nullable=False)
    
    # two_factor_code = Column(String, nullable=True)
    # two_factor_expiry = Column(DateTime, nullable=True)
    
    tasks = relationship("Task", secondary="TaskAssignment", back_populates="users")


class TaskStatus(enum.Enum):
    CREATED = "created"
    ASSIGNED = "assigned"
    COMPLETE = "complete"
    EXPIRED = "expired"


class TaskAssignment(Base):
    __tablename__ = "TaskAssignment"

    id = Column(Integer, primary_key=True)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("User.id"))
    task_id = Column(Integer, ForeignKey("Task.id"))


class Task(Base):
    __tablename__ = "Task"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    start_date = Column(DateTime, default=func.now())
    end_date = Column(DateTime)
    status = Column(Enum(TaskStatus), default=TaskStatus.CREATED)

    users = relationship("User", secondary="TaskAssignment", back_populates="tasks")
