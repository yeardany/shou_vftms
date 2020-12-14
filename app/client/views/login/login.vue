<template>
  <section>
    <van-nav-bar
      title="登录"
      right-text="注册"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="在此输入"
        :rules="[{pattern,required: true, message: '请正确填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="在此输入"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="区域"
        placeholder="点击选择"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <!--    弹出说明-->
      <div style="margin: 16px;">
        <van-button round block type="warning" @click="showPopup">
          必看说明
        </van-button>
      </div>
    </van-form>
    <!--    弹出说明-->
    <van-popup v-model="popUp" position="bottom" :style="{ height: '30%' }">
      登录账号：
      <van-row>
        <van-col span="12">13811111111</van-col>
        <van-col span="4">123</van-col>
        <van-col span="4">桑沟湾</van-col>
        <van-col span="4">管理员</van-col>
      </van-row>
      <van-row>
        <van-col span="12">13822222222</van-col>
        <van-col span="4">123</van-col>
        <van-col span="4">桑沟湾</van-col>
        <van-col span="4">用户</van-col>
      </van-row>
      <van-row>
        <van-col span="12">13833333333</van-col>
        <van-col span="4">123</van-col>
        <van-col span="4">獐子岛</van-col>
        <van-col span="4">管理员</van-col>
      </van-row>
      <van-row>
        <van-col span="12">13844444444</van-col>
        <van-col span="4">123</van-col>
        <van-col span="4">獐子岛</van-col>
        <van-col span="4">用户</van-col>
      </van-row>
    </van-popup>
  </section>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import api from "../../../config/api";
import ModuleSet from "../../../config/moduleSet";

export default {
  name: 'login',
  data() {
    return {
      phone: '13811111111',
      pattern: /^1[3456789]\d{9}$/,
      password: '123',
      value: '',
      areas: new Map([["桑沟湾", "sgw"], ["獐子岛", "zzd"]]),
      roleTxt: {
        user: '养殖员',
        admin: '管理员'
      },
      showPicker: false,
      popUp: false,
    };
  },
  methods: {
    onConfirm(value) {
      this.value = value;
      Vue.prototype.$areaID = this.areas.get(value)
      this.showPicker = false;
    },
    onSubmit(values) {
      if (!this.areas.has(this.value)) return

      axios.post(api.api.login, {uName: this.phone, uPassword: this.password, aId: this.$areaID}).then((res) => {
        let [{"_id": id = null, "uRole": role, "uName": name, "aId": aId}] = res.data

        if (id === null)
          throw {'message': '登录失败'}
        else {
          Vue.prototype.$uRole = role
          Vue.prototype.$uName = name
        }
        return axios.post(api.api.getModuleSet, {uRole: role, aId: aId})
      }).then((res) => {
        let {home = [], camera = [], environmentDetail = []} = res.data
        if (home === [] || camera === [] || environmentDetail === []) throw {error: ''}
        new ModuleSet().sets = res.data
        this.$notify({type: 'primary', message: `欢迎，${this.roleTxt[this.$uRole]}:${this.$uName}`});
        this.$router.push(home[0].to)
      }).catch((e) => {
        this.$notify({type: 'warning', message: '登录失败', duration: 1500});
      })
    },
    showPopup() {
      this.popUp = true;
    }
  },
  computed: {
    columns() {
      return [...this.areas.keys()]
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
</style>
