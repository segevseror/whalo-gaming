import { Request, Response } from "express";
import { PlayerService } from "../services/player.service";
import { Player } from "whalo-types";

export class PlayerController {
  constructor(private playerService: PlayerService) {}

  createPlayer = async (
    req: Request,
    res: Response
  ): Promise<Response<Player>> => {
    try {
      const newPlayer = await this.playerService.createPlayer(req.body);
      return res.status(200).json(newPlayer);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error creating player", error: error.message });
    }
  };

  getPlayer = async (
    req: Request,
    res: Response
  ): Promise<Response<Player>> => {
    try {
      const { playerId } = req.params;
      const player = await this.playerService.getPlayer(playerId);
      return res.status(200).json(player);
    } catch (error: any) {
      return res
        .status(404)
        .json({ message: "Player not found" });
    }
  };

  updatePlayer = async (req: Request, res: Response) => {
    try {
      const { playerId } = req.params;
      const updatedPlayer = await this.playerService.updatePlayer(
        playerId,
        req.body
      );
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      return res.status(200).json(updatedPlayer);
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json({ message: "Error updating player", error: error.message });
    }
  };

  deletePlayer = async (req: Request, res: Response) => {
    const { playerId } = req.params;
    const deletedPlayer = await this.playerService.deletePlayer(playerId);
    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    return res.status(200).json(deletedPlayer);
  };
}
