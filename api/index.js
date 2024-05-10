import express from 'express';
import connectDB from './db/config.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));





// Routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message
     });
})


 connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );