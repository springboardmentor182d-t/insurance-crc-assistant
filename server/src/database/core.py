import os
from dotenv import load_dotenv
from psycopg2 import pool
from psycopg2.extras import RealDictCursor


load_dotenv()


DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 5432))
DB_NAME = os.getenv("DB_NAME", "insurance_db")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_MIN_CONN = int(os.getenv("DB_MIN_CONN", 1))
DB_MAX_CONN = int(os.getenv("DB_MAX_CONN", 10))


try:
    db_pool = pool.SimpleConnectionPool(
        minconn=DB_MIN_CONN,
        maxconn=DB_MAX_CONN,
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    if db_pool:
        print("Connection pool created successfully")
except Exception as e:
    print("Error creating connection pool:", e)
    raise


def get_db():
    
    conn = db_pool.getconn()
    try:
        
        yield conn.cursor(cursor_factory=RealDictCursor)
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
         
        db_pool.putconn(conn)
