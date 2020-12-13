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
import ModuleSet from "../../../config/moduleSet";

export default {
  name: "camera",
  data() {
    return {
      active: 0,
      tabList: new ModuleSet().sets.camera
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
