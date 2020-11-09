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
    <div class="hxp-weather1 ">

      <div class="hxp-weather-header">
        <!--      <img src="../../assets/images/weather_icon_qing.jpg" class="hxp-weather-header-left">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[0]">{{ item }}</li>
          </ol>
        </div>
      </div>
      <div class="text-center hxp-weather-footer1">
        <div class="hxp-weather-footer1-left">
          <ol>
            <li v-for="item in weatherData[1]">{{ item.day + item.wea + item.tem }}</li>
          </ol>
        </div>
        <div class="hxp-weather-footer1-right">
          <ol>
            <li v-for="item in weatherData[1]">{{ item.win + item.win_speed }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[2]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[3]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[4]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[5]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[6]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="hxp-weather2 ">
      <div class="hxp-weather-header">
        <!--              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">-->
        <div class="hxp-weather-header-right">
          <ol>
            <li v-for="item in weatherData[7]">{{ item }}</li>
          </ol>
        </div>
      </div>
    </div>
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
      url: "https://www.tianqiapi.com/api?version=v1&appid=52924758&appsecret=dtZx2xcn&cityid=101020100",
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
          ["日期：" + data["data"][0]["date"],
            "天气：" + data["data"][0]["wea"],
            "温度：" + data["data"][0]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
            "风向：" + data["data"][0]["win"]],
          data["data"][0]["hours"],
          ["日期：" + data["data"][1]["date"],
            "天气：" + data["data"][1]["wea"],
            "温度：" + data["data"][1]["tem2"] + "~" + data["data"][1]["tem1"] + "°C",
            "风向：" + data["data"][1]["win"]],
          ["日期：" + data["data"][2]["date"],
            "天气：" + data["data"][2]["wea"],
            "温度：" + data["data"][2]["tem2"] + "~" + data["data"][2]["tem1"] + "°C",
            "风向：" + data["data"][2]["win"]],
          ["日期：" + data["data"][3]["date"],
            "天气：" + data["data"][3]["wea"],
            "温度：" + data["data"][3]["tem2"] + "~" + data["data"][3]["tem1"] + "°C",
            "风向：" + data["data"][3]["win"]],
          ["日期：" + data["data"][4]["date"],
            "天气：" + data["data"][4]["wea"],
            "温度：" + data["data"][4]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
            "风向：" + data["data"][4]["win"]],
          ["日期：" + data["data"][5]["date"],
            "天气：" + data["data"][5]["wea"],
            "温度：" + data["data"][5]["tem2"] + "~" + data["data"][5]["tem1"] + "°C",
            "风向：" + data["data"][5]["win"]],
          ["日期：" + data["data"][6]["date"],
            "天气：" + data["data"][6]["wea"],
            "温度：" + data["data"][6]["tem2"] + "~" + data["data"][6]["tem1"] + "°C",
            "风向：" + data["data"][6]["win"]]
        ]
    })
  }
}
</script>


<style scoped>

* {
  padding: 0px;
  margin: 0px;
}

ol li,
ul li {
  list-style: none;
}

/* --------------天气卡片区------------ */
.hxp-weather1 {
  margin: 1rem auto;
  color: #394568;
  background: linear-gradient(to bottom, #49d0c1 40%, #28de7f 100%);
  border-radius: 5px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 15rem;
  align-items: flex-end;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: "Open Sans", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.hxp-weather2 {
  margin: 1rem auto;
  color: #394568;
  background: linear-gradient(to bottom, #49d0c1 40%, #28de7f 100%);
  border-radius: 5px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  width: 80%;
  height: 7rem;
  align-items: flex-end;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: "Open Sans", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}

.hxp-weather-header {
  width: 100%;
  height: 7rem;
}

.hxp-weather-header-left {
  width: 50%;
  height: 7rem;
  float: left;
}

.hxp-weather-header-right {
  width: 50%;
  height: 7rem;
  float: right;
}

.hxp-weather-footer1 {
  width: 100%;
  height: 9rem;
  background: whitesmoke;
}

.hxp-weather-footer2 {
  width: 100%;
  height: 5rem;
  background: whitesmoke;
}

.hxp-weather-footer1-left {
  width: 50%;
  height: 9rem;
  float: left;
}

.hxp-weather-footer1-right {
  width: 50%;
  height: 9rem;
  float: right;
}

.hxp-weather-footer2-left {
  width: 50%;
  height: 5rem;
  float: left;
}

.hxp-weather-footer2-right {
  width: 50%;
  height: 5rem;
  float: right;
}

.text-center {
  font-size: 5px;
}


</style>
