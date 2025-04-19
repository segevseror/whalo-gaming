import axios from "axios";
import { InsertScoreDto } from "../api/dtos/score.schema";
import { ScoreRepository } from "../repository/scoreRepository";
import { RabbitMqManager, RabbitMqQueue } from "../utils/rabbit.mq";
import { RedisClientType } from "redis";
import { ScoreType } from "whalo-types";


export class ScoreService {
  constructor(
    private scoreRepository: ScoreRepository,
    private rabbitMq: RabbitMqManager,
    private redis: RedisClientType
  ) {}

  async submitScore(player: InsertScoreDto): Promise<boolean> {
    try {
      await axios.get(
        process.env.PLAYER_URL + "/" + player.playerId ||
          `http://localhost:3001/api/player/${player.playerId}`
      ); // Docker hostname or service name in docker-compose
    } catch (error) {
      throw new Error("Player not found");
    }
    await this.scoreRepository.submitScore(player);

    const messageToMqTopScore: ScoreType = {
      id: player.playerId,
      score: player.score,
    };

    this.rabbitMq.sendMessage(
      "score-queue",
      JSON.stringify(messageToMqTopScore)
    );

    return true;
  }

  async topTenScores(): Promise<number[]> {
    const topScore = await this.redis.zRangeWithScores(
      RabbitMqQueue.SCORE_SUBMISSIONS,
      0,
      -1,
      {
        REV: true,
      }
    );
    return topScore.map((value) => value.score);
  }
}
