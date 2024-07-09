import { MovieEntity, MovieRepository } from '../../../domain/';
import { CacheService } from '../../../presentation/services';
import { getCachedData } from '../../../utils/cache-helper';
import { StreamingMoviesParams } from '../../../types/movies-types';

export interface GetNewStreamingMoviesUseCase {
   execute(params: StreamingMoviesParams): Promise<MovieEntity>;
}

export class GetNewStreamingMovies implements GetNewStreamingMoviesUseCase {
   constructor(private repository: MovieRepository, private cacheService: CacheService) {}

   async execute(params: StreamingMoviesParams): Promise<MovieEntity> {
      const { watchProviders } = params;

      const key = `get-new-streaming-movies:${watchProviders}`;

      return getCachedData(
         this.cacheService,
         key,
         () => this.repository.getNewStreamingMovies(params),
         86400, // Cache for 1 day
      );
   }
}
