import { MovieEntity, MovieRepository } from '../../../domain';
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

      const key = `get-upcoming-streaming-movies:${watchProviders}`;

      return getCachedData(
         this.cacheService,
         key,
         () => this.repository.getUpcomingStreamingMovies(params),
         86400, // Cache for 1 day
      );
   }
}
