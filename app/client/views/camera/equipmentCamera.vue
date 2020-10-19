<template>
  <van-grid :column-num="2" :gutter="10" :border="true" :clickable="true">
    <van-grid-item
      icon="desktop-o"
      text="海上设备仪器1号" to="/Map"/>
    <van-grid-item
      icon="desktop-o"
      text="海上设备仪器2号" to="/Map"/>
  </van-grid>
</template>

<script>

export default {
  name: "equipmentCamera",
  methods: {}
}
</script>

<style scoped>

</style>
