import fs from 'fs';
import path from 'path';
import express from 'express';

const app = express();

app.use(express.json());

const USERS_FILE = path.join(import.meta.dirname, 'users.json');

const loadUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    return data;
  } catch {
    console.error('Cannot load users data');
    return [];
  }
};

const saveUsers = (data) => {
  fs.writeFile(USERS_FILE, JSON.stringify(data), (err) => {
    console.error('Cannot write the file! ', err);
  });
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
  saveUsers(users);
  res.status(201).json({
    status: 'success',
    message: 'User has been created!',
    user: newUser,
  });
});

app.patch('/api/v1/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const filterUsers = users.filter((u) => u.id !== userId);
  const newUsers = [...filterUsers, req.body];
  saveUsers(newUsers);
  res.status(200).json({
    status: 'success',
    message: 'User has been updated',
    data: req.body,
  });
});

app.delete('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userToDeletedArr = users.filter((u) => u.id === userId);
  const userToDeleted = userToDeletedArr[0];
  const newUsers = users.filter((u) => u.id !== userId);
  saveUsers(newUsers);
  res.status(200).json({
    status: 'success',
    message: `user ${userToDeleted.name} with the ID ${userToDeleted.id} has been deleted!`,
  });
});

export default app;
