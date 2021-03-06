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

import {Notify, Dialog} from 'vant';

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

  confirm: function (title, msg, yes, no) {
    Dialog.confirm({
      title: title,
      message: msg,
      messageAlign: 'left'
    }).then(yes).catch(no);
  },

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

      window.codePush.checkForUpdate(this.updateCheck, this.updateOnError);

      // window.codePush.sync((status) => {
      //   switch (status) {
      //     case SyncStatus.DOWNLOADING_PACKAGE:
      //       Notify({
      //         type: 'primary',
      //         duration: 0,
      //         message: this.updateMessage
      //       });
      //       break;
      //   }
      // }, {
      //   updateDialog: {
      //     appendReleaseDescription: true,
      //     descriptionPrefix: "更新内容：",
      //     mandatoryContinueButtonLabel: "下一步",
      //     mandatoryUpdateMessage: "发现更新",
      //     optionalIgnoreButtonLabel: "取消",
      //     optionalInstallButtonLabel: "更新",
      //     optionalUpdateMessage: "有新版本可用，是否安装？\n",
      //     updateTitle: "更新提示"
      //   },
      //   installMode: InstallMode.IMMEDIATE
      // });

    }, false);
  },

  updateOnError: function (error) {
    app.notify('warning', 5000, "错误：" + error);
  },

  updateOnPackageDownloaded: function (localPackage) {
    localPackage.install(null, app.updateOnError, {
      installMode: InstallMode.IMMEDIATE,
      mandatoryInstallMode: InstallMode.ON_NEXT_RESTART
    });
  },

  updateCheck: function (remotePackage) {
    if (!remotePackage) {
      window.codePush.notifyApplicationReady()
      app.notify('primary', 2000, "已是最新版")
    } else {
      if (!remotePackage.failedInstall) {
        app.confirm(
          '更新提示',
          `有可用更新！本次更新内容：\n${remotePackage.description}\n是否更新？`,
          () => {
            remotePackage.download(app.updateOnPackageDownloaded, app.updateOnError, null)
          },
          null
        )
      } else {
        app.notify('warning', 5000, "更新失败")
      }
    }
  }
};

app.initialize();
