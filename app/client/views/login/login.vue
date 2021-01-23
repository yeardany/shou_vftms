<template>
  <section>
    <van-nav-bar title="登录"/>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="在此输入"
        :rules="[{pattern,required: true, message: '请正确填写手机号' }]"
      />
      <van-field
        readonly
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="在此输入"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        readonly
        v-model="value"
        label="区域"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </section>
</template>

<script>

import Vue from "vue";
import ModuleSet from "../../../config/moduleSet";

export default {
  name: 'login',
  data() {
    return {
      phone: '13833333333',
      pattern: /^1[3456789]\d{9}$/,
      password: '123',
      value: '连云港海头镇',
      roleTxt: {
        user: '养殖员',
        admin: '管理员'
      }
    };
  },
  methods: {
    onSubmit() {

      let res = {
        "home": [{"id": 1, "icon": "video-o", "to": "/home/camera/equipment", "des": "在线视频"}],
        "camera": [{"title": "设备监控", "to": "equipment"}]
      }, {home} = res

      let moduleSet = new ModuleSet()
      moduleSet.areaID = 'zzd'
      moduleSet.sets = res;
      moduleSet.uName = 13833333333;
      moduleSet.uRole = 'admin';
      moduleSet.homePath = home[0].to;

      this.$notify({type: 'primary', message: `欢迎，${this.roleTxt[moduleSet.uRole]}:${moduleSet.uName}`});
      this.$router.push(home[0].to)
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>
