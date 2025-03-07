from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db_config.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # Add user_id
    amount = Column(Float, nullable=False)
    category = Column(String(100), nullable=False)  # Match length with init.sql
    description = Column(String(255), nullable=True)  # Match length with init.sql
    created_at = Column(DateTime, default=func.now())  # Match column name with init.sql