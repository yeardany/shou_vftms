import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import App from './app.vue'
import createRouter from './router/router'
import 'vant/lib/index.css'

Vue.use(VueRouter)
Vue.use(Vant);

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root);
