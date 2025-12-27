import sqlite3
import os

def init_db():
    # Ensure the directory exists
    os.makedirs('src', exist_ok=True)
    
    conn = sqlite3.connect('src/insurance.db')
    cursor = conn.cursor()
    
    # Drop existing table to ensure a clean start
    cursor.execute("DROP TABLE IF EXISTS policies")
    
    # Create the table with your specific Figma fields
    cursor.execute('''
        CREATE TABLE policies (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            provider TEXT NOT NULL,
            premium INTEGER,
            coverage INTEGER,
            type TEXT,
            score REAL,
            waiting_period TEXT,
            room_rent TEXT,
            settlement_ratio TEXT
        )
    ''')
    
    # Your Figma data points
    policies = [
        (1, 'Health Shield Pro', 'SecureLife Insurance', 15000, 500000, 'Health', 8.5, '30 Days', 'No Limit', '95%'),
        (2, 'Life Protect Plus', 'Guardian Insurance', 25000, 2000000, 'Life', 9.0, '60 Days', '1% of SI', '90%'),
        (3, 'Auto Guard Complete', 'DriveSecure', 12000, 300000, 'Auto', 7.8, '0 Days', 'N/A', '92%'),
        (4, 'Travel Safe International', 'Wanderlust Insurance', 5000, 100000, 'Travel', 8.2, '0 Days', 'N/A', '98%'),
        (5, 'Home Protection Elite', 'SafeNest Insurance', 18000, 1000000, 'Home', 8.7, '15 Days', 'N/A', '94%'),
        (6, 'Health Care Essential', 'MediGuard', 10000, 300000, 'Health', 7.5, '90 Days', '2000/day', '88%')
    ]
    
    cursor.executemany('INSERT INTO policies VALUES (?,?,?,?,?,?,?,?,?,?)', policies)
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully with Figma data!")

if __name__ == "__main__":
    init_db()