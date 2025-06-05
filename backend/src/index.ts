import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { User } from './model/Usermodel';
import userRoutes from './route/route';
import { populateDatabase } from './populateDb';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API' });
});

// User routes
app.use('/api', userRoutes);

// Populate database with sample data
populateDatabase();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 