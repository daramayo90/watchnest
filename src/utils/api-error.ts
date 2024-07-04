export interface IErrorCode {
   message: string;
   code: number;
   status: number;
}

export class APIError extends Error {
   public errorCode: number;
   public errorType: string;

   constructor(error: IErrorCode, errorType: string) {
      super();
      this.errorCode = error.code;
      this.errorType = errorType;
      Error.captureStackTrace(this, this.constructor);
   }
}
