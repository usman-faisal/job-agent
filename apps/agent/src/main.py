from contextlib import asynccontextmanager

from fastapi import FastAPI
from src.core.db.database import db
from .api import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()

app = FastAPI(lifespan=lifespan)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}