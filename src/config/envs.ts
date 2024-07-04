import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
   PORT: get('PORT').required().asPortNumber(),

   TMDB_API_URL: get('TMDB_API_URL').required().asString(),
   TMDB_API_KEY: get('TMDB_API_KEY').required().asString(),
   TMDB_ACCESS_TOKEN: get('TMDB_ACCESS_TOKEN').required().asString(),

   REDIS_URL: get('REDIS_URL').required().asString(),

   POSTGRES_USER: get('POSTGRES_USER').required().asString(),
   POSTGRES_DB: get('POSTGRES_DB').required().asString(),
   POSTGRES_PORT: get('POSTGRES_PORT').required().asPortNumber(),
   POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
};
