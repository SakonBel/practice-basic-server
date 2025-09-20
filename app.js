import fs from 'fs';
import path from 'path';
import express from 'express';

const app = express();
const router = express.Router();

app.use(express.json());
app.use('/api/v1/users', router);

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

const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    users,
  });
};

const postUsers = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  saveUsers(users);
  res.status(201).json({
    status: 'success',
    message: 'User has been created!',
    user: newUser,
  });
};

const updateUsers = (req, res) => {
  const userId = Number(req.params.id);
  const filterUsers = users.filter((u) => u.id !== userId);
  const newUsers = [...filterUsers, req.body];
  saveUsers(newUsers);
  res.status(200).json({
    status: 'success',
    message: 'User has been updated',
    data: req.body,
  });
};

const deleteUsers = (req, res) => {
  const userId = parseInt(req.params.id);
  const userToDeletedArr = users.filter((u) => u.id === userId);
  const userToDeleted = userToDeletedArr[0];
  const newUsers = users.filter((u) => u.id !== userId);
  saveUsers(newUsers);
  res.status(200).json({
    status: 'success',
    message: `user ${userToDeleted.name} with the ID ${userToDeleted.id} has been deleted!`,
  });
};

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').patch(updateUsers).delete(deleteUsers);

// app.get('/api/v1/users', getUsers);
// app.post('/api/v1/users', postUsers);
// app.patch('/api/v1/users/:id', updateUsers);
// app.delete('/api/v1/users/:id', deleteUsers);

export default app;
