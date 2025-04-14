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
exports.ScoreController = void 0;
const score_service_1 = require("../services/score.service");
class ScoreController {
    constructor() {
        this.submitScore = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ScoreService.submitScore(req);
                return res.status(200).send(true);
            }
            catch (error) {
                return res.status(500).json({ message: "Error creating player", error });
            }
        });
        this.topScore = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const topTenScores = yield this.ScoreService.topTenScores();
                return res.status(200).send(topTenScores);
            }
            catch (error) {
                return res.status(500).json({ message: "Error creating player", error });
            }
        });
        this.ScoreService = new score_service_1.ScoreService();
    }
}
exports.ScoreController = ScoreController;
