import sqlite3

def init_db():
    conn = sqlite3.connect('insurance.db')
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS policies') # Refresh table
    cursor.execute('''
        CREATE TABLE policies (
            id INTEGER PRIMARY KEY,
            name TEXT, company TEXT, premium INTEGER, coverage TEXT,
            type TEXT, score REAL, settlement TEXT, 
            waiting_period TEXT, room_rent TEXT, deductible TEXT
        )
    ''')
    
    # Exact data from Screenshot 71 & 72
    data = [
        (1, 'Health Shield Pro', 'SecureLife Insurance', 15000, '5,00,000', 'Health', 8.5, '95%', '30 Days', 'No Limit', '25,000'),
        (2, 'Life Protect Plus', 'Guardians Insurance', 25000, '20,00,000', 'Life', 9.0, '98%', 'N/A', 'N/A', 'N/A'),
        (3, 'Auto Guard Complete', 'DriveSecure', 12000, '3,00,000', 'Auto', 7.5, '92%', 'N/A', 'N/A', 'N/A')
    ]
    cursor.executemany('INSERT INTO policies VALUES (?,?,?,?,?,?,?,?,?,?,?)', data)
    conn.commit()
    conn.close()

init_db()