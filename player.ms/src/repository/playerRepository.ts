import { CreatePlayerDto } from "../api/dtos/create-player.schema";
import { PlayerModel } from "../models/player.model.mongo";

class PlayerRepository {
  async findById(id: string) {
    return PlayerModel.findOne({
      _id: id,
    });
  }

  async findOneByUsername(username: string) {
    return await PlayerModel.findOne({
      username,
    });
  }

  async findOneByEmailAndUsername(email: string, username: string) {
    return await PlayerModel.findOne({
      $or: [{ email }, { username }],
    });
  }

  async createUser(playerData: { username: string; email: string }) {
    const user = new PlayerModel(playerData);
    return user.save();
  }

  async updatePlayer(id: string, playerData: { username: string }) {
    return await PlayerModel.findByIdAndUpdate(id, {
      username: playerData.username,
      updatedAt: new Date(),
    }, {
      returnDocument: "after",
    });
  }

  async deletePlayer(id: string) {
    return await PlayerModel.findByIdAndDelete(id, {
      returnDocument: "after",
    });
  }
}

export default new PlayerRepository();
