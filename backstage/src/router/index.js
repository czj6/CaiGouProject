import Vue from 'vue'
import VueRouter from 'vue-router'
import menuList from '../views/menuList.vue'
import menuManage from '../views/menuManage.vue'
import menuDetail from '../views/menuDetail.vue'
import menuBar from '../views/menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: menuList
  },
  {
    path: '/menu/',
    component: menuBar,
    children: [
      {
        path: 'menulist',
        component: menuList
      },
      {
        path: 'manage',
        component: menuManage
      }
    ]
  },
  {
    path: '/detail',
    component: menuDetail
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
