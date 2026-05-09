import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let redis: Redis | null = null;

export const initRedis = async () => {
  if (redis) return redis;

  redis = new Redis(redisUrl);

  redis.on('connect', () => {
    console.log('Redis connecting...');
  });

  redis.on('ready', () => {
    console.log('Redis ready!');
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  redis.on('close', () => {
    console.log('Redis connection closed.');
  });

  await new Promise<void>((resolve, reject) => {
    if (!redis) return reject(new Error('Redis not created'));

    redis.once('ready', () => resolve());
    redis.once('error', (err) => reject(err));
  });

  return redis;
};

export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error('Redis not initialized. Call initRedis() first.');
  }
  return redis;
};

export const closeRedis = async () => {
  if (redis) {
    await redis.quit();
    redis = null;
    console.log('Redis connection closed gracefully.');
  }
};

export const redisSet = async (
  key: string,
  value: string,
  expireSeconds?: number
) => {
  const client = getRedis();

  if (expireSeconds) {
    await client.set(key, value, 'EX', expireSeconds);
  } else {
    await client.set(key, value);
  }
};

export const redisGet = async (key: string) => {
  return getRedis().get(key);
};

export const redisDel = async (key: string) => {
  return getRedis().del(key);
};

export const redisExists = async (key: string) => {
  return getRedis().exists(key);
};
