// src/db.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// נשתמש רק ב-DATABASE_URL, עם תמיכה אוטומטית ב-SSL אם צריך
if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing DATABASE_URL in environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("ssl=true")
    ? { rejectUnauthorized: false }
    : false,
  max: Number(process.env.PGPOOL_MAX || 10),
});

export default pool;
