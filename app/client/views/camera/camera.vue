<template>
  <div>
    <NavBar>
      <template #title>
        鲍鱼生产智慧服务平台
      </template>
    </NavBar>
    <div class="tab">
      <van-tabs v-model="active" animated swipeable color="#1989fa" sticky>
        <van-tab v-for="(item,index) in [{title:'养殖渔排监控',to:'fishery'},{title:'岛上监控',to:'island'},
        {title:'海上设备监控',to:'equipment'}]"
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
