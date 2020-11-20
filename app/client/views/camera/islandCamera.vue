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
        {id: '0', name: '海参育苗基地'},
        {id: '1', name: '鲍鱼育苗基地'}
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
