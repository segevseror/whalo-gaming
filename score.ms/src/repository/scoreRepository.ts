import mongoose, { Connection } from "mongoose";
import { createScoreModel, IScore } from "../models/score.model";

export class ScoreRepository {
  private scoreModel: mongoose.Model<IScore>;
  constructor(mongoDbConnection: Connection) {
    this.scoreModel = createScoreModel(mongoDbConnection);
  }

  async submitScore(scoreData: { playerId: string; score: number }) {
    return this.scoreModel.create(scoreData);
  }

  async updatePlayer(id: string, playerData: { username: string }) {
    return await this.scoreModel.findByIdAndUpdate(id, playerData, { new: true });
  }
}
