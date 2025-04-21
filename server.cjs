const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Настройка CORS (один раз)
app.use(cors({
  origin: 'http://localhost:5173', // или ваш клиентский URL
  credentials: true
}));

app.use(bodyParser.json());

// Mock database
let users = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123' }
];

let feedbacks = [
  { id: 1, text: 'Первый отзыв', userId: 1 },
  { id: 2, text: 'Второй отзыв', userId: 1 }
];

// Auth endpoints
app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    console.log('User found:', user);
    res.json({ 
      success: true, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } else {
    console.log('Auth failed for:', email);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// Registration endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const id = users.length + 1;
  const newUser = { id, username, email, password };
  users.push(newUser);
  res.json({ success: true, user: { id, username, email } });
});

// User profile endpoints
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], username, email };
    res.json({ success: true, user: users[userIndex] });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Feedback endpoints
app.get('/api/feedback', (req, res) => {
  res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
  const { text, userId } = req.body;
  const id = feedbacks.length + 1;
  const newFeedback = { id, text, userId };
  feedbacks.push(newFeedback);
  res.json({ success: true, feedback: newFeedback });
});

app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  feedbacks = feedbacks.filter(f => f.id !== parseInt(id));
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port "${PORT});
});