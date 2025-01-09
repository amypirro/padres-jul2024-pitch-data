import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
import sqlite3
import pandas as pd
from pydantic import BaseModel
from typing import Annotated, List
from sqlalchemy.orm import Session
from database import get_db
# from models import Pitch #pydantic
from db_models import Pitch


app = FastAPI()


# pydantic models
class Fruit(BaseModel):
    name: str


class Fruits(BaseModel):
    fruits: List[Fruit]


# cors
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# database
apple = Fruit(name="apple")
pear = Fruit(name="pear")
banana = Fruit(name="banana")
memory_db = {"fruits": [apple, pear, banana]}


def csv_to_db():
    conn = sqlite3.connect("pitch_db.db")

    pitch_data = pd.read_csv("../padres-july-2024-pitch-data.csv")
    pitch_data.to_sql("pitches", conn, if_exists="replace", index=False)

    conn.close()


# api endpoints
@app.get("/")
def read_root():
    return "Hello World......"


@app.get("/fruits", response_model=Fruits)
def get_fruilts():
    return Fruits(fruits=memory_db["fruits"])


@app.get("/test")
def test(db: Session = Depends(get_db)):
    pitches = db.query(Pitch).limit(10).all()
    return pitches


if __name__ == "__main__":
    csv_to_db()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
