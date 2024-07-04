import { Request, Response, NextFunction } from 'express';
import { languageContext } from '../../context';

export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
   if (req.session.language) {
      languageContext.setLanguage(req.session.language);
   } else {
      languageContext.setLanguage('en');
   }

   next();
};
