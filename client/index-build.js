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

import {Notify} from 'vant';

Vue.use(VueRouter)
Vue.use(Vant);
Vue.use(new VueSocketIO({
  debug: false,
  connection: api.socketAddress
}))

const router = createRouter()

let app = {

  notify: function (type, during, msg) {
    Notify({
      type: type,
      duration: during,
      message: msg
    });
  },

  initialize: function () {
    window.document.addEventListener('deviceready', () => {

      if (device.platform === "Android") {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByName('white');
        StatusBar.styleDefault();
      }

      new Vue({
        router,
        render: (h) => h(App)
      }).$mount(root);

      window.document.addEventListener("jpush.receiveRegistrationId", () => {
      }, false);

      try {
        window.JPush.init();
        window.JPush.setDebugMode(true);
        window.JPush.getRegistrationID((data) => {
          try {
            Vue.prototype.$pushID = data
            this.notify('primary', 2000, `推送ID为：${data}`)
            if (data.length === 0)
              window.setTimeout(getRegistrationID, 1000)
          } catch (exception) {
            this.notify('warning', 5000, `onGetReg：${exception}`)
          }
        }).bind(this);
        if (device.platform !== "Android")
          window.JPush.setApplicationIconBadgeNumber(0);
      } catch (exception) {
        console.log(exception);
      }

    }, false);
  }
};

app.initialize();
