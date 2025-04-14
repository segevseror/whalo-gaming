import axios from "axios";
import { InsertScoreDto } from "../api/dtos/score.schema";
import { rabbitMQ } from "../lib/helper/rabbit";
import scoreRepository from "../repository/scoreRepository";
import TopscoreRepository from "../repository/TopscoreRepository";
import { RabbitMqQueue } from "../consumers/rabbitMq";

export class ScoreService {
  async submitScore(player: InsertScoreDto): Promise<boolean> {
    try {
      await axios.get(`http://localhost:3001/api/player/${player.playerId}`); // Docker hostname or service name in docker-compose
    } catch (error) {
      throw new Error("Player not found");
    }
    await scoreRepository.submitScore(player);

    const messageToMqTopScore = {
      playerId: player.playerId,
      score: player.score,
    };

    await rabbitMQ.sendToQueue(RabbitMqQueue.SCORE_SUBMISSIONS, JSON.stringify(messageToMqTopScore));

    return true;
  }

  async topTenScores(): Promise<any[]> {
    return await TopscoreRepository.getTopScores();
  }
}
