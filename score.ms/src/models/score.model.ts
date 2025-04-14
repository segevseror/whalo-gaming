import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  score: { type: Number, required: true },
});

export const ScoreModel = mongoose.model("scores", scoreSchema);
