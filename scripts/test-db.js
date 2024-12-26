require('dotenv').config();
const { Pool } = require('pg');

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Database config:', {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    port: 5432,
  });

  const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    console.log('Successfully connected to database');
    
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'casualties'
      );
    `);
    
    console.log('Casualties table exists:', tableExists.rows[0].exists);
    
    if (tableExists.rows[0].exists) {
      const count = await client.query('SELECT COUNT(*) FROM casualties');
      console.log('Number of records:', count.rows[0].count);
    }
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
}

testConnection(); 