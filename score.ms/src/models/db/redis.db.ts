import { createClient, RedisClientType } from 'redis';

// Define the Redis client type
let redisClient: RedisClientType;

async function initializeRedis() {
  // Create a Redis client
  redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379' // Using the service name from docker-compose
  });

  // Listen for errors
  redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));

  // Connect to Redis
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
}

// Function to get the client
function getRedisClient(): RedisClientType {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call initializeRedis first.');
  }
  return redisClient;
}

export { initializeRedis, getRedisClient };
