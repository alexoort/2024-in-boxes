import { Pool } from 'pg';

// Log database configuration (without sensitive data)
console.log('Database config:', {
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  port: 5432,
});

if (!process.env.POSTGRES_HOST || !process.env.POSTGRES_DATABASE || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD) {
  throw new Error('Missing database configuration. Please check your environment variables.');
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function query(text: string, params?: any[]) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    const error = err as Error;
    console.error('Query error:', {
      message: error.message,
      text,
      params
    });
    throw new Error(`Database query failed: ${error.message}`);
  } finally {
    if (client) client.release();
  }
}

export async function getCasualties() {
  try {
    // First test if table exists
    const tableExists = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'casualties'
      );
    `);
    
    if (!tableExists.rows[0].exists) {
      throw new Error('Casualties table does not exist');
    }

    const result = await query(`
      SELECT 
        name, en_name, id, dob, sex, age, source
      FROM casualties 
      ORDER BY created_at DESC
      LIMIT 1000
    `);
    console.log(`Retrieved ${result.rows.length} casualties`);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    console.error('Database error:', error.message);
    throw new Error(`Failed to fetch casualties data: ${error.message}`);
  }
} 