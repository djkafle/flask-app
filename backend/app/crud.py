from sqlalchemy.orm import Session
from app.models import Transaction
from app.schemas import TransactionCreate

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
