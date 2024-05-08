import express from 'express';
import connectDB from './db/config.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('dev'));





// Routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


 connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );