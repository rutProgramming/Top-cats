import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, 
      max: Number(process.env.PGPOOL_MAX || 10),
    })
  : new Pool({
      host: process.env.PGHOST || "localhost",
      port: Number(process.env.PGPORT || 5432),
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD || "postgres",
      database: process.env.PGDATABASE || "leaderboard",
      ssl:
        process.env.PGSSL === "disable"
          ? false
          : { rejectUnauthorized: false },
      max: Number(process.env.PGPOOL_MAX || 10),
    });

export default pool;
