import Vue from 'vue'
import Router from 'vue-router'
import home from '../view/home/homepage.vue'
import login from '../view/login/login.vue'
import register from '../view/login/register.vue'
import userInfo from '../view/login/userInfo.vue'
import development from '../view/backStage/development.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/development',
      name: 'development',
      component: development,
      
    },
  ]
})
