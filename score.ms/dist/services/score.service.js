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
exports.ScoreService = void 0;
const rabbit_1 = require("../lib/helper/rabbit");
const player_model_mongo_1 = require("../models/player.model.mongo");
const top_score_model_mongo_1 = require("../models/top-score.model.mongo");
class ScoreService {
    submitScore(player) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, player_model_mongo_1.submitScore)(player);
            const message = {
                playerId: player.body.playerId,
                score: player.body.score,
            };
            rabbit_1.rabbitMQ.sendMessage("score-queue", JSON.stringify(message));
            //send rabbit message
            // const connection = await connect("amqp://admin:password@localhost");
            // const channel = await connection.createChannel();
            // await channel.assertQueue("score-queue", { durable: false });
            // await channel.sendToQueue("score-queue", Buffer.from(JSON.stringify(message)));
            // console.log("Score sent to RabbitMQ");
            // await channel.close();
            // await connection.close();
            return true;
        });
    }
    topTenScores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, top_score_model_mongo_1.getTopScores)();
        });
    }
}
exports.ScoreService = ScoreService;
