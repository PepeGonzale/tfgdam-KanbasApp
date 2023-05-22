import axios from 'axios';
import config from '@/config/config';
import { authStore } from '@/stores/auth/authStore';
/* Importamos variable de entorno */
const BASE_URL = config.URL_BACKEND;
const auth = axios.create({
    baseURL: BASE_URL + "/api/auth",
})


export {auth}

