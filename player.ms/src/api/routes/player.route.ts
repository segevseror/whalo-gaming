import { Router } from "express";
import { PlayerController } from "../../controllers/player.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createPlayerSchema,
  updatePlayerSchema,
} from "../dtos/create-player.schema";
import { PlayerService } from "../../services/player.service";
import { PlayerRepository } from "../../repository/playerRepository";
import { Connection } from "mongoose";
import { Logger } from "winston";

export function createPlayerRoutes(mongoConnection: Connection, logger: Logger) {
  const router = Router();
  const repository = new PlayerRepository(mongoConnection);
  const playerService = new PlayerService(repository);
  const playerController = new PlayerController(playerService, logger);

  router.post(
    "/players",
    validateRequest(createPlayerSchema),
    playerController.createPlayer
  );
  router.get("/player/:playerId", playerController.getPlayer);
  router.put(
    "/player/:playerId",
    validateRequest(updatePlayerSchema),
    playerController.updatePlayer
  );
  router.delete("/player/:playerId", playerController.deletePlayer);

  return router;
}
