import { users } from '../models/usersModel.js';

export async function loadUsers() {
  return await users.find({});
}
