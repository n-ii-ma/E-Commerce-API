const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${
  process.env.DB_USER
}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${
  process.env.DB_PORT
}/${process.env.DB_DATABASE}`;

// Create new pool
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Pool error handling
pool.on("error", (err, client) => {
  console.error("Error:", err);
});

module.exports = pool;
