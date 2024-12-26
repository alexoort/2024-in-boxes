# search for the number of deaths in the middle east using this link: https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json

import requests
import psycopg2
from psycopg2 import Error
import os
from dotenv import load_dotenv
from psycopg2.extras import execute_values

# Load environment variables from .env file
load_dotenv()

response = requests.get(
    "https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json"
)

# Database connection parameters using Neon database credentials
DB_NAME = os.getenv("PGDATABASE", "neondb")
DB_USER = os.getenv("PGUSER", "neondb_owner")
DB_PASSWORD = os.getenv("PGPASSWORD")
DB_HOST = os.getenv("PGHOST")
DB_PORT = "5432"  # Neon typically uses default PostgreSQL port

def connect_to_db():
    try:
        # Using SSL mode for Neon database
        connection = psycopg2.connect(
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            sslmode='require'  # Required for Neon database
        )
        return connection
    except Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

def create_table(connection):
    try:
        cursor = connection.cursor()
        
        # Create table if it doesn't exist
        create_table_query = """
        CREATE TABLE IF NOT EXISTS casualties (
            name VARCHAR(255),              -- original arabic name
            en_name VARCHAR(255),           -- english name translation
            id VARCHAR(255),                -- unique string identifier
            dob DATE,                       -- date of birth
            sex CHAR(1),                    -- 'm' for male or 'f' for female
            age INTEGER,                    -- age as a number
            source CHAR(1),                 -- 'h' for Health Ministry, 'c' for Public Submission, 'j' for judicial
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT valid_sex CHECK (sex IN ('m', 'f')),
            CONSTRAINT valid_source CHECK (source IN ('h', 'c', 'j'))
        );
        """
        cursor.execute(create_table_query)
        connection.commit()
        
    except Error as e:
        print(f"Error creating table: {e}")

def store_casualties_bulk(connection, records):
    try:
        cursor = connection.cursor()
        
        # Prepare data for bulk insert
        values = [
            (
                record.get('name', ''),
                record.get('en_name', ''),
                record.get('id', ''),
                None if record.get('dob', '') == '' else record.get('dob'),
                record.get('sex', ''),
                record.get('age'),
                record.get('source', '')
            )
            for record in records
        ]
        
        # Bulk insert using ON CONFLICT DO NOTHING to skip duplicates
        insert_query = """
        INSERT INTO casualties (name, en_name, id, dob, sex, age, source)
        VALUES %s
        ON CONFLICT (id) DO NOTHING
        """
        execute_values(cursor, insert_query, values)
        connection.commit()
        
        # Get count of actually inserted records
        cursor.execute("SELECT count(*) FROM casualties")
        total_count = cursor.fetchone()[0]
        print(f"Successfully inserted new records. Total records in database: {total_count}")
        
    except Error as e:
        print(f"Error inserting data: {e}")
        return None

def main():
    connection = connect_to_db()
    if not connection:
        return
    
    create_table(connection)
    
    # Fetch and process the data
    response = requests.get("https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json")
    data = response.json()
    
    # Store all records at once
    store_casualties_bulk(connection, data)
    
    connection.close()

if __name__ == "__main__":
    main()

