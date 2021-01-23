<template>
  <section>
    <van-nav-bar
      title="注册"
      right-text="登录"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="在此输入"
        :rules="[{validator:pattern_phone,required: true, message: '请正确填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="输入3-11位数字和字母组成的密码"
        :rules="[{validator:pattern_pwd, required: true, message: '请填写3-11位由数字和字母组成的密码' }]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{validator: confirmPwd, required: true, message: '请确认密码一致' }]"
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
      <van-field
        readonly
        clickable
        name="picker2"
        :value="value2"
        label="角色"
        placeholder="点击选择"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </section>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import api from "../../../config/api";
import ModuleSet from "../../../config/moduleSet";

export default {
  name: 'registration',
  data() {
    return {
      phone: '',
      password:'',
      password2: '',
      value: '',
      value2: '',
      areas: new Map([["桑沟湾", "sgw"], ["獐子岛", "zzd"]]),
      roles: new Map([["养殖员","yzy"],["管理员","gly"]]),
      roleTxt: {
        user: '养殖员',
        admin: '管理员'
      },
      showPicker: false,
      showPicker2: false,
      popUp: false,
    };
  },
  methods: {
    pattern_phone(val) {
      return /^1[3456789]\d{9}$/.test(val);
    },
    pattern_pwd(val) {
      return /^[0-9|a-z|A-Z]{3,11}$/.test(val);
    },
    confirmPwd(val) {
      return val === this.password
    },
    onConfirm(value) {
      this.value = value;
      Vue.prototype.$areaID = this.areas.get(value)
      this.showPicker = false;
    },
    onConfirm2(value) {
      this.value2 = value;
      Vue.prototype.$areaID = this.roles.get(value)
      this.showPicker2 = false;
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
    },
    columns2(){
      return [...this.roles.keys()]
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
</style>
