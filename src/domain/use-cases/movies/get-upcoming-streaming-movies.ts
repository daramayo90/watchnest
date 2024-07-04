import { MovieEntity, MovieRepository } from '../..';
import { CacheService } from '../../../presentation/services';
import { StreamingMoviesParams } from '../../../types';
import { getCachedData } from '../../../utils';

export interface GetUpcomingStreamingMoviesUseCase {
   execute(params: StreamingMoviesParams): Promise<MovieEntity[]>;
}

export class GetUpcomingStreamingMovies implements GetUpcomingStreamingMoviesUseCase {
   constructor(private repository: MovieRepository, private cacheService: CacheService) {}

   async execute(params: StreamingMoviesParams): Promise<MovieEntity[]> {
      const { watchProviders } = params;

      const cacheKey = `get-upcoming-streaming-movies:${watchProviders}`;

      return getCachedData(
         this.cacheService,
         cacheKey,
         () => this.repository.getUpcomingStreamingMovies(params),
         86400, // Cache for 1 day
      );
   }
}
