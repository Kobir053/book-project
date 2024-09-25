import express, { Application } from 'express';
import authRouter from './routes/auth.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const PORT: number | string =  process.env.PORT || 3000;

app.use(express.json());

app.use('/', authRouter);

app.use('/books', userRouter)



app.listen(PORT, ()=>{console.log("server on")});