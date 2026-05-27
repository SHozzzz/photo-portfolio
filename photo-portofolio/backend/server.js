const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database('messages.db');

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

// Раздаём фронтенд
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/contact', function(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  const stmt = db.prepare(
    'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
  );
  stmt.run(name, email, message);

  res.status(200).json({ success: true, message: 'Сообщение получено!' });
});

app.get('/messages', function(req, res) {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

app.listen(PORT, function() {
  console.log('Сервер запущен на http://localhost:' + PORT);
});