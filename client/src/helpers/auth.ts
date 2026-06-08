import axios from 'axios';
import config from '@/config/config';
import { authStore } from '@/stores/auth/authStore';

const BASE_URL = config.URL_BACKEND;
const auth = axios.create({
  baseURL: BASE_URL + '/api/auth',
});

auth.interceptors.request.use((cfg) => {
  const store = authStore();
  if (store.user.token) {
    cfg.headers.Authorization = `Bearer ${store.user.token}`;
  }
  cfg.headers.Accept = 'application/json';
  return cfg;
});

export { auth };
