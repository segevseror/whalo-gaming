import { Player } from "whalo-types";
// import { createPlayer, getPlayerById, updatePlayer } from "../models/player.model.mongo";
import {
  CreatePlayerDto,
  UpdatePlayerDto,
} from "../api/dtos/create-player.schema";
import PlayerRepository from "../repository/playerRepository";

export class PlayerService {
  async createPlayer(player: CreatePlayerDto): Promise<Player> {
    const checkIfEmailExists = await PlayerRepository.findOneByEmailAndUsername(
      player.email,
      player.username
    );
    if (checkIfEmailExists) {
      throw new Error("Player with this username or email already exists");
    }
    const playerData = await PlayerRepository.createUser({
      username: player.username,
      email: player.email,
    });
    return {
      id: playerData.id,
      username: playerData.username,
      email: playerData.email,
    };
  }

  async getPlayer(playerId: string): Promise<Player | null> {
    const player = await PlayerRepository.findById(playerId);
    if (!player) {
      return null;
    }
    return {
      id: player.id,
      username: player.username,
      email: player.email,
    };
  }

  async updatePlayer(
    playerId: string,
    playerData: UpdatePlayerDto
  ): Promise<Player | null> {
    const player = await PlayerRepository.findById(playerId);
    if (!player) {
      throw { statusCode: 404, message: "Player not found" };
    }

    const checkIfUsernameExists = await PlayerRepository.findOneByUsername(
      playerData.username
    );

    if (checkIfUsernameExists) {
      throw {
        statusCode: 409,
        message: "Player with this username already exists",
      };
    }

    const updatePlayer = await PlayerRepository.updatePlayer(playerId, {
      username: playerData.username,
    });
    if (!updatePlayer) {
      throw { statusCode: 500, message: "something went wrong" };
    }
   
    return {
      id: updatePlayer.id,
      username: updatePlayer.username,
      email: updatePlayer.email,
    };
  }

  async deletePlayer(playerId: string): Promise<Player | null> {
    const playerData = await PlayerRepository.deletePlayer(playerId);
    if (!playerData) {
      return null;
    }
    return {
      id: playerData.id,
      username: playerData.username,
      email: playerData.email,
    };
  }
}
