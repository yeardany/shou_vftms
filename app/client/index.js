import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import App from './app.vue'
import createRouter from './router/router'
import 'vant/lib/index.css'
import { Card } from "vant"
import echarts from 'echarts'  //引入Echarts，

Vue.prototype.$echarts = echarts  //定义为全局变量
Vue.use(VueRouter)
Vue.use(Vant);
Vue.use(Card);

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root);
