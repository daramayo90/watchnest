import { Key, Language, Locale, TTL, Value } from '../../types';

export interface CacheRepository {
   get(key: Key, language: Language, locale: Locale): Promise<any>;
   set(key: Key, language: Language, locale: Locale, value: Value, ttl: TTL): Promise<void>;
}
