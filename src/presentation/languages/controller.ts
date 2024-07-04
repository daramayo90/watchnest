import { Request, Response } from 'express';

export class LanguageController {
   public static async setLanguage(req: Request, res: Response) {
      const { language } = req.body;

      if (!language) {
         return res.status(400).json({ error: 'Language is required' });
      }

      if (language.length !== 2) {
         return res.status(400).json({ error: 'Language must be exactly two characters long' });
      }

      if (!/^[a-zA-Z]+$/.test(language)) {
         return res.status(400).json({ error: 'Language must contain only letters' });
      }

      req.session.language = language.toLowerCase();

      res.status(200).json({ message: 'Language set successfully' });
   }

   public static async setLocale(req: Request, res: Response) {
      const { locale } = req.body;

      if (!locale) {
         return res.status(400).json({ error: 'Locale is required' });
      }

      if (locale.length !== 2) {
         return res.status(400).json({ error: 'Locale must be exactly two characters long' });
      }

      if (!/^[a-zA-Z]+$/.test(locale)) {
         return res.status(400).json({ error: 'Locale must contain only letters' });
      }

      req.session.locale = locale.toUpperCase();

      res.status(200).json({ message: 'Locale set successfully' });
   }
}
