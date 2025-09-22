import dotenv from 'dotenv';
import express from 'express';
import router from './routes/usersRoutes.js';

dotenv.config({ path: './.env.development' });
const app = express();

app.use(express.json());
app.use('/api/v1/users', router);

export default app;
