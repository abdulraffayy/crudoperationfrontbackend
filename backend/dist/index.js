"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const route_1 = __importDefault(require("./route/route"));
const populateDb_1 = require("./populateDb");
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
// User routes
app.use('/api', route_1.default);
// Populate database with sample data
(0, populateDb_1.populateDatabase)();
// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
