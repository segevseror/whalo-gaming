import { Channel, ConsumeMessage } from "amqplib";
import { RabbitMqQueue } from "../utils/rabbit.mq";
import { Logger } from "winston";
import { RedisClientType } from "redis";
import { ScoreType } from "whalo-types";

export async function registerScoreConsumer(
  rabbitChannel: Channel,
  raddis: RedisClientType,
  logger: Logger
): Promise<void> {
  await rabbitChannel.consume(
    "score-queue",
    async (msg: ConsumeMessage | null) => {
      if (msg) {
        const content = msg.content.toString();
        const data: ScoreType = JSON.parse(content);

        const redisCount = await raddis.zCard(RabbitMqQueue.SCORE_SUBMISSIONS);
        if (redisCount === 0) {
          //TODO: Redis is empty, fetching top players from DB
        }

        await raddis.zAdd(RabbitMqQueue.SCORE_SUBMISSIONS, [
          { score: data.score, value: data.id },
        ]);

        const total = await raddis.zCard(RabbitMqQueue.SCORE_SUBMISSIONS);
        if (total > 10) {
          await raddis.zPopMin(RabbitMqQueue.SCORE_SUBMISSIONS);
        }

        logger.info("consume message", {
          data,
        });

        rabbitChannel.ack(msg);
      }
    }
  );
  console.log(`[Consumer] Listening to score-queue`);
}
