import { Router } from 'express';
import { MovieDataSourceImpl, MovieRepositoryImpl } from '../../infrastructure';
import { CacheService } from '../services';
import { MoviesController } from './';

export class MoviesRoutes {
   static get routes() {
      const router = Router();

      const cacheService = new CacheService();
      const datasource = new MovieDataSourceImpl();
      const movieRepository = new MovieRepositoryImpl(datasource);
      const controller = new MoviesController(movieRepository, cacheService);

      router.get('/movie/:id', controller.getMovie.bind(controller));
      router.get('/search', controller.searchMovies.bind(controller));
      router.get('/popular', controller.getPopularMovies.bind(controller));
      router.get('/new-streaming-movies', controller.getNewStreamingMovies.bind(controller));
      router.get('/new-upcoming-movies', controller.getUpcomingStreamingMovies.bind(controller));

      return router;
   }
}
