import logging
from sqlalchemy.engine import URL
from sqlalchemy import create_engine,text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT")),
    database=os.getenv("DB_NAME"),
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
def init_db():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            logger.info("Connection successful, query result: %s", result.fetchone())
            logger.info("Initializing database...")
            Base.metadata.create_all(bind=engine)
            logger.info("Database tables created!")
    except Exception as e:
        logger.error(f"Connection failed: {e}")
   