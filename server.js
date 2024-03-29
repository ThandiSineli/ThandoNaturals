import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authenticate from './middleware/authMiddleware.js';

config();

const app = express();


app.use(cors(
))


app.use(express.json());
app.use(cookieParser());

// Use your auth middleware
// app.use(authenticate);

// Use product routes
app.use('/', productRoutes);

// Use user routes
app.use('/', userRoutes);

// Use authentication routes
app.use('/', authRoutes);

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Internal Server Error' });
});

// Server listening
app.listen(process.env.PORT, function () {
    console.log('listening on port http://localhost:' + process.env.PORT);
});
