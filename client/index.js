import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import VueSocketIO from 'vue-socket.io'
import App from './app.vue'
import createRouter from './router/router'
import api from '../config/api'
import 'vant/lib/index.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'

Vue.use(VueRouter)
Vue.use(Vant);
Vue.use(new VueSocketIO({
  debug: false,
  connection: api.socketAddress
}))

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root);
