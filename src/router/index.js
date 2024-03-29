import Vue from 'vue'
import Router from 'vue-router'
import home from '../view/home/homepage.vue'
import login from '../view/login/login.vue'
import register from '../view/login/register.vue'
import userInfo from '../view/login/userInfo.vue'
import development from '../view/backStage/development.vue'
import articla from '../view/article/writeArticla.vue'
import bokeDetail from '../view/article/bokeDetail.vue'
import test from '../view/webStudyDedicated/test.vue'



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
    {
      path: '/articla',
      name: 'articla',
      component: articla,
    },
    {
      path: '/bokeDetail',
      name: 'bokeDetail',
      component: bokeDetail,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
  ]
})
