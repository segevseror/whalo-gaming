import { createClient, RedisClientType } from "redis";

export async function createRaddisConnect(): Promise<RedisClientType> {
  // Create a Redis client
  const redisClient: RedisClientType = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379", // Using the service name from docker-compose
  });

  // Listen for errors
  redisClient.on("error", (err: Error) =>
    console.log("Redis Client Error", err)
  );

  // Connect to Redis
  try {
    await redisClient.connect();
    console.log("Redis connected");
    return redisClient;
  } catch (err) {
    console.error("Error connecting to Redis:", err);
    throw Error('Error connecting to Redis:');
  }
}
