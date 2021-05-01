import Vue from 'vue'
import VueRouter from 'vue-router'
import menuList from '../views/menuList.vue'
import menuManage from '../views/menuManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: menuList
  },
  {
    path: '/manage',
    component: menuManage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
