import Vue from 'vue'
import App from './App'
import router from './router'
import 'weui/dist/style/weui.css'
import 'weui/dist/weui.min.js'

// 引用API文件
// import api from './api/index.js'
// 将API方法绑定到全局
// Vue.prototype.$api = api;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
