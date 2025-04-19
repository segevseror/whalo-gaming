import express from "express";
import { createPlayerRoutes } from "./api/routes/player.route";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { rateLimiter } from "./middleware/rateLimiter";
import { leakyBucketLimiter } from "./middleware/queue-request";


export async function createApp(mongoDbConnection: Connection, logger: Logger) {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middlewares
  app.use(express.json());
  app.use(rateLimiter);
  app.use(leakyBucketLimiter);

  //Logger middleware
  app.use(loggerMiddleware(logger));

  // Routes
  app.use("/api/", createPlayerRoutes(mongoDbConnection, logger));

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.listen(PORT, () => {
    console.log(`Microservice Management is running on port ${PORT}`);
  });

  return app;
}
