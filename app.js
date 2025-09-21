import dotenv from 'dotenv';
import express from 'express';
import router from './routes/usersRoutes.js';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());
app.use('/api/v1/users', router);

export default app;
