import { ScoreModel } from "../models/score.model";

class ScoreRepository {

  async submitScore(scoreData: { playerId: string; score: number }) {
    const user = new ScoreModel(scoreData);
    return user.save();
  }

  async updatePlayer(id: string, playerData: { username: string }) {
    return await ScoreModel.findByIdAndUpdate(id, playerData, { new: true });
  }
}

export default new ScoreRepository();
