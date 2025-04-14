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
exports.getTopScores = void 0;
const mongoose_1 = require("mongoose");
const mongo_db_1 = require("./db/mongo.db");
// Types
// interface ITopScoreModel extends Model<TopScore & Document> {
//   getTopScores(): Promise<TopScore[]>;
// }
// Schema Definition
const topScoreSchema = new mongoose_1.Schema({
    playerId: {
        type: String,
        required: true,
        unique: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: "topScores",
});
// Model Instance
let topScoreModel;
// Model Initialization
const initializeTopScoreModel = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!topScoreModel) {
        const mongoConnection = (0, mongo_db_1.getMongoConnection)();
        // Check if model already exists
        if (mongoConnection.models["Player"]) {
            topScoreModel = mongoConnection.models["Player"];
        }
        else {
            topScoreModel = mongoConnection.model("Player", topScoreSchema);
        }
        // Ensure indexes are created
        try {
            yield topScoreModel.createIndexes();
            console.log("Indexes successfully created.");
        }
        catch (error) {
            console.error("Error creating indexes:", error);
            throw error;
        }
    }
    return topScoreModel;
});
// Public Functions
const getTopScores = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Getting top scores");
        const model = yield initializeTopScoreModel();
        const topScores = yield model.find().sort({ score: -1 }).limit(10);
        return topScores;
    }
    catch (error) {
        throw new Error(`Failed get top scores: ${error.message}`);
    }
});
exports.getTopScores = getTopScores;
