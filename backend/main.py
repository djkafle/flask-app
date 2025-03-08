from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import transactions
from app.db_config.db import init_db

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://mysql-finance:3306"],  # Allow React to access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()

app.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])

@app.get("/")
def home():
    return {"message": "Personal Finance Tracker API"}
