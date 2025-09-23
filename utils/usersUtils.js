import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import { MongoClient } from 'mongodb';
// import fs from 'fs';
// import path from 'path';
dotenv.config({ path: './.env.development' });

const URI = process.env.atlas_database;

async function connectDb() {
  await mongoose.connect(URI, {
    dbName: 'Users-sandbox',
  });
}

connectDb()
  .then(console.log('Connected'))
  .catch(console.error((err) => err));

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: { lat: String, lng: String },
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

const users = mongoose.model('users', userSchema, 'Users');

export async function loadUsers() {
  return await users.find({});
}

// const client = new MongoClient(uri);
// export async function loadUsers() {
//   try {
//     const database = client.db('Users-sandbox');
//     const data = database.collection('Users');
//     const users = await data.find({}).toArray();
//     return users;
//   } finally {
//     await client.close();
//   }
// }

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
