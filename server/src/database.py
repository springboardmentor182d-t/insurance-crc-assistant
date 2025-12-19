import sqlite3
def init_db():
    conn = sqlite3.connect('insurance.db')
    cursor = conn.cursor()
    
    # Using IF NOT EXISTS so we don't accidentally wipe real user data later
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS policies (
            id INTEGER PRIMARY KEY,
            name TEXT, 
            company TEXT, 
            premium INTEGER, 
            coverage TEXT,
            type TEXT, 
            score REAL, 
            settlement TEXT, 
            waiting_period TEXT, 
            room_rent TEXT, 
            deductible TEXT
        )
    ''')
    
    data = [
        # Health Policies
        (1, 'Health Shield Pro', 'SecureLife Insurance', 15000, '5,00,000', 'Health', 8.5, '95%', '30 Days', 'No Limit', '25,000'),
        (2, 'Care Premium Plus', 'Unity Health', 18500, '10,00,000', 'Health', 9.2, '99%', '15 Days', 'Single Private', '10,000'),
        (3, 'Family Floater Gold', 'Global Assure', 22000, '15,00,000', 'Health', 8.8, '97%', '45 Days', 'No Limit', '0'),
        
        # Life Policies
        (4, 'Life Protect Plus', 'Guardians Insurance', 25000, '20,00,000', 'Life', 9.0, '98%', 'N/A', 'N/A', 'N/A'),
        (5, 'Term Master 360', 'Elite Life', 12000, '50,00,000', 'Life', 7.9, '94%', 'N/A', 'N/A', 'N/A'),
        (6, 'Legacy Secure', 'Heritage Finance', 45000, '1,00,00,000', 'Life', 9.5, '99.5%', 'N/A', 'N/A', 'N/A'),
        
        # Auto Policies
        (7, 'Auto Guard Complete', 'DriveSecure', 12000, '3,00,000', 'Auto', 7.5, '92%', 'N/A', 'N/A', 'N/A'),
        (8, 'Roadside Assist Elite', 'Swift Wheels', 8500, '2,50,000', 'Auto', 8.1, '90%', 'N/A', 'N/A', '5,000'),
        (9, 'Comprehensive 4W', 'SafeWay General', 14200, '5,00,000', 'Auto', 8.4, '96%', 'N/A', 'N/A', '2,500')
    ]


    cursor.execute('DELETE FROM policies') 
    
    # Paste the 'data' list from above here...
    
    cursor.executemany('INSERT INTO policies VALUES (?,?,?,?,?,?,?,?,?,?,?)', data)
    conn.commit()
    conn.close()
    print("Database Initialized with Professional Policy Data!")

if __name__ == "__main__":
    init_db()