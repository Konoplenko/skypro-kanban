import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CardView from '../views/CardView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },
  {
    path: '/card/:id',
    name: 'card',
    component: CardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/exit',
    name: 'exit',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('userInfo')
      next('/login')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (to.meta.requiresAuth && !userInfo) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && userInfo) {
    next('/')
  } else {
    next()
  }
})

export default router
