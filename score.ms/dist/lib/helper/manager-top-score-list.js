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
exports.handleTopScoreList = void 0;
const redis_db_1 = require("../../models/db/redis.db");
const NUMBER_OF_TOP_SCORES = 4;
const handleTopScoreList = (playerId, score) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_db_1.getRedisClient)();
    const topScoreList = yield client.get("top-score-list");
    if (!topScoreList) {
        yield client.set("top-score-list", JSON.stringify([
            {
                playerId,
                score,
            },
        ]));
    }
    else {
        let parseTopScoreList = JSON.parse(topScoreList);
        const findPlayer = parseTopScoreList.find((player) => player.playerId === playerId);
        if (findPlayer) {
            findPlayer.score = score;
        }
        else {
            parseTopScoreList.push({
                playerId,
                score,
            });
        }
        const sortedTopScoreList = parseTopScoreList.sort((a, b) => b.score - a.score);
        parseTopScoreList = sortedTopScoreList.slice(0, NUMBER_OF_TOP_SCORES);
        yield client.set("top-score-list", JSON.stringify(parseTopScoreList));
    }
    return true;
});
exports.handleTopScoreList = handleTopScoreList;
