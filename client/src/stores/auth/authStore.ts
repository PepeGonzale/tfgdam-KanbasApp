import { defineStore } from "pinia";
import axios from "axios"
import router from "@/router";
import type { ChangePassword } from "@/types/types";

export interface User {
    email: string,
    username: string,
    imageUrl: string,
    _id: string
}

export interface AuthStore {
    user: {
      email: string | null;
      token: string | null;
    };
    userData:User,
    allUsers: any,
    selectedUser: string | null
  }

export const authStore = defineStore('auth',  {
    state: (): AuthStore => ({
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        userData: {
            email: '',
            username: '',
            imageUrl: '',
            _id: ''
        },
        allUsers: [],
        selectedUser: ''
    }), 
    getters: {
        isLoggedIn: (state) => !!state.user.token,
        userInfo: async (state) => {
            const email = state.user.email
            const res = await axios.get(`http://localhost:3000/api/auth/find/user/${email}`)
            .then(res => {
                console.log(res)
                state.userData.imageUrl = res.data.image
                state.userData.email = res.data.email
                state.userData.username = res.data.username
                state.userData._id = res.data._id
                
            })
            
        }
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
            this.userData.imageUrl = data.updateuser.image
            this.user.email = data.updateuser.email
            this.userData._id = data.updateuser._id
            this.user.token = data.token
            
            localStorage.setItem('user', JSON.stringify(this.user));
            router.push("/boards")
        },
        async changeUserPassword(payload: ChangePassword) {
            const token = JSON.parse(localStorage.getItem('user') || "error");
            const {data} = await axios.post(`http://localhost:3000/api/auth/user/password/${this.userData._id}`, payload, {headers: {
                Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
              }})
            console.log(data);
            
        },
        async updateUsers(payload: any) {
            const {data} = await axios.post(`http://localhost:3000/api/auth/update/${payload._id}`, payload)
        },
        logout() {
                localStorage.removeItem('user');
                this.user.email = null;
                this.user.token = null;
                location.href = "/login"
        }
    }
})