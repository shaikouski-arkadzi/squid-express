import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(express.json()); // Парсим JSON в теле запросов

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", time: new Date() });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Squid Game API running on http://localhost:${PORT}`);
  console.log(`Database UI: http://localhost:8080`);
});
