import mongoose, { Schema, model, Document } from 'mongoose';

// Interface for User document
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
    job: string;
    salary: number;
    createdAt: Date;
    updatedAt: Date;
}

// Create the schema
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative']
    },
    job: {
        type: String,
        required: [true, 'Job is required'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary cannot be negative']
    }
}, {
                 
});


export const User = model<IUser>('User', UserSchema);


  