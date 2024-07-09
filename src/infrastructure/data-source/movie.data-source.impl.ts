import { httpClient } from '../../config';
import { MovieDataSource } from '../../domain';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { StreamingMoviesParams } from '../../types';
import { getMondayOf5WeeksAgo, getSundayOf5WeeksAgo } from '../../utils';

export class MovieDataSourceImpl implements MovieDataSource {
   async getMovieById(id: string): Promise<MovieEntity> {
      const params = {
         append_to_response: 'videos,watch/providers,credits',
      };

      const movie = await httpClient.get(`/movie/${id}`, { params });

      return MovieEntity.fromObject(movie);
   }

   async searchMoviesByTitle(title: string): Promise<MovieEntity[]> {
      const params = { query: title, page: 1 };

      const { results } = await httpClient.get('/search/movie', { params });

      return results.map(MovieEntity.fromObject);
   }

   async getPopularMovies(page: string): Promise<MovieEntity[]> {
      const params = { page };

      const { results } = await httpClient.get('/movie/popular', { params });

      return results.map(MovieEntity.fromObject);
   }

   async getNewStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]> {
      const sunday = getSundayOf5WeeksAgo();

      const queryParams = {
         page: params.page,
         include_adult: false,
         include_video: false,
         sort_by: params.sortBy,
         'primary_release_date.gte': sunday,
         with_watch_providers: params.watchProviders,
      };

      const { results } = await httpClient.get('/discover/movie', { params: queryParams });

      return results.map(MovieEntity.fromObject);
   }

   async getUpcomingStreamingMovies(params: StreamingMoviesParams): Promise<MovieEntity[]> {
      const monday = getMondayOf5WeeksAgo();

      const queryParams = {
         page: params.page,
         include_adult: false,
         include_video: false,
         sort_by: params.sortBy,
         'primary_release_date.gte': monday,
         with_watch_providers: params.watchProviders,
      };

      const { results } = await httpClient.get('/discover/movie', { params: queryParams });

      return results.map(MovieEntity.fromObject);
   }
}
