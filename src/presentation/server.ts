import express, { Router } from 'express';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import { apiLimiter, languageMiddleware, LocaleMiddleware } from './middlewares';

interface Options {
   port: number;
   routes: Router;
}

declare module 'express-session' {
   interface SessionData {
      language: string;
      locale: string;
   }
}

export class Server {
   private app = express();
   private readonly port: number;
   private readonly routes: Router;

   constructor(options: Options) {
      const { port, routes } = options;

      this.port = port;
      this.routes = routes;
   }

   async start() {
      // Middlewares
      this.app.use(express.json()); // raw
      this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
      this.app.use(compression());
      this.app.use(cors());
      this.app.use(
         session({
            secret: '89a67db6e882fe1c061e291f18fac5af4b4e7f6032f0fa91117623ef596032f1',
            resave: false,
            saveUninitialized: true,
         }),
      );
      this.app.use(languageMiddleware);
      this.app.use(LocaleMiddleware);

      // Routes
      this.app.use('/api/', apiLimiter);
      this.app.use('/api', this.routes);

      this.app.listen(this.port, () => {
         console.log(`Server running on port ${this.port}`);
      });
   }
}
