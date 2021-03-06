import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index
    },
    {
      path: '/',
      component: Login
    }
  ]
})
