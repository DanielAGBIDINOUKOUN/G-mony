export default [
 {
 path: '/login',
 component: () => import('../pages/LoginPage.vue'),
 meta: {requiresGuest: true, title: 'Connexion',layout: 'auth'}
},
 {
 path: '/register',
 component: () => import('../pages/RegisterPage.vue'),
  meta: {requiresGuest: true, title: 'Inscription',layout: 'auth'}
 }
]
