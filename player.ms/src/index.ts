import { createApp } from "./app";
import { connectMongoDB } from "./models/db/mongo.db";
import { createLogger } from "./utils/logger";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  const mongoDb = await connectMongoDB();
  const logger = await createLogger("player.ms");
  await createApp(mongoDb, logger);
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
