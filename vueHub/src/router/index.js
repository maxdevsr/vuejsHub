import { createRouter, createWebHistory } from 'vue-router'

const token = JSON.parse(localStorage.getItem("@atriaToken"));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/login',
      name: 'Login',
      component:() => import('../views/Login.vue') 
    },
    {
      path: '/register',
      name: 'Register',
      component:() => import('../views/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: token ? () => import('../views/Dashboard.vue') : () => router.push("/login")
    },
{
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Login.vue')
,}
  ]
})

export default router
