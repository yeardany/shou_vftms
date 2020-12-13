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

export default {
  name: "environmentDetail",
  data() {
    return {
      active: 0,
      tabList: [
        {title: '溶解氧', to: 'enO2'},
        {title: 'PH值', to: 'enPH'},
        {title: '水温', to: 'enTem'},
        {title: '营养盐', to: 'enNut'},
        {title: '透明度', to: 'enTsc'},
        {title: '历史', to: 'chartTest'}
      ]
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
