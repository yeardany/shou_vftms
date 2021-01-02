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
        <div id="video-container"></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import EZUIKit from 'ezuikit-js';

export default {
  name: "cameraDetail",
  components: {
    NavBar
  },
  mounted() {
    var player = new EZUIKit.EZUIKitPlayer({
      id: 'video-container',
      accessToken: 'at.0j60sxlk8qdulp60dmfu4iq37co4zqpz-58fuatumre-11wpg7m-qicy7zinq',
      url: 'ezopen://open.ys7.com/109715580/1.hd.live',
      autoplay: false,
      width: window.screen.width,
      height: window.screen.width / 1280 * 720,
      template: 'standard',
      header: ['save', 'zoom', 'capturePicture']
    })
  }
}
</script>

<style scoped>
</style>
