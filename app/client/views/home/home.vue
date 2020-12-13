<template>
  <div>
    <van-skeleton :row="10" :loading="loading">
      <router-view></router-view>
    </van-skeleton>
    <van-tabbar route>
      <van-tabbar-item v-for="item in tabList" :key="item.id" :icon="item.icon" replace :to="item.to">{{ item.des }}
      </van-tabbar-item>
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
  computed: {
    tabList() {
      return [
        {id: 1, icon: "video-o", to: this.toPath, des: "在线视频"},
        {id: 2, icon: "fire-o", to: "/home/environment", des: "水质环境"},
        {id: 3, icon: "notes-o", to: "/home/inspect", des: "生长巡检"},
        {id: 4, icon: "flower-o", to: "/home/weather", des: "基地气象"}
      ]
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


