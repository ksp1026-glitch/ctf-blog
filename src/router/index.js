import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import { isAuthenticated } from '../stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const WHITE_LIST = ['Login']

router.beforeEach((to) => {
  if (!isAuthenticated() && !WHITE_LIST.includes(to.name)) {
    return { name: 'Login' }
  }
  if (isAuthenticated() && to.name === 'Login') {
    return { name: 'Home' }
  }
})

export default router
