import Vue from 'vue'
import VueRouter from 'vue-router'
import menuList from '../views/menuList.vue'
import menuManage from '../views/menuManage.vue'
import menuDetail from '../views/menuDetail.vue'
import menuBar from '../views/menu.vue'
import login from '../views/login.vue'
import orderlist from '../views/orderlist.vue'
import orderdetail from '../views/orderdetails.vue'
import supermarket from '../views/supermarket.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/menu/',
    component: menuBar,
    redirect: '/menu/menulist',
    children: [
      {
        path: 'menulist',
        component: menuList
      },
      {
        path: 'manage',
        component: menuManage
      },
      {
        path: 'add',
        component: () => import('../views/menuAdd.vue')
      }
    ]
  },
  {
    path: '/detail/:id',
    component: menuDetail
  },
  {
    path: '/supermarket',
    component: supermarket,
    redirect: '/supermarket/orderlist',
    children: [{
        path: 'orderlist',
        component: orderlist
      },
      {
        path: 'orderdetail/:id',
        component: orderdetail
      },{
        path: 'statistics',
        component: () => import('../views/orderStatistics.vue')
      }
    ]
  }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
