"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitScoreSchema = void 0;
const zod_1 = require("zod");
exports.submitScoreSchema = zod_1.z.object({
    body: zod_1.z.object({
        playerId: zod_1.z.string(),
        score: zod_1.z.number(),
    }),
});
