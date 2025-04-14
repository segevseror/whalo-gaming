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
exports.initializeRedis = initializeRedis;
exports.getRedisClient = getRedisClient;
const redis_1 = require("redis");
// Define the Redis client type
let redisClient;
function initializeRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a Redis client
        redisClient = (0, redis_1.createClient)({
            url: 'redis://localhost:6379' // Update the URL based on your Docker setup
        });
        // Listen for errors
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        // Connect to Redis
        try {
            yield redisClient.connect();
            console.log('Redis Connected');
        }
        catch (err) {
            console.error('Error connecting to Redis:', err);
        }
    });
}
// Function to get the client
function getRedisClient() {
    if (!redisClient) {
        throw new Error('Redis client not initialized. Call initializeRedis first.');
    }
    return redisClient;
}
