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
        async register(payload: {email: string, password: string, mobile: string, username: string}){
            /* Tenemos que registrar a los usuarios, utilizamos 
            axios para hacer una peticion post a la ruta /api/register
             mandandole como payload el email y la contraseña */
            const {data} = await axios.post("http://localhost:3000/api/auth/register", payload)
            
            
            this.user.email = data.user.email
            this.user.token = data.token
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
            
            
            const { data } = await axios.post("http://localhost:3000/api/auth/login", payload)
            if (data.message === 'Network Error') {
                console.log("Erorraco")
            }
            console.log(data)
            this.imageUrl = data.updateuser.image
            this.user.email = data.updateuser.email
            this.user.token = data.token
            console.log(this.user)
            localStorage.setItem('user', JSON.stringify(this.user));
            router.push("/boards")
        },
        logout() {
                localStorage.removeItem('user');
                this.user.email = null;
                this.user.token = null;
                location.href = "/login"
        }
    }
})