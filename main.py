from fastapi import FastAPI

from api.endpoints import tasks, users, assignments
from db.database import Base, engine

app = FastAPI()


app.include_router(tasks.router, prefix="/app", tags=["Tasks"])
app.include_router(users.router, prefix="/app", tags=["Users"])
app.include_router(assignments.router, prefix="/app", tags=["Assignments"])


@app.on_event("startup")
def startup_db():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "Welcome to the TaskMeld!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
