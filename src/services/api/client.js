// src/services/api/client.js
import axios from 'axios';
import { API_CONFIG } from './config';
import { authInterceptor, errorInterceptor } from './interceptors';

/**
 * Creates configured Axios instance with interceptors
 * @returns {import('axios').AxiosInstance} Configured API client
 */
export const createAPIClient = () => {
  const client = axios.create(API_CONFIG);

  client.interceptors.request.use(authInterceptor);
  client.interceptors.response.use(
    response => response,
    errorInterceptor
  );

  return client;
};
