import rateLimit from 'express-rate-limit';
import { APIError } from '../../utils/api-error';
import { ErrorCode } from '../../utils/error-codes';
import { log } from '../../config';

const rateLimitHandler = (req: any, res: any, next: any) => {
   log.error(`Rate limit exceeded: ${req.ip}`);
   res.status(ErrorCode.TOO_MANY_REQUESTS.status).json(
      new APIError(ErrorCode.TOO_MANY_REQUESTS, 'Rate limit exceeded.'),
   );
};

export const apiLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 15, // limit each IP to 15 requests per windowMs
   message: ErrorCode.TOO_MANY_REQUESTS.message,
   handler: rateLimitHandler,
   headers: true,
});
