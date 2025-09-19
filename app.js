const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

const loadUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    return data;
  } catch {
    console.error('Cannot load users data');
    return [];
  }
};

const users = loadUsers();

app.get('/api/v1/users', (req, res) => {
  res.status(200).json({
    status: 'success',
    users,
  });
});

app.post('/api/v1/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  fs.writeFile(USERS_FILE, JSON.stringify(users), (err) => {
    console.error('Cannot write the file! ', err);
  });
  res.status(201).json({
    status: 'success',
    message: 'User has been created!',
    user: newUser,
  });
});

module.exports = app;
