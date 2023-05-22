import axios from 'axios';
import config from '@/config/config';
import { authStore } from '@/stores/auth/authStore';
/* Importamos variable de entorno */
const BASE_URL = config.URL_BACKEND;
const api = axios.create({
    baseURL: BASE_URL + "/api/boards",
})

api.interceptors.request.use((config) => {
    const useAuthStore = authStore();
    /* Añadimo el Bearer Token en todas las rutas de board */
    config.headers.Authorization =
      useAuthStore.user.token && `Bearer ${useAuthStore.user.token}`;
    config.headers.Accept = 'application/json';
    return config;
  });


export {api}

