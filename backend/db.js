import pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}
