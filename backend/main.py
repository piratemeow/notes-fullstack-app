from fastapi import FastAPI,HTTPException,Depends,status
from  pydantic import BaseModel
from typing import Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=['*']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session,Depends(get_db)]


class notes(BaseModel):
    title:str
    description:str

@app.get("/message")
def get_message(db:db_dependency):

    res = db.query(models.Sticks).all()

    if res is None:
        raise HTTPException
    return res
    

@app.post("/notes")

async def post_note(note:notes, db:db_dependency):
    db_record = models.Sticks(**note.dict())
    db.add(db_record)
    db.commit()
    return {"response":"successfully done"}

