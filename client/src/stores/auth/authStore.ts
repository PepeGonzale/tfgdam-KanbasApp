import { defineStore } from "pinia";
import router from "@/router";
import type { ChangePassword } from "@/types/types";
import { auth } from "@/helpers/auth";

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
    },
    actions: {
        async fetchUserInfo() {
            const email = this.user.email;
            const res = await auth.get(`find/user/${email}`);
            this.userData.imageUrl = res.data.image;
            this.userData.email = res.data.email;
            this.userData.username = res.data.username;
            this.userData._id = res.data._id;
        },
        async register(payload: {email: string, password: string, mobile: string, username: string}){
            this.loading = true
            try {
                const {data} = await auth.post("/register", payload)
                if (data.success) {
                    this.user.email = data.user.user.email
                    this.user.token = data.user.token
                    localStorage.setItem('user', JSON.stringify(this.user))
                    router.push("/")
                }
                return data
            } catch (err: any) {
                const msg = err.response?.data?.error || 'Registration failed'
                return { success: false, error: msg }
            } finally {
                this.loading = false
            }
        },
        async listUsers(email: any) {
            const getUsers = await auth.get(`/find/user?email=${email}`)
            
            
            this.allUsers = getUsers.data
            console.log(this.allUsers)
            return getUsers
          },
        async login (payload: {email: string, password: string}) {
            this.loading = true
            try {
                const { data } = await auth.post("/login", payload)
                if (data.success) {
                    this.userData.imageUrl = data.user.updateuser.image
                    this.user.email = data.user.updateuser.email
                    this.userData._id = data.user.updateuser._id
                    this.user.token = data.user.token
                    localStorage.setItem('user', JSON.stringify(this.user))
                    router.push("/")
                }
                return data
            } catch (err: any) {
                const msg = err.response?.data?.error || 'Login failed'
                return { success: false, error: msg }
            } finally {
                this.loading = false
            }
        },
        async changeUserPassword(payload: ChangePassword) {
            const token = JSON.parse(localStorage.getItem('user') || "error");
            const {data} = await auth.post(`/user/password`, payload, {headers: {
                Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
              }})
            console.log(data);
            
        },
        async updateUsers(payload: any) {
            const {data} = await auth.post(`/update/${payload._id}`, payload)
        },
        logout() {
                localStorage.removeItem('user');
                this.user.email = null;
                this.user.token = null;
                location.href = "/login"
        }
    }
})