import { Router } from 'express';
import { MoviesRoutes } from './movies';
import { LanguagesRoutes } from './languages';

export class AppRoutes {
   static get routes(): Router {
      const router = Router();

      router.use('/languages', LanguagesRoutes.routes);
      router.use('/locale', LanguagesRoutes.routes);

      router.use('/movies', MoviesRoutes.routes);

      return router;
   }
}
