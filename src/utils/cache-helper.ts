import { CacheService } from '../presentation/services';
import { languageContext, localeContext } from '../context';
import { Key, TTL } from '../types';

export const getCachedData = async (
   cacheService: CacheService,
   key: Key,
   dataFetcher: () => Promise<any>,
   ttl: TTL = 86400,
) => {
   const language = languageContext.getLanguage();
   const locale = localeContext.getLocale();
   const cacheKey = `${key}:${language}:${locale}`;
   const cachedData = await cacheService.get(cacheKey, language, locale);

   if (cachedData) {
      return cachedData;
   }

   const data = await dataFetcher();
   await cacheService.set(cacheKey, language, locale, data, ttl);
   return data;
};
