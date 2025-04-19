import { Router } from "express";
import { ScoreController } from "../../controllers/score.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { submitScoreSchema } from "../dtos/score.schema";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { ScoreRepository } from "../../repository/scoreRepository";
import { ScoreService } from "../../services/score.service";
import { Channel } from "amqplib";
import { RabbitMqManager } from "../../utils/rabbit.mq";
import { RedisClientType } from "redis";

export function createScoreRoutes(
  mongoConnection: Connection,
  redis: RedisClientType,
  rabbitChannel: Channel,
  logger: Logger
) {
  const router = Router();
  const repository = new ScoreRepository(mongoConnection);
  const rabbitManager = new RabbitMqManager(rabbitChannel, logger);
  const scpreService = new ScoreService(repository, rabbitManager, redis);
  const scoreController = new ScoreController(scpreService, logger);

  router.post(
    "/score",
    validateRequest(submitScoreSchema),
    scoreController.submitScore
  );
  router.get("/score/top", scoreController.topScore);

  return router;
}
