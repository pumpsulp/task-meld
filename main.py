from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.endpoints import tasks, users, assignments, auth
from db.database import Base, engine

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/app", tags=["tasks"])
app.include_router(users.router, prefix="/app", tags=["users"])
app.include_router(assignments.router, prefix="/app", tags=["assignments"])
app.include_router(auth.router, prefix="/app", tags=["auth"])


@app.on_event("startup")
def startup_db():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "Welcome to the TaskMeld!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
