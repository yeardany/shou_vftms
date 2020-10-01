<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        巡检详情
      </template>
    </NavBar>
    <van-cell v-for="(item,index) in list" :key="index" :title="item.title" :value="item.detail"/>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "inspectDetail",
  data() {
    return {
      list: [
        {title: '巡检名称', detail: '0103巡检'},
        {title: '体长', detail: '12cm'},
        {title: '体重', detail: '108g'},
        {title: '备注', detail: '生长好'}
      ]
    }
  },
  methods: {},
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
