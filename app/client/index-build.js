import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant'
import App from './app.vue'
import createRouter from './router/router'
import 'vant/lib/index.css'

Vue.use(VueRouter)
Vue.use(Vant);

const router = createRouter()

let app = {
  // Application Constructor
  initialize: function () {
    window.document.addEventListener('deviceready', () => {

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
            alert("JPushPlugin:registrationID is " + data)
            if (data.length === 0)
              window.setTimeout(getRegistrationID, 1000)
          } catch (exception) {
            alert("onGetReg" + exception)
          }
        });
        if (device.platform !== "Android")
          window.JPush.setApplicationIconBadgeNumber(0);
      } catch (exception) {
        console.log(exception);
      }

      window.codePush.sync(null, {
        updateDialog: true,
        installMode: InstallMode.IMMEDIATE
      });

    }, false);
  }
};

app.initialize();
