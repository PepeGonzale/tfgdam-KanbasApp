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
    loading: boolean;
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
        selectedUser: '',
        loading: false
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
             this.loading = true
            const {data} = await axios.post("http://localhost:3000/api/auth/register", payload)
            console.log(data)
            if (data.success) {

                this.user.email = data.user.user.email
                this.user.token = data.user.token

           
            }
            setTimeout(() => {
                localStorage.setItem('user', JSON.stringify(this.user))
                router.push("/")
                this.loading = false
            }, 2000)
            return data
        },
        async listUsers(email: any) {
            const getUsers = await axios.get(`http://localhost:3000/api/auth/find/user?email=${email}`)
            
            
            this.allUsers = getUsers.data
            console.log(this.allUsers)
            return getUsers
          },
        async login (payload: {email: string, password: string}) {
            
            this.loading = true
            const { data } = await axios.post("http://localhost:3000/api/auth/login", payload)
            console.log(data)
            if (data.success) {
            this.userData.imageUrl = data.user.updateuser.image
            this.user.email = data.user.updateuser.email
            this.userData._id = data.user.updateuser._id
            this.user.token = data.user.token
            
            
            }
            setTimeout(() => {
                this.loading = false
                localStorage.setItem('user', JSON.stringify(this.user));
            router.push("/")
            }, 1000)
            return data
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