import mongoose, { Connection } from "mongoose";
import { getPlayerModel } from "../models/player.model.mongo";
import { PlayerType } from "whalo-types";

export class PlayerRepository {
  private playerModel: mongoose.Model<PlayerType>;

  constructor(mongoDbConnection: Connection) {
    this.playerModel = getPlayerModel(mongoDbConnection);
  }

  async findById(id: string) {
    return await this.playerModel.findOne({
      _id: id,
      deletedAt: null,
    });
  }

  async findOneByUsername(username: string) {
    return await this.playerModel.findOne({
      username,
    });
  }

  async findOneByEmailAndUsername(email: string, username: string) {
    return await this.playerModel.findOne({
      $or: [{ email }, { username }],
    });
  }

  async createUser(playerData: { username: string; email: string }) {
    return this.playerModel.create(playerData);
  }

  async updatePlayer(id: string, playerData: { username: string }) {
    return await this.playerModel.findByIdAndUpdate(
      {
        _id: id,
        deletedAt: null,
      },
      {
        username: playerData.username,
        updatedAt: new Date(),
      },
      {
        returnDocument: "after",
      }
    );
  }

  async softDeletePlayer(id: string) {
    return await this.playerModel.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        returnDocument: "after",
      }
    );
  }
}
