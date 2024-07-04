import { MovieEntity } from '../../domain';
import { StreamingMoviesParams } from '../../types';

export abstract class MovieRepository {
   abstract getMovieById(id: string): Promise<MovieEntity>;
   abstract searchMoviesByTitle(title: string): Promise<MovieEntity[]>;
   abstract getPopularMovies(page: string): Promise<MovieEntity[]>;
   abstract getNewStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]>;
   abstract getUpcomingStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]>;
}
