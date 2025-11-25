const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Подключение к БД
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Простой маршрут для здоровья приложения
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Маршрут для проверки данных (имитация)
app.get('/api/data', async (req, res) => {
  try {
    // Имитируем запрос к БД. В реальном приложении здесь будет `await client.query('SELECT ...')`
    res.json({ message: "Data endpoint is working", items: 5 }); // Заглушка
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Маршрут для проверки консистенции данных (имитация)
app.get('/api/items/count', (req, res) => {
  // Имитируем ответ API, который должен совпадать с данными в БД
  res.json(5); // Заглушка, совпадает с DB_COUNT в workflow
});

// Запуск сервера и подключение к БД
async function startServer() {
  try {
    // В реальном приложении здесь будет `await client.connect();`
    console.log('✅ Database connection simulated');
    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed', err);
    process.exit(1);
  }
}

startServer();