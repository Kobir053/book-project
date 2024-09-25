import express from 'express';
import authRouter from './routes/auth.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/', authRouter);
app.listen(PORT, () => { console.log("server on"); });
