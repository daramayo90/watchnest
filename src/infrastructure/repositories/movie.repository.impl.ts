import { MovieDataSource, MovieEntity, MovieRepository } from '../../domain';
import { StreamingMoviesParams } from '../../types';

export class MovieRepositoryImpl implements MovieRepository {
   constructor(private readonly movieDataSource: MovieDataSource) {}

   async getMovieById(id: string): Promise<MovieEntity> {
      return this.movieDataSource.getMovieById(id);
   }

   async searchMoviesByTitle(title: string): Promise<MovieEntity[]> {
      return this.movieDataSource.searchMoviesByTitle(title);
   }

   async getPopularMovies(page: string): Promise<MovieEntity[]> {
      return this.movieDataSource.getPopularMovies(page);
   }

   async getNewStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]> {
      return this.movieDataSource.getNewStreamingMovies(params);
   }

   getUpcomingStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]> {
      return this.movieDataSource.getUpcomingStreamingMovies(params);
   }
}
