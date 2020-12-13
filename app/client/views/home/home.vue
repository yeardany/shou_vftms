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

import ModuleSet from '../../../config/moduleSet'

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      tabList: []
    }
  },
  mounted() {
    this.tabList = new ModuleSet().sets.home
    this.loading = false;
  },
  watch: {
    $route(to, from) {
      if (to.fullPath === '/home/camera/fishery' || to.fullPath === '/home/camera/island' || to.fullPath === '/home/camera/equipment')
        this.tabList.map((item) => {
          if (item.id === 1)
            item.to = to.fullPath
        })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>


