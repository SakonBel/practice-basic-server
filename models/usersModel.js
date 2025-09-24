import mongoose from 'mongoose';
import dotenv from 'dotenv';

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
export { users };
