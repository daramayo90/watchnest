import { createClient } from 'redis';
import { log } from './logger';
import { envs } from './envs';

export const redisClient = createClient({
   url: envs.REDIS_URL,
});

redisClient.on('error', (err) => {
   log.error(`Redis Client Error: ${err}`);
   console.log(`Redis Client Error: ${err}`);
});

redisClient.on('connect', () => {
   console.log('Redis client connected');
});

redisClient.on('ready', () => {
   console.log('Redis client ready');
});

redisClient.on('end', () => {
   console.log('Redis client disconnected');
});

redisClient.connect();
