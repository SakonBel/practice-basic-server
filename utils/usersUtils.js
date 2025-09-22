import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
// import fs from 'fs';
// import path from 'path';
dotenv.config({ path: './.env.development' });

const uri = process.env.atlas_database;
const client = new MongoClient(uri);
export async function loadUsers() {
  try {
    const database = client.db('Users-sandbox');
    const data = database.collection('Users');
    const users = await data.find({}).toArray();
    return users;
  } finally {
    await client.close();
  }
}

// const USERS_FILE = path.join(import.meta.dirname, './../users.json');

// export const loadUsers = () => {
//   try {
//     const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
//     return data;
//   } catch {
//     console.error('Cannot load users data');
//     return [];
//   }
// };

// export const saveUsers = (data) => {
//   fs.writeFile(USERS_FILE, JSON.stringify(data), (err) => {
//     console.error('Cannot write the file! ', err);
//   });
// };
