import { Request, Response, NextFunction } from 'express';
import { localeContext } from '../../context';

export const LocaleMiddleware = (req: Request, res: Response, next: NextFunction) => {
   if (req.session.locale) {
      localeContext.setLocale(req.session.locale);
   } else {
      localeContext.setLocale('AR');
   }

   next();
};
