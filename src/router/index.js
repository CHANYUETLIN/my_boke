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
import gamesIndex from '../view/games/gamesIndex.vue'
import gameLogin from '../view/games/gameLogin/login.vue'
import gameRegister from '../view/games/gameLogin/register.vue'
import gameUserInfo from '../view/games/gameUserInfo/userInfo.vue'



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
    {
      path: '/gamesIndex',
      name: 'gamesIndex',
      component: gamesIndex,
    },
    {
      path: '/gamesIndex/gameLogin',
      name: 'gameLogin',
      component: gameLogin,
    },
    {
      path: '/gamesIndex/gameRegister',
      name: 'gameRegister',
      component: gameRegister,
    },
    {
      path: '/gamesIndex/gameUserInfo',
      name: 'gameUserInfo',
      component: gameUserInfo,
    },
  ]
})
