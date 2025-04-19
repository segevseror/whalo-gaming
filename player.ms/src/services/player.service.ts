import { PlayerType } from "whalo-types";
import {
  CreatePlayerDto,
  UpdatePlayerDto,
} from "../api/dtos/create-player.schema";
import { PlayerRepository } from "../repository/playerRepository";

export class PlayerService {
  private readonly playerRepository: PlayerRepository;

  constructor(playerRepositorya: PlayerRepository) {
    this.playerRepository = playerRepositorya;
  }

  async createPlayer(player: CreatePlayerDto): Promise<PlayerType> {
    const checkIfEmailExists =
      await this.playerRepository.findOneByEmailAndUsername(
        player.email,
        player.username
      );
    if (checkIfEmailExists) {
      throw new Error("Player with this username or email already exists");
    }
    const playerData = await this.playerRepository.createUser({
      username: player.username,
      email: player.email,
    });
    return {
      id: playerData.id,
      username: playerData.username,
      email: playerData.email,
    };
  }

  async getPlayer(playerId: string): Promise<PlayerType | null> {
    const player = await this.playerRepository.findById(playerId);
    if (!player) {
      throw { statusCode: 404, message: "Player not found" };
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
  ): Promise<PlayerType | null> {
    const player = await this.playerRepository.findById(playerId);
    if (!player) {
      throw { statusCode: 404, message: "Player not found" };
    }

    const checkIfUsernameExists = await this.playerRepository.findOneByUsername(
      playerData.username
    );

    if (checkIfUsernameExists) {
      throw {
        statusCode: 409,
        message: "Player with this username already exists",
      };
    }

    const updatePlayer = await this.playerRepository.updatePlayer(playerId, {
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

  async deletePlayer(playerId: string): Promise<PlayerType | null> {
    const playerData = await this.playerRepository.softDeletePlayer(playerId);
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
