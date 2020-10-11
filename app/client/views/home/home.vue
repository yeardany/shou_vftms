<template>
  <div>
    <van-skeleton :row="10" :loading="loading">
      <router-view></router-view>
    </van-skeleton>
    <van-tabbar route>
      <van-tabbar-item icon="video-o" replace :to="toPath">在线视频</van-tabbar-item>
      <van-tabbar-item icon="fire-o" replace to="/home/environment">水质环境</van-tabbar-item>
      <van-tabbar-item icon="notes-o" replace to="/home/inspect">生长巡检</van-tabbar-item>
      <van-tabbar-item icon="flower-o" replace to="/home/weather">基地气象</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      toPath: '/home/camera/fishery'
    }
  },
  components: {},
  computed: {},
  methods: {
    go() {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.loading = false;
  },
  watch: {
    $route(to, from) {
      if (to.fullPath === '/home/camera/fishery' || to.fullPath === '/home/camera/island' || to.fullPath === '/home/camera/equipment')
        this.toPath = to.fullPath
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>


