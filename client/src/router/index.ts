import LoginPageVue from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterPageVue from "@/pages/RegisterPage.vue"
import ResetPasswordVue from "@/pages/ResetPassword.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: LoginPageVue
    },
    {
      path: '/register',
      name: "Register",
      component: RegisterPageVue
    },
    {
      path: '/forgot',
      name: 'ResetPassword',
      component: ResetPasswordVue
    }
  
  ]
})

export default router
