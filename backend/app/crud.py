from sqlalchemy.orm import Session
from app.models import Transaction
from sqlalchemy import func

# Create a new transaction
def create_transaction(db: Session, transaction: TransactionCreate):
    db_transaction = Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

# Get all transactions
def get_transactions(db: Session):
    return db.query(Transaction).all()

# Get transaction by ID
def get_transaction(db: Session, transaction_id: int):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()

# Update transaction
def update_transaction(db: Session, transaction_id: int, transaction_data: TransactionUpdate):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        for key, value in transaction_data.dict(exclude_unset=True).items():
            setattr(db_transaction, key, value)
        db.commit()
        db.refresh(db_transaction)
        return db_transaction
    return None

# Delete transaction
def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
        return True
    return False

# Get total balance
def get_total_balance(db: Session):    
    total_income = db.query(func.sum(Transaction.amount)).filter(Transaction.type == 'income').scalar()
    total_expense = db.query(func.sum(Transaction.amount)).filter(Transaction.type == 'expense').scalar()
    
    # If no transactions exist, func.sum will return None
    if total_income is None:
        total_income = 0
    if total_expense is None:
        total_expense = 0
    
    total_balance = total_income - total_expense
    return total_balance

# Get total expenses
def get_total_expenses(db: Session):    
    total_expense = db.query(func.sum(Transaction.amount)).filter(Transaction.type == 'expense').scalar()
    
    # If no expenses exist, func.sum will return None
    if total_expense is None:
        total_expense = 0
    
    return total_expense

# Get recent transactions
def get_recent_transactions(db: Session):
    return db.query(Transaction).order_by(Transaction.date.desc()).limit(3).all()