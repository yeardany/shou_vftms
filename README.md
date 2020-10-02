## 前情提要
+ `shou_vftms` 为 `cordova` 目录
+ `app` 为应用开发主目录

## 安装依赖
`shou_vftms` 目录下：
+ `node@12.14.0`
+ `npm install -g webpack@3.12.0 cordova@8.1`
+ 安装 `Java`，配置环境变量
+ `Android Studio` sdk版本为 Android 9，配置环境变量 `ANDROID_SDK_ROOT`
+ 安装 `gradle`
+ `cordova platform add android@8.0` 第一次添加可能会报插件添加错误，删除 `plugins` 中内容后 `cordova platform remove android` 再重新添加即可

## 开发预览
+ `cd app && npm install`
+ `npm run dev`
+ 浏览器打开 `127.0.0.1:8000`

## 上线编译
+ `cd app && npm run build`
+ 修改 `platforms` 目录下 `build.gradle`
+ `cd .. && cordova build android` 或 使用 `Android Studio` 打开 `platforms` 下的 `android`
