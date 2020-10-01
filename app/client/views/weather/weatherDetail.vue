<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        天气详情
      </template>
    </NavBar>
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" v-for="(item,index) in weatherData" :key="index" :text="item"/>
    </van-grid>
  </div>
</template>

<script>

import NavBar from '../../layout/NavBar.vue'
import {Toast} from 'vant';
import axios from 'axios'

export default {
  name: 'weatherDetail',
  data() {
    return {
      url: "https://api.openweathermap.org/data/2.5/weather?q=dalian&units=metric&appid=613b47c5a51043bd451b4c924f240fb5",
      weatherData: {}
    }
  },
  components: {
    NavBar
  },
  mounted() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });
    axios.get(this.url).then((d) => {
      Toast.clear()
      let data = d.data
      this.weatherData =
        [
          '城市：' + data["name"],
          "天气：" + data["weather"][0]["description"],
          "温度：" + data["main"]["temp"] + "°C",
          "湿度：" + data["main"]["humidity"] + "RH%",
          "气压：" + data["main"]["pressure"] + "HPa",
          "风速：" + data["wind"]["speed"] + "m/s"
        ]
    })
  }
}
</script>

<style scoped>
</style>
