import { StreamingMoviesParams } from '../../types';
import { MovieEntity } from '../entities/movie.entity';

export abstract class MovieDataSource {
   abstract getMovieById(id: string): Promise<MovieEntity>;
   abstract searchMoviesByTitle(title: string): Promise<MovieEntity[]>;
   abstract getPopularMovies(page: string): Promise<MovieEntity[]>;
   abstract getNewStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]>;
   abstract getUpcomingStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]>;
}
