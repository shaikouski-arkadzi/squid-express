import pool from "./db.js";

export async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        order_number INTEGER NOT NULL,
        is_active BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(
      `CREATE INDEX IF NOT EXISTS idx_games_order ON games(order_number)`
    );

    console.log("Database initialized");
  } catch (err) {
    console.error("Database init error:", err);
    throw err;
  }
}
