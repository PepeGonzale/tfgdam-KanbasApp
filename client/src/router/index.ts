import LoginPageVue from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterPageVue from "@/pages/RegisterPage.vue"
import ResetPasswordVue from "@/pages/ResetPassword.vue"
import HomePageVue from "@/pages/HomePage.vue"
import { authStore } from '@/stores/auth/authStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
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
    },
    {
      path: '/',
      name: 'Home',
      component: HomePageVue
    }
  
  ]
})
router.beforeEach((to) => {
  const publicPages = ['/login', '/register'];
  // const authRequired = !publicPages.includes(to.path);
  let authRequired = true;
  publicPages.forEach((p) => {
    if (to.path.startsWith(p)) authRequired = false;
  });
  const auth = authStore();
  if (authRequired && !auth.user.token) {
    return '/login';
  }
  if (!authRequired && auth.user.token) {
    return '/';
  }
});

export default router
