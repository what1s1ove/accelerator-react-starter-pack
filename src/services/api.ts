import axios from 'axios';
import { BACKEND_URL, TIMEOUT } from 'constants/backend';

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: TIMEOUT,
});

export default api;
