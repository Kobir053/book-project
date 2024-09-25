import express, { Application } from 'express';
import authRouter from './routes/auth.js';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

app.use('/', authRouter);





app.listen(PORT, ()=>{console.log("server on")});