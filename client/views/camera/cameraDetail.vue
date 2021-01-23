<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        视频详情
      </template>
    </NavBar>
    <van-row>
      <van-col span="24">
        <video src="https://v-cdn.zjol.com.cn/276990.mp4" controls muted autoplay></video>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "cameraDetail",
  components: {
    NavBar
  }
}
</script>

<style scoped>
video {
  width: 100%;
}
</style>
