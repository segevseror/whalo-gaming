import mongoose, { Connection } from "mongoose";

export interface IScore extends mongoose.Document {
  playerId: string;
  score: number;
}

const scoreSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  score: { type: Number, required: true },
});

export function createScoreModel(
  connection: Connection
): mongoose.Model<IScore> {
  return connection.model<IScore>("scores", scoreSchema);
}