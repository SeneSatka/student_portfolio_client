import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/pages/HomePage.vue')
    },
    {
      path: '/portfolio/:process',
      name: 'portfolio',
      component: () => import('../views/pages/PortfolioPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/pages/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/LoginPage.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/pages/HomePage.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('../views/static/404Page.vue')
    }
  ]
})
const lngs = {
  'tr-TR': {
    home: 'Ana Sayfa',
    portfolio: 'Portföy',
    404: 'Sayfa bulunamadı',
    register: 'Kaydol',
    login: 'Giriş Yap'
  },
  'en-US': {
    home: 'Home',
    portfolio: 'Portfolio',
    404: 'Page not found',
    register: 'Register',
    login: 'Login'
  }
}

router.beforeEach((to, from, next) => {
  if (to.name == 'logout') {
    localStorage.removeItem('token')
    return next('/')
  }
  document.title = `${lngs[navigator.language ?? 'en-US'][to.name]}`
  next()
})
export default router
