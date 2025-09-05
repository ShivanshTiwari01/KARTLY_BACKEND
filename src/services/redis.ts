import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let client: RedisClientType | null = null;

export const initRedis = async () => {
  if (!client) {
    client = createClient({ url: redisUrl });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
      console.log('Redis client connecting...');
    });

    client.on('ready', () => {
      console.log('Redis client connected and ready!');
    });

    client.on('end', () => {
      console.log('Redis client disconnected.');
    });

    await client.connect();
  }
  return client;
};

export const getRedisClient = (): RedisClientType => {
  if (!client) {
    throw new Error('Redis client not initialized. Call initRedis() first.');
  }
  return client;
};

export const closeRedis = async () => {
  if (client && client.isOpen) {
    await client.quit();
    client = null;
    console.log('Redis connection closed.');
  }
};

// Example utility functions
export const redisSet = async (
  key: string,
  value: string,
  expireSeconds?: number
) => {
  const c = getRedisClient();
  if (expireSeconds) {
    await c.set(key, value, { EX: expireSeconds });
  } else {
    await c.set(key, value);
  }
};

export const redisGet = async (key: string) => {
  const c = getRedisClient();
  return await c.get(key);
};
