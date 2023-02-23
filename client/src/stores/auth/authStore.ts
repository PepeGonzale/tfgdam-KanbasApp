import { defineStore } from "pinia";
import axios from "axios"

export interface AuthStore {
    user: {
      email: string | null;
      token: string | null;
    };
  }
export const authStore = defineStore('auth',  {
    state: (): AuthStore => ({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
    }), 
    actions: {
        async register(payload: {email: string, password: string}){
            /* Tenemos que registrar a los usuarios, utilizamos 
            axios para hacer una peticion post a la ruta /api/register
             mandandole como payload el email y la contraseña */
            const {data} = await axios.post("http://localhost:3000/api/auth/register", payload)
            this.user.email = data.user.user.email
            this.user.token = data.user.token
            localStorage.setItem('user', JSON.stringify(this.user))
        }
    }
})