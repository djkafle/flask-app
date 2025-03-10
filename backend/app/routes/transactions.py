from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import app.crud as crud, app.schemas as schemas, app.db_config.db as database

router = APIRouter()

# Create transaction
@router.post("/", response_model=schemas.TransactionResponse, status_code=201)
def add_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(database.get_db)):
    return crud.create_transaction(db, transaction)

# Get all transactions
@router.get("/", response_model=list[schemas.TransactionResponse])
def list_transactions(db: Session = Depends(database.get_db)):
    return crud.get_transactions(db)

# Get transaction by ID
@router.get("/{transaction_id}", response_model=schemas.TransactionResponse)
def get_transaction(transaction_id: int, db: Session = Depends(database.get_db)):
    transaction = crud.get_transaction(db, transaction_id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

# Update transaction
@router.put("/{transaction_id}", response_model=schemas.TransactionResponse)
def update_transaction(transaction_id: int, transaction_data: schemas.TransactionUpdate, db: Session = Depends(database.get_db)):
    updated_transaction = crud.update_transaction(db, transaction_id, transaction_data)
    if not updated_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return updated_transaction

# Delete transaction
@router.delete("/{transaction_id}", status_code=204)
def remove_transaction(transaction_id: int, db: Session = Depends(database.get_db)):
    if not crud.delete_transaction(db, transaction_id):
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"message": "Transaction deleted"}

# Get Total Balance
@router.get("/transactions/total_balance")
def get_total_balance(db: Session = Depends(database.get_db)): 
    return crud.get_total_balance(db)

# Get Total Expenses
@router.get("/transactions/total_expenses")
def get_total_expenses(db: Session = Depends(database.get_db)): 
    return crud.get_total_expenses(db)

#get recent transactions
@router.get("/transactions/recent")
def get_recent_transactions(db: Session = Depends(database.get_db)):
    return crud.get_recent_transactions(db)