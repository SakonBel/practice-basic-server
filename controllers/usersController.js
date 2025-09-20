import { loadUsers, saveUsers } from '../utils/usersUtils.js';

// Initial users loading
const users = loadUsers();

export const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    users,
  });
};

export const postUsers = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  saveUsers(users);
  res.status(201).json({
    status: 'success',
    message: 'User has been created!',
    user: newUser,
  });
};

export const updateUsers = (req, res) => {
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

export const deleteUsers = (req, res) => {
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
