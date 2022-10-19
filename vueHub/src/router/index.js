import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
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
      component: () => import('../views/Dashboard.vue')
    },
{
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Login.vue')
,}
  ]
})

export default router
