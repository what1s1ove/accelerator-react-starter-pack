import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

type StoreCallback = () => void;

export const createAPI = (changeIsDataLoaded: StoreCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        changeIsDataLoaded();
      }

      return Promise.reject(error);
    },
  );

  return api;
};
