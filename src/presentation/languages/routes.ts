import { Router } from 'express';
import { LanguageController } from './';

export class LanguagesRoutes {
   static get routes() {
      const router = Router();

      router.post('/set-language', LanguageController.setLanguage);
      router.post('/set-locale', LanguageController.setLocale);

      return router;
   }
}
