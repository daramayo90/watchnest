import { MovieEntity, MovieRepository } from '../..';
import { CacheService } from '../../../presentation/services';
import { getCachedData } from '../../../utils/cache-helper';

export interface GetPopularMoviesUseCase {
   execute(page: string): Promise<MovieEntity[]>;
}

export class GetPopularMovies implements GetPopularMoviesUseCase {
   constructor(private repository: MovieRepository, private cacheService: CacheService) {}

   async execute(page: string): Promise<MovieEntity[]> {
      const key = `popular-movies:${page}`;

      return getCachedData(
         this.cacheService,
         key,
         async () => await this.repository.getPopularMovies(page),
         86400, // Cache for 1 day
      );
   }
}
