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
exports.submitScore = void 0;
const mongoose_1 = require("mongoose");
const mongo_db_1 = require("./db/mongo.db");
// Define the MongoDB schema
const PlayerSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    scores: [
        {
            score: { type: Number, required: true },
            createdAt: { type: Date, required: true },
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
    collection: "players",
});
// Create a singleton model instance
let PlayerModel;
// Initialize the model with connection
const initializeModel = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!PlayerModel) {
        const mongoConnection = (0, mongo_db_1.getMongoConnection)();
        // Check if model already exists
        if (mongoConnection.models["Player"]) {
            PlayerModel = mongoConnection.models["Player"];
        }
        else {
            PlayerModel = mongoConnection.model("Player", PlayerSchema);
        }
        // Ensure indexes are created
        try {
            yield PlayerModel.createIndexes();
            console.log("Indexes successfully created.");
        }
        catch (error) {
            console.error("Error creating indexes:", error);
            throw error;
        }
    }
    return PlayerModel;
});
// Create a new player
const submitScore = (player) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = yield initializeModel();
        yield model.updateOne({ _id: player.body.playerId }, { $push: { scores: { score: player.body.score, createdAt: new Date() } } });
        return true;
    }
    catch (error) {
        throw new Error(`Failed submit score: ${error.message}`);
    }
});
exports.submitScore = submitScore;
