import LoginPageVue from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterPageVue from "@/pages/RegisterPage.vue"

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
    }
  
  ]
})

export default router
