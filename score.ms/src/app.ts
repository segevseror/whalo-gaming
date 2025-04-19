import express from "express";
import { createScoreRoutes } from "./api/routes/score.route";
import { Connection, Mongoose } from "mongoose";
import { Logger } from "winston";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { Channel } from "amqplib";
import { registerScoreConsumer } from "./consumers/score-consumer";
import { RedisClientType, RedisModules } from "redis";
import { assertAllQueues } from "./utils/rabbit.mq";

export async function createApp(
  mongoDbConnection: Connection,
  raddis: RedisClientType,
  rabbitManager: Channel,
  logger: Logger
) {
  const app = express();
  const PORT = process.env.PORT || 3002;

  // Middleware
  app.use(express.json());

  //Logger middleware
  app.use(loggerMiddleware(logger));

  await assertAllQueues(rabbitManager);

  await registerScoreConsumer(rabbitManager, raddis, logger);

  // Routes
  app.use("/api/", createScoreRoutes(mongoDbConnection, raddis, rabbitManager, logger));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.listen(PORT, () => {
    console.log(`Microservice Management is running on port ${PORT}`);
  });

  return app;
}

// import express from "express";
// import { routes } from "./api/routes/score.route";
// import connectDB from "./models/db/mongo.db";
// // import { rabbitMQ } from "./lib/helper/rabbit";
// import { startScoreConsumer } from "./consumers/score-consumer";
// import { initializeRedis } from "./models/db/redis.db";
// // import HandleTopScoreList from "./lib/helper/manager-top-score-list";
// // import ScoreConsumer from "./consumers/score-consumer";
// import { createRabbitMqChannel } from "./consumers/rabbitMq";
// import { rabbitMQ } from "./lib/helper/rabbit";

// const app = express();
// const PORT = process.env.PORT || 3002;

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/", routes);
// initializeRedis();
// connectDB();
// (async () => {
//   await rabbitMQ.connect("amqp://admin:password@localhost"); // Change if needed
//   await startScoreConsumer();
// })();

// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK" });
// });

// app.listen(PORT, () => {
//   console.log(`Microservice Management is running on port ${PORT}`);
// });

// export default app;
