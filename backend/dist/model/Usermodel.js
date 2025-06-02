"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const UserSchema = new mongoose_1.Schema({
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
}, {});
exports.User = (0, mongoose_1.model)('User', UserSchema);
