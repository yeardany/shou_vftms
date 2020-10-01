<template>
  <van-grid :gutter="10" :column-num="3" clickable>
    <van-grid-item icon="tv-o" v-for="(item,index) in list"
                   :key="index"
                   :text="item.name"
                   @click="cameraDetail"/>
  </van-grid>
</template>

<script>
export default {
  name: "islandCamera",
  data() {
    return {
      list: [
        {id: '0', name: '岛屿站房左后'},
        {id: '1', name: '岛屿站房右后'},
        {id: '2', name: '岛屿右前方球机'},
        {id: '3', name: '岛屿站房左前方'}
      ]
    }
  },
  methods: {
    cameraDetail() {
      this.$router.push('/cameraDetail')
    }
  }
}
</script>

<style scoped>

</style>
