"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDatabase = void 0;
const Usermodel_1 = require("./model/Usermodel");
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
const populateDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing data
        yield Usermodel_1.User.deleteMany({});
        // Insert sample data
        yield Usermodel_1.User.insertMany(sampleUsers);
        console.log('Database populated successfully!');
    }
    catch (error) {
        console.error('Error populating database:', error);
    }
});
exports.populateDatabase = populateDatabase;
