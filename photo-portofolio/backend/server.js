const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// Подключаемся к базе (файл создастся автоматически)
const db = new Database('messages.db');

// Создаём таблицу если её нет
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
  res.send('Сервер работает!');
});

// Маршрут для формы — теперь сохраняем в БД
app.post('/contact', function(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  // Записываем в базу данных
  const stmt = db.prepare(
    'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
  );
  stmt.run(name, email, message);

  console.log('Сообщение сохранено в БД от:', name);
  res.status(200).json({ success: true, message: 'Сообщение получено!' });
});

// Новый маршрут — посмотреть все сообщения
app.get('/messages', function(req, res) {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

app.listen(PORT, function() {
  console.log('Сервер запущен на http://localhost:' + PORT);
});