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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapp';
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        yield mongoose_1.default.connect(MONGODB_URI, options);
        console.log('MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
});
// Handle connection events
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
// Handle application termination
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    process.exit(0);
}));
exports.default = connectDB;
