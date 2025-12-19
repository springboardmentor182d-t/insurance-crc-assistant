import sqlite3
import os

# This identifies where the database file will be stored
DB_PATH = os.path.join(os.path.dirname(__file__), "insurance.db")

def get_db_connection():
    """Connects to the SQLite database."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # This allows accessing columns by name
    return conn

def init_db():
    """Creates the table and inserts professional policy data."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Create the Policies Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS policies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            provider TEXT NOT NULL,
            type TEXT NOT NULL,
            premium REAL NOT NULL,
            coverage TEXT NOT NULL,
            description TEXT
        )
    ''')

    # 2. Clear existing data to avoid duplicates during testing
    cursor.execute('DELETE FROM policies')

    # 3. Professional Insurance Data
    policies = [
        ('Gold Shield Health', 'Secure Life', 'Health', 150.00, 'Comprehensive', 'Covers hospitalization, surgery, and outpatient care.'),
        ('Silver Lite Health', 'Secure Life', 'Health', 85.00, 'Basic', 'Essential coverage for emergencies and routine checkups.'),
        ('Safe Drive Auto', 'Road Guard', 'Auto', 120.00, 'Full Coverage', 'Protection against accidents, theft, and natural disasters.'),
        ('Simple Transit', 'Road Guard', 'Auto', 45.00, 'Third Party', 'Basic liability coverage for budget-conscious drivers.'),
        ('Evergreen Life', 'Future Trust', 'Life', 200.00, 'Whole Life', 'Permanent life insurance with a cash value component.'),
        ('Term Guard 20', 'Future Trust', 'Life', 60.00, 'Term', 'Affordable protection for a fixed 20-year period.'),
        ('Home Haven', 'Urban Protect', 'Property', 300.00, 'Premium', 'Total protection for structure and internal belongings.'),
        ('Travel Safe Pro', 'Globetrotter', 'Travel', 25.00, 'Global', 'Covers medical emergencies and trip cancellations worldwide.'),
        ('SmallBiz Protect', 'Urban Protect', 'Business', 500.00, 'Standard', 'Liability and property coverage for small businesses.')
    ]

    cursor.executemany('''
        INSERT INTO policies (name, provider, type, premium, coverage, description)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', policies)

    conn.commit()
    conn.close()
    print(f"Database initialized successfully at: {DB_PATH}")

if __name__ == "__main__":
    init_db()