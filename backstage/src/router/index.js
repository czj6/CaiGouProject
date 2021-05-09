import Vue from 'vue'
import VueRouter from 'vue-router'
import menuList from '../views/menuList.vue'
import menuManage from '../views/menuManage.vue'
import menuDetail from '../views/menuDetail.vue'
import menuBar from '../views/menu.vue'
import login from '../views/login.vue'
import orderlist from '../views/orderlist.vue'
import orderdetail from '../views/orderdetails.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
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
  },
  {
    path: '/orderlist',
    component: orderlist
  },
  {
    path: '/orderdetail',
    component: orderdetail
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
