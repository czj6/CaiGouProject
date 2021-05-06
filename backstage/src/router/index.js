import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/orderlist'
import login from '../views/login'
import login from '../views/orderdetails'
Vue.use(VueRouter)

const routes = [{
  
    
        path: '/login',
        component: login
    },
    {
  
    
        path: '/orderlist',
        component: login
    },
    {
  
    
        path: '/orderdetails',
        component: login
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router