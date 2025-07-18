import { createRouter, createWebHistory } from 'vue-router'
import authRoute from './authRoute'
import appRoute from './appRoute'
import { useAuthStore } from '../stores/useAuthStore';

const routes = [
  ...authRoute,
  ...appRoute,
  { path: '/:pathMatch(.*)*', component: () => import("../pages/NotFound404.vue"),
  meta: {requiresGuest: true, title: '404',layout: 'auth'}
 }
]

const router = createRouter({
 history: createWebHistory('/G-mony/'),
 routes
})

router.beforeEach((to,_,next) =>{
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})
export default router
