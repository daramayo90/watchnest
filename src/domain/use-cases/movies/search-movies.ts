import { MovieEntity, MovieRepository } from '../../../domain';
import { CacheService, MovieService } from '../../../presentation/services';
import { getCachedData } from '../../../utils/cache-helper';

export interface SearchMoviesUseCase {
   execute(title: string): Promise<MovieEntity[]>;
}

export class SearchMovies implements SearchMoviesUseCase {
   private movieService: MovieService;

   constructor(private repository: MovieRepository, private cacheService: CacheService) {
      this.movieService = new MovieService();
   }

   async execute(title: string): Promise<MovieEntity[]> {
      const key = `search-movie:${title}`;

      return getCachedData(
         this.cacheService,
         key,
         async () => {
            const movies = await this.repository.searchMoviesByTitle(title);
            return this.movieService.filterByTitle(movies, title);
         },
         86400, // Cache for 1 day
      );
   }
}
