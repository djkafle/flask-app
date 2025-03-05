from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db_config.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(10), nullable=False)  # 'income' or 'expense'
    category = Column(String(50), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String(255), nullable=True)
    date = Column(DateTime, default=func.now())
