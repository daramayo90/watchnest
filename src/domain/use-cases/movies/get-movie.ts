import { MovieEntity } from '../../../domain/entities';
import { MovieRepository } from '../../../domain/repositories';
import { CacheService } from '../../../presentation/services';
import { getCachedData } from '../../../utils/cache-helper';

export interface GetMovieUseCase {
   execute(id: string): Promise<MovieEntity>;
}

export class GetMovie implements GetMovieUseCase {
   constructor(private repository: MovieRepository, private cacheService: CacheService) {}

   async execute(id: string): Promise<MovieEntity> {
      const key = `get-movie:${id}`;

      return getCachedData(
         this.cacheService,
         key,
         () => this.repository.getMovieById(id),
         86400, // Cache for 1 day
      );
   }
}
