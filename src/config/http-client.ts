import { TmdbApiService } from '../presentation/services/tmdb-service';
import { APIError, ErrorCode } from '../utils';
import { log } from './logger';

const api = new TmdbApiService();

export const httpClient = {
   get: async (url: string, config?: any) => {
      try {
         const { data } = await api.get(url, config);
         return data;
      } catch (error: any) {
         handleError(error);
      }
   },

   post: async (url: string, body: any) => {
      throw new Error('Not implemented');
   },

   put: async (url: string, body: any) => {
      throw new Error('Not implemented');
   },

   delete: async (url: string) => {
      throw new Error('Not implemented');
   },
};

const handleError = (error: any): void => {
   if (error.response) {
      const errorMsg = error.response.data.status_message;

      if (error.response.status === 404) {
         log.error(`Error ${ErrorCode.NOT_FOUND.code} - Not Found: ${errorMsg}`);
         throw new APIError(ErrorCode.NOT_FOUND, errorMsg);
      }

      log.error(`HTTP Error ${ErrorCode.INTERNAL_ERROR.code}: ${errorMsg}`);
      throw new APIError(ErrorCode.INTERNAL_ERROR, errorMsg);
   } else if (error.request) {
      log.error(`Network Error ${ErrorCode.NETWORK_ERROR.code}: No response received from server`);
      throw new APIError(ErrorCode.NETWORK_ERROR, 'No response received from server');
   } else {
      log.error(`General Error ${ErrorCode.GENERAL_ERROR.code}: ${error.message}`);
      throw new APIError(ErrorCode.GENERAL_ERROR, error.message);
   }
};
