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
        {title: '巡检名称', detail: this.$route.params.name},
        {title: '体长', detail: `${this.$route.params.length} cm`},
        {title: '体重', detail: `${this.$route.params.weight} kg`},
        {title: '备注', detail: this.$route.params.other}
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
