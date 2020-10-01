<template>
  <section>
    <van-nav-bar
      title="登录"
      right-text="注册"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
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

export default {
  name: 'login',
  data() {
    return {
      username: '13812345678',
      password: '123456',
    };
  },
  methods: {
    onSubmit(values) {
      this.$router.push('/home')
      //console.log('submit', values);
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
</style>
