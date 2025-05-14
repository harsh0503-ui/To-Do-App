from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlmodel import SQLModel
from app.models.todo_model import ToDo
from app.database import create_db_and_tables
from app.routes import todo_router




@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating Tables...")
    create_db_and_tables()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.include_router(todo_router.router)
