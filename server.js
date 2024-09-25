import express from 'express';
import authRouter from './routes/auth.js';
import userRouter from './routes/userRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/', authRouter);
app.use('/books', userRouter);
app.listen(PORT, () => {
    console.log("server on");
});
