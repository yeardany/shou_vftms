<template>
  <div>
    <NavBar>
      <template #title>
        智慧生态养殖在线服务平台
      </template>
    </NavBar>
    <div class="tab">
      <van-tabs v-model="active" animated swipeable color="#1989fa" sticky>
        <van-tab v-for="(item,index) in tabList"
                 :key="index"
                 :title="item.title"
                 :to="item.to">
        </van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "camera",
  data() {
    return {
      active: 0,
      tabList: [
        {title: '养殖监测点监控', to: 'fishery'},
        {title: '区域监控', to: 'island'},
        {title: '海上设备监控', to: 'equipment'}
      ]
    };
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.tab {
  margin-bottom: 12px;
}
</style>
