import enum

import pyotp
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, DateTime, func
from sqlalchemy.orm import relationship

from db import Base


# Основные сущности: пользователь, проект, задача


# У пользователя есть 3 роли: Admin, Manager, Employee
# Глобальная роль каждого пользователя по умолчанию default
# Пользователь создаёт проект, получая ProjectRole = Manager
# Пользователь с ролью Manager создаёт задачи внутри проекта и добавляет туда участников
# Добавленные в проект участники имеют ProjectRole Employee
# В проекте
# Пользователь может состоять в разных проектах (или не состоять)
#
# В проекте у пользователя могут быть разные задачи
# У проекта должен быть создатель
# В проекте находится один или более человек
# У каждой задачи должен быть человек, назначивший её кому-то
# Задачу исполняет один или более человек
# Исполняющий задачу либо выполняет её, либо нет
#


class Role(enum.Enum):
    DEFAULT = "default"
    ADMIN = "admin"


class ProjectRole(enum.Enum):
    EMPLOYEE = "employee"
    MANAGER = "manager"


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)

    login = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)

    first_name = Column(String)
    last_name = Column(String)

    hashed_password = Column(String)
    otp_secret = Column(String, default=pyotp.random_base32())

    role = Column(Enum(Role), default=Role.DEFAULT)

    user_projects = relationship(
        "Project", secondary="ProjectUser", back_populates="project_users"
    )


class Project(Base):
    __tablename__ = "Project"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    description = Column(String)

    project_users = relationship(
        "User", secondary="ProjectUser", back_populates="user_projects"
    )


class ProjectUser(Base):
    __tablename__ = "ProjectUser"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user_role = Column(Enum(Role), default=ProjectRole.EMPLOYEE)
    project_id = Column(Integer, ForeignKey("projects.id"))

    tasks = relationship(
        "Task", secondary="ProjectUserTask", back_populates="assignment_users"
    )


class ProjectUserTask(Base):
    __tablename__ = "ProjectUserTask"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("ProjectUser.id"))
    project_id = Column(Integer, ForeignKey("Project.id"))
    task_id = Column(Integer, ForeignKey("Task.id"))


class TaskStatus(enum.Enum):
    ASSIGNED = "assigned"
    COMPLETE = "complete"
    EXPIRED = "expired"


class Task(Base):
    __tablename__ = "Task"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    start_date = Column(DateTime, default=func.now())
    end_date = Column(DateTime)
    status = Column(Enum(TaskStatus), default=TaskStatus.ASSIGNED)

    assignment_users = relationship(
        "ProjectUserTasks", secondary="ProjectUserTask", back_populates="tasks"
    )
