import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import pandas as pd
import pitch_routers


app = FastAPI()
app.include_router(pitch_routers.router)


# cors
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# database setup
def csv_to_db():
    conn = sqlite3.connect("pitch_db.db")

    pitch_data = pd.read_csv("../padres-july-2024-pitch-data.csv")
    pitch_data.to_sql("pitches", conn, if_exists="replace", index=False)

    conn.close()


# sample root endpoint
@app.get("/")
def read_root():
    return "Hello World!"


if __name__ == "__main__":
    csv_to_db()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
