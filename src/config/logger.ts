import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, splat, printf } = format;

export const log = createLogger({
   level: 'info',
   format: combine(
      colorize(),
      timestamp(),
      splat(),
      printf(({ timestamp, message }) => {
         return `${timestamp}: ${message}`;
      }),
   ),
   transports: [
      // new transports.Console(),
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/combined.log' }),
   ],
});
