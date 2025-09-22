import { MongoClient } from 'mongodb';
import app from './app.js';

const port = 8000;
const uri = process.env.atlas_database;
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('users-management-app');
    const users = database.collection('users');

    const query = { website: 'elvis.io' };
    const user = await users.findOne(query);
    console.log(user);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
