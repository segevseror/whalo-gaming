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
exports.initializeMongoDB = initializeMongoDB;
exports.getMongoConnection = getMongoConnection;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the MongoDB connection type
let mongoConnection;
function initializeMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoURL = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/whalo-scores?authSource=admin';
            mongoConnection = mongoose_1.default.createConnection(mongoURL);
            yield new Promise((resolve, reject) => {
                mongoConnection.on('connected', () => {
                    console.log('MongoDB Connected');
                    resolve();
                });
                mongoConnection.on('error', (err) => {
                    console.error('MongoDB connection error:', err);
                    reject(err);
                });
                mongoConnection.on('disconnected', () => {
                    console.log('MongoDB disconnected');
                });
            });
            // Handle application termination
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                yield mongoConnection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            }));
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    });
}
// Function to get the connection
function getMongoConnection() {
    if (!mongoConnection) {
        throw new Error('MongoDB connection not initialized. Call initializeMongoDB first.');
    }
    return mongoConnection;
}
