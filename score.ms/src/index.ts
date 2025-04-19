import { createApp } from "./app";
import { connectMongoDB } from "./models/db/mongo.db";
import { createRaddisConnect } from "./models/db/redis.db";
import { createLogger } from "./utils/logger";
import { connectToRabbitMq } from "./utils/rabbit.mq";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  const mongoDb = await connectMongoDB();
  const raddis = await createRaddisConnect();
  const logger = await createLogger("score.ms");
  const rabbitChannel = await connectToRabbitMq(
    process.env.RABBIT_URL || "amqp://admin:password@rabbitmq"
  );
  createApp(mongoDb, raddis, rabbitChannel, logger);
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
