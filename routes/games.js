import express from "express";
import pool from "../db.js";

export const router = express.Router();

// POST /api/games - Добавить игру
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Game name is required" });
  }

  try {
    // Получаем максимальный order_number
    const maxOrder = await pool.query(
      "SELECT COALESCE(MAX(order_number), 0) as max FROM games"
    );
    const nextOrder = parseInt(maxOrder.rows[0].max) + 1;

    // Добавляем игру
    const result = await pool.query(
      "INSERT INTO games (name, order_number) VALUES ($1, $2) RETURNING *",
      [name, nextOrder]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/games - Получить список игр
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM games
      ORDER BY order_number
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
