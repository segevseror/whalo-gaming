import amqp from "amqplib";
import mongoose from "mongoose";
import { RabbitMqQueue } from "./rabbitMq";
import { InsertScoreDto } from "../api/dtos/score.schema";
import { getRedisClient } from "../models/db/redis.db";


import { rabbitMQ } from "../lib/helper/rabbit";

export const startScoreConsumer = async () => {
  await rabbitMQ.consume(RabbitMqQueue.SCORE_SUBMISSIONS, async (msg: any) => {
    const content = msg.content.toString();
    const data = JSON.parse(content);
    console.log("📩 Received message:", data);

    const redisClient = getRedisClient();

    // If redis is empty check in the DB the top players
    const redisCount = await redisClient.zCard(RabbitMqQueue.SCORE_SUBMISSIONS);
    if (redisCount === 0) {
      //TODO: Redis is empty, fetching top players from DB
    }

    await redisClient.zAdd(RabbitMqQueue.SCORE_SUBMISSIONS, [{ score: data.score, value: data.playerId }]);

    const total = await redisClient.zCard(RabbitMqQueue.SCORE_SUBMISSIONS);
    console.log("Total players in leaderboard:", total);

    if (total > 10) {
      await redisClient.zPopMin(RabbitMqQueue.SCORE_SUBMISSIONS);
    }
  });
};
