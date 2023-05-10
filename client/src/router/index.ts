import LoginPageVue from '@/pages/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ResetPasswordVue from "@/pages/ResetPassword.vue"
import HomePageVue from "@/pages/HomePage.vue"
import BoardPage from "@/pages/BoardPage.vue"
import { authStore } from '@/stores/auth/authStore'
import ProfilePageVue from '@/pages/ProfilePage.vue'
import ArchivedTasksVue from '@/pages/ArchivedTasks.vue'
const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPageVue
    },
    {
      path: '/profile',
      name: "Profile",
      component: ProfilePageVue
    },
    {
      path: '/forgot',
      name: 'ResetPassword',
      component: ResetPasswordVue
    },
    {
      path: '/board/:id',
      name: 'Home',
      component: HomePageVue
    },
    {
      path: '/board/:id/archive',
      name: 'Archived',
      component: ArchivedTasksVue
    },
    {
      path: '/',
      name: 'Boards',
      component: BoardPage
    },
  
  ],

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
