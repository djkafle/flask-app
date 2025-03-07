from pydantic import BaseModel
from datetime import datetime

# Base schema
class TransactionBase(BaseModel):
    user_id: int  # Add user_id
    amount: float
    category: str
    description: str | None = None

# Create schema
class TransactionCreate(TransactionBase):
    pass

# Update schema
class TransactionUpdate(TransactionBase):
    pass

# Response schema
class TransactionResponse(TransactionBase):
    id: int
    created_at: datetime  # Match column name with model

    class Config:
        orm_mode = True