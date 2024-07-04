import { Request, Response } from 'express';
import { MovieRepository } from '../../domain';
import {
   GetMovie,
   SearchMovies,
   GetPopularMovies,
   GetNewStreamingMovies,
   GetUpcomingStreamingMovies,
} from '../../domain/use-cases';
import { CacheService } from '../services';
import { tmdbWatchProviders } from '../../utils';

export class MoviesController {
   constructor(
      private readonly movieRepository: MovieRepository,
      private cacheService: CacheService,
   ) {}

   public getMovie(req: Request, res: Response) {
      const id = req.params.id;

      if (!id) return res.status(400).json({ error: 'Missing id' });

      new GetMovie(this.movieRepository, this.cacheService)
         .execute(id)
         .then((movies) => res.status(200).json(movies))
         .catch((error) => res.status(400).json({ error }));
   }

   public searchMovies(req: Request, res: Response) {
      const title = req.query.title as string;

      if (!title) return res.status(400).json({ error: 'Missing Title' });

      new SearchMovies(this.movieRepository, this.cacheService)
         .execute(title)
         .then((movies) => res.status(200).json(movies))
         .catch((error) => res.status(400).json({ error }));
   }

   public getPopularMovies(req: Request, res: Response) {
      const { page = '1' } = req.query as { page: string };

      new GetPopularMovies(this.movieRepository, this.cacheService)
         .execute(page)
         .then((movies) => res.status(200).json(movies))
         .catch((error) => res.status(400).json({ error }));
   }

   public getNewStreamingMovies(req: Request, res: Response) {
      const { page = '1' } = req.query as { page: string };
      const { watchProviders = tmdbWatchProviders } = req.query as { watchProviders: string };
      const { groupByWeeks = false } = req.query as unknown as { groupByWeeks: boolean };
      const { sortBy = 'primary_release_date.desc' } = req.query as { sortBy: string };

      new GetNewStreamingMovies(this.movieRepository, this.cacheService)
         .execute({ page, groupByWeeks, watchProviders, sortBy })
         .then((movies) => res.status(200).json(movies))
         .catch((error) => res.status(400).json({ error }));
   }

   public getUpcomingStreamingMovies(req: Request, res: Response) {
      const { watchProviders = tmdbWatchProviders } = req.query as { watchProviders: string };

      new GetUpcomingStreamingMovies(this.movieRepository, this.cacheService)
         .execute({ watchProviders })
         .then((movies) => res.status(200).json(movies))
         .catch((error) => res.status(400).json({ error }));
   }
}
