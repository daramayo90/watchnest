import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { envs, log } from '../../config';
import { languageContext, localeContext } from '../../context';

export class TmdbApiService {
   private axiosInstance: AxiosInstance;
   private readonly url: string = envs.TMDB_API_URL;
   private readonly accessToken: string = envs.TMDB_ACCESS_TOKEN;

   constructor() {
      this.axiosInstance = axios.create({
         baseURL: this.url,
         headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json;charset=utf-8',
         },
      });

      this.axiosInstance.interceptors.request.use(
         (config) => {
            log.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);

            const language = languageContext.getLanguage();
            const locale = localeContext.getLocale();
            config.params = config.params || {};
            config.params['language'] = language;
            config.params['watch_region'] = locale;

            return config;
         },
         (error) => {
            log.error(`Error Request: ${error.message}`);
            return Promise.reject(error);
         },
      );

      this.axiosInstance.interceptors.response.use(
         (response) => {
            log.info(`Response: ${response.status} ${response.config.url}`);
            return response;
         },
         (error) => {
            log.error(`Error Response: ${error.message}`);
            return Promise.reject(error);
         },
      );
   }

   public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
      return await this.axiosInstance.get(url, config);
   }

   public async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
      return this.axiosInstance.post(url, data, config);
   }

   public async put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
      return this.axiosInstance.put(url, data, config);
   }

   public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
      return this.axiosInstance.delete(url, config);
   }
}
