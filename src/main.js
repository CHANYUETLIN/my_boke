// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import cButton from './components/button.vue';
import ctab from './components/ctab.vue';
import dataBind from './common/dataBind'
import "@/assets/iconfont/iconfont.css";
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import qs from 'qs'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'	//样式


Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)    
  })
})
Vue.use(iView)
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.component('cButton',cButton)
Vue.component('ctab',ctab)

Vue.prototype.$dataBind = dataBind
Vue.prototype.$qs = qs

// ***********aixos拦截器******************************
 
// // loading框设置局部刷新，且所有请求完成后关闭loading框
// let loading
// let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
// function startLoading () {
//   loading = Vue.prototype.$loading({
//     lock: true,
//     text: '努力加载中...',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0,0,0,0)',
//     target: document.querySelector('body') // 设置加载动画区域
//   })
// }
// function endLoading () {
//   loading.close()
// }
// function showFullScreenLoading () {
//   if (needLoadingRequestCount === 0) {
//     startLoading()
//   }
//   needLoadingRequestCount++
// }
// function hideFullScreenLoading () {
//   if (needLoadingRequestCount <= 0) return
//   needLoadingRequestCount--
//   if (needLoadingRequestCount === 0) {
//     endLoading()
//   }
// }
axios.defaults.baseURL = 'http://localhost:8888'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// // axios
// // axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api' // 接口基础路径
// axios.defaults.timeout = 10000 // 超时时间 10s
// // axios.defaults.withCredentials = true // 允许设置cookie(开启的话需后端配置)
// // http请求拦截器
// axios.interceptors.request.use(config => {
//   if (config.isLoading !== false) { // 如果配置了isLoading: false，则不显示loading
//     showFullScreenLoading()
//   }
//   config.headers['Content-Type'] = 'application/json;charset=UTF-8'
//   return config
// }, error => {
//   hideFullScreenLoading()
//   return Promise.reject(error.response)
// })
// // http响应拦截器
// axios.interceptors.response.use(data => {
//   hideFullScreenLoading() // 响应成功关闭loading
//   return data
// }, error => {
//   hideFullScreenLoading()
//   let _status = error.response && error.response.status
//   if (_status === 504 || _status === 404) {
//     // 跳转404页面（目前没有，只能先跳转首页）
//     // router.push({ path: '/' })
//     console.log("响应拦截器")
//   }
//   return Promise.reject(error)
// })
Vue.prototype.$axios = axios

// ***********aixos拦截器******************************



Vue.config.productionTip = false

// 路由跳转页面固定顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
