import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapp';

const connectDB = async (): Promise<void> => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions;

        await mongoose.connect(MONGODB_URI, options);
        
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default connectDB;
