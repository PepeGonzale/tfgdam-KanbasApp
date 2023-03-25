import { defineStore } from "pinia";
import axios from "axios"
import router from "@/router";
export interface AuthStore {
    user: {
      email: string | null;
      token: string | null;
    };
    imageUrl: string,
    allUsers: any,
    selectedUser: string | null
  }

export const authStore = defineStore('auth',  {
    state: (): AuthStore => ({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        imageUrl: '',
        allUsers: [],
        selectedUser: ''
    }), 
    getters: {
        isLoggedIn: (state) => !!state.user.token
    },
    actions: {
        async register(payload: {email: string, password: string}){
            /* Tenemos que registrar a los usuarios, utilizamos 
            axios para hacer una peticion post a la ruta /api/register
             mandandole como payload el email y la contraseña */
            const {data} = await axios.post("http://localhost:3000/api/auth/register", payload)
            console.log(data.user.email);
            
            this.user.email = data.user.user.email
            this.user.token = data.user.token
            localStorage.setItem('user', JSON.stringify(this.user))
            router.push("/")
        },
        async listUsers(email: any) {
            const getUsers = await axios.get(`http://localhost:3000/api/auth/find/user?email=${email}`)
            console.log(getUsers);
            
            this.allUsers = getUsers.data
            console.log(this.allUsers)
            return getUsers
          },
        async login (payload: {email: string, password: string}) {
            console.log(payload);
            
            const { data } = await axios.post("http://localhost:3000/api/auth/login", payload)
            if (data.message === 'Network Error') {
                console.log("Erorraco")
            }
            this.imageUrl = data.updateuser.image
            this.user.email = data.email
            this.user.token = data.token
            localStorage.setItem('user', JSON.stringify(this.user));
            router.push("/")
        },
        logout() {
                localStorage.removeItem('user');
                this.user.email = null;
                this.user.token = null;
                location.href = "/login"
        }
    }
})