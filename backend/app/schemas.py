from pydantic import BaseModel
from datetime import datetime

# Base schema
class TransactionBase(BaseModel):
    type: str  # 'income' or 'expense'
    category: str
    amount: float
    description: str | None = None
    date: datetime

# Create schema
class TransactionCreate(TransactionBase):
    pass

# Update schema
class TransactionUpdate(TransactionBase):
    pass

# Response schema
class TransactionResponse(TransactionBase):
    id: int
    date: datetime

    class Config:
        orm_mode = True
