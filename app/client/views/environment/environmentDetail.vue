<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        水质详情
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
  name: "environmentDetail",
  data() {
    return {
      active: 0,
      tabList: new ModuleSet().sets.environmentDetail
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
