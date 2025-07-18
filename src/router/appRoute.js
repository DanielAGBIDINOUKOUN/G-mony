export default [
 {
 path: '/',
 component: () => import('../pages/HomePage.vue'),
 meta: {requiresGuest: true, title: 'Acceuil'},

},
 {
 path: '/about',
 component: () => import('../pages/AboutPage.vue'),
  meta: {requiresAuth: true, title: 'A propos'}
 },
  {
 path: '/dashbord',
 component: () => import('../pages/DashBord.vue'),
  meta: {requiresAuth: true, title: 'Tableau De Bord'}
 },
  {
 path: '/stats',
 component: () => import('../pages/StatsPage.vue'),
  meta: {requiresAuth: true, title: 'Statistique'}
 },
  {
 path: '/transaction',
 component: () => import('../pages/TransactionPage.vue'),
  meta: {requiresAuth: true, title: 'Transaction'}
 }
]
