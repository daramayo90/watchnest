export const ErrorCode = {
   NOT_FOUND: {
      message: 'Resource not found.',
      code: 1011,
      status: 404,
   },

   INTERNAL_ERROR: {
      message: 'Internal server error.',
      code: 1010,
      status: 500,
   },

   NETWORK_ERROR: {
      message: 'Network error, no response received from server.',
      code: 1001,
      status: 503,
   },

   GENERAL_ERROR: {
      message: 'An unexpected error occurred.',
      code: 1000,
      status: 500,
   },

   TOO_MANY_REQUESTS: {
      message: 'Too many requests. Please try again later.',
      code: 1014,
      status: 429,
   },
};
