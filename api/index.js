import express from 'express';
import connectDB from './db/config.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;





// Routers
app.use('/api/users', userRouter);

 connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
} );