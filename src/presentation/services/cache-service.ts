import { CacheRepository } from '../../domain/repositories';
import { log, redisClient } from '../../config';
import { Key, Language, Locale, TTL, Value } from '../../types';

export class CacheService implements CacheRepository {
   async get(key: Key, language: Language, locale: Locale): Promise<any> {
      const cacheKey = `${key}:${language}:${locale}`;

      try {
         const data = await redisClient.get(cacheKey);

         log.info(`Fetching data from cache with key: ${cacheKey}`);
         log.debug(`Fetched data: ${data ? JSON.stringify(data) : 'null'}`);

         return data ? JSON.parse(data) : null;
      } catch (error) {
         log.error(`Error fetching data from Redis with key ${cacheKey}: ${error}`);
         return null;
      }
   }

   async set(key: Key, language: Language, locale: Locale, value: Value, ttl: TTL): Promise<void> {
      const cacheKey = `${key}:${language}:${locale}`;

      try {
         await redisClient.set(cacheKey, JSON.stringify(value), { EX: ttl });

         log.info(`Caching data with key: ${cacheKey}`);
         log.debug(`Cached data: ${JSON.stringify(value)}`);
      } catch (error) {
         log.error(`Error setting data in Redis with key ${cacheKey}: ${error}`);
      }
   }
}
