import axios from 'axios';

const TIMEOUT = 1000;

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: TIMEOUT,
});
