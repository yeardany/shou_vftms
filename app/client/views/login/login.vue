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
    </van-form>
  </section>
</template>

<script>

import Vue from "vue";
import axios from "axios";
import api from "../../../config/api";

export default {
  name: 'login',
  data() {
    return {
      phone: '13812345678',
      pattern: /^1[3456789]\d{9}$/,
      password: '123',
      value: '',
      areas: new Map([["桑沟湾", "sgw"], ["獐子岛", "zzd"]]),
      showPicker: false,
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
        let [{"_id": id = null, "uRole": role, "uName": name}] = res.data

        if (id === null)
          throw {'message': '登录失败'}
        else {
          Vue.prototype.$uRole = role
          Vue.prototype.$uName = name
          this.$router.push('/home')
        }

      }).catch((e) => {
        this.$notify({type: 'warning', message: '登录失败', duration: 1500});
      })
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
