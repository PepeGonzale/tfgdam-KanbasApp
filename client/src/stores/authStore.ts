import { defineStore } from "pinia";
import axios from "axios"

export const authStore = defineStore('auth',  {
    state: () => ({

    }),
    actions: {
        async register(payload: {email: string, password: string}){
            /* Tenemos que registrar a los usuarios, utilizamos 
            axios para hacer una peticion post a la ruta /api/register
             mandandole como payload el email y la contraseña */
            const res = axios.post("http://localhost:3000/api/auth/register", payload)
            console.log(res)
            return payload
            
        }
    }
})