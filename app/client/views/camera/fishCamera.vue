<template>
  <van-grid :gutter="10" :column-num="3" :clickable="true">
    <van-grid-item icon="tv-o" v-for="item in list"
                   :key="item.id"
                   :text="item.name"
                   to="/cameraDetail">
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: "fishCamera",
  data() {
    return {
      list: [
        {id: '0', name: '渔排2号'},
        {id: '1', name: '渔排1号'},
        {id: '2', name: '福鲍1号'},
        {id: '3', name: '福鲍2号'},
        {id: '4', name: '福鲍3号'},
        {id: '5', name: '福鲍5号'},
        {id: '6', name: '渔排3号'},
        {id: '7', name: '渔排4号'}
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
