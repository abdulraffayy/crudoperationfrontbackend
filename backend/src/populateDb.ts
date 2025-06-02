import { User } from './model/Usermodel';
import mongoose from 'mongoose';

const sampleUsers = [
    {
        name: "Abdul Rafay Aziz",
        email: "abdulrafay1@gmail.com",
        age: 28,
        job: "Software Engineer",
        salary: 75000
    },
    {
        name: "Abdul Rafay Aziz",
        email: "abdulrafay2@gmail.com",
        age: 28,
        job: "Software Engineer",
        salary: 75000
    },
    {
        name: "Billal Aziz",
        email: "billalaziz@gmail.com",
        age: 19,
        job: "Software Engineer",
        salary: 96000
    },
    {
        name: "Sarah Williams",
        email: "sarah@example.com",
        age: 30,
        job: "UX Designer",
        salary: 80000
    },
    {
        name: "Ahmed Ali",
        email: "ahmedali1@gmail.com",
        age: 20,
        job: "Software Engineer",
        salary: 80000
    }, 
    {
        name: "Ahmed Ali",
        email: "ahmedali2@gmail.com",
        age: 20,
        job: "Software Engineer",
        salary: 80000
    },
    {
        name: "Muhammad Abubaker",
        email: "abubaker@gmail.com",
        age: 20,
        job: "Cloud Engineer",
        salary: 700000
    }
];

export const populateDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        
        // Insert sample data
        await User.insertMany(sampleUsers);
        
        console.log('Database populated successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}; 