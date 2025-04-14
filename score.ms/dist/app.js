"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./api/routes");
const redis_db_1 = require("./models/db/redis.db");
const mongo_db_1 = require("./models/db/mongo.db");
const rabbit_1 = require("./lib/helper/rabbit");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/', routes_1.routes);
(0, redis_db_1.initializeRedis)();
(0, mongo_db_1.initializeMongoDB)();
rabbit_1.rabbitMQ.connect('amqp://admin:password@localhost').catch(console.error);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
app.listen(PORT, () => {
    console.log(`Microservice Management is running on port ${PORT}`);
});
exports.default = app;
