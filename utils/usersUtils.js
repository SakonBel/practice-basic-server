import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(import.meta.dirname, './../users.json');

export const loadUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    return data;
  } catch {
    console.error('Cannot load users data');
    return [];
  }
};

export const saveUsers = (data) => {
  fs.writeFile(USERS_FILE, JSON.stringify(data), (err) => {
    console.error('Cannot write the file! ', err);
  });
};
