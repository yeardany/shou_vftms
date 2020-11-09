<template>
  <div class="hxp-weather ">
    <div class="hxp-weather-header">
      <img src="../../assets/images/weather_icon_qing.jpg" class="hxp-weather-header-left">
      <div class="hxp-weather-header-right">
        <ol>
          <li v-for="item in weatherData[0]">{{ item }}</li>
        </ol>
      </div>
    </div>
    <div class="text-center hxp-weather-footer1">
      <div class="hxp-weather-footer1-left">
        <ol>
          <li v-for="item in weatherData[1]">{{ item }}</li>
        </ol>
      </div>
      <div class="hxp-weather-footer1-right">
        <ol>
          <li v-for="item in weatherData[2]">{{ item }}</li>
        </ol>
      </div>
    </div>
<!--    &lt;!&ndash;      </div>&ndash;&gt;-->

<!--    &lt;!&ndash;  <div class="hxp-weather ">&ndash;&gt;-->
<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[3]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer1">-->
<!--      <div class="hxp-weather-footer1-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[4]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer1-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[5]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[6]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer1">-->
<!--      <div class="hxp-weather-footer1-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[7]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer1-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[8]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[9]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer2">-->
<!--      <div class="hxp-weather-footer2-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[10]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer2-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[11]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[12]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer2">-->
<!--      <div class="hxp-weather-footer2-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[13]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer2-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[14]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[15]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer2">-->
<!--      <div class="hxp-weather-footer2-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[16]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer2-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[17]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="hxp-weather-header">-->
<!--      &lt;!&ndash;              <img :src="weather_weatherimg"  class="hxp-weather-header-left" alt="">&ndash;&gt;-->
<!--      <div class="hxp-weather-header-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[18]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="text-center hxp-weather-footer2">-->
<!--      <div class="hxp-weather-footer2-left">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[19]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--      <div class="hxp-weather-footer2-right">-->
<!--        <ol>-->
<!--          <li v-for="item in weatherData[20]">{{ item }}</li>-->
<!--        </ol>-->
<!--      </div>-->
<!--    </div>-->
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
      weatherData:{}
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
      let hours1 = [[],[],[],[],[],[],[],[]]
      let hours2 = [[],[],[],[],[],[],[],[]]
      for (let i = 0; i <3 ; i++) {//data["data"].length
        this.weatherData[i] = ["日期：" + data["data"][i]["date"],
          "天气：" + data["data"][i]["wea"],
          "温度：" + data["data"][i]["tem2"] + "~" + data["data"][i]["tem1"] + "°C",
          "风向：" + data["data"][i]["win"]];
        for (let j = 0; j < data["data"][i]["hours"].length; j++) {
          hours1[j] = data["data"][i]["hours"][j]["day"] + ":  " + data["data"][i]["hours"][j]["wea"] + " " + data["data"][i]["hours"][j]["tem"]
          hours2[j] = data["data"][i]["hours"][j]["win"] + " " + data["data"][i]["hours"][j]["win_speed"]
        }
        this.weatherData[i] = hours1
        this.weatherData[i] = hours2
      }
      // this.weatherData =
      //   [
      //     ["日期：" + data["data"][0]["date"],
      //       "天气：" + data["data"][0]["wea"],
      //       "温度：" + data["data"][0]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
      //       "风向：" + data["data"][0]["win"]],
      //     [data["data"][0]["hours"][0]["day"] + ":  " + data["data"][0]["hours"][0]["wea"] + " " + data["data"][0]["hours"][0]["tem"],
      //       data["data"][0]["hours"][1]["day"] + ":  " + data["data"][0]["hours"][1]["wea"] + " " + data["data"][0]["hours"][1]["tem"],
      //       data["data"][0]["hours"][2]["day"] + ":  " + data["data"][0]["hours"][2]["wea"] + " " + data["data"][0]["hours"][2]["tem"],
      // data["data"][0]["hours"][3]["day"] + ":  " + data["data"][0]["hours"][3]["wea"] + " " + data["data"][0]["hours"][3]["tem"]],
      //       // data["data"][0]["hours"][4]["day"] + ":  " + data["data"][0]["hours"][4]["wea"] + " " + data["data"][0]["hours"][4]["tem"],
      //       // data["data"][0]["hours"][5]["day"] + ":  " + data["data"][0]["hours"][5]["wea"] + " " + data["data"][0]["hours"][5]["tem"],
      //       // data["data"][0]["hours"][6]["day"] + ":  " + data["data"][0]["hours"][6]["wea"] + " " + data["data"][0]["hours"][6]["tem"],
      //       // data["data"][0]["hours"][7]["day"] + ":  " + data["data"][0]["hours"][7]["wea"] + " " + data["data"][0]["hours"][7]["tem"]],
      //     [data["data"][0]["hours"][0]["win"] + " " + data["data"][0]["hours"][0]["win_speed"],
      //       data["data"][0]["hours"][1]["win"] + " " + data["data"][0]["hours"][1]["win_speed"],
      //       data["data"][0]["hours"][2]["win"] + " " + data["data"][0]["hours"][2]["win_speed"],
      //       data["data"][0]["hours"][3]["win"] + " " + data["data"][0]["hours"][3]["win_speed"]],
      //       // data["data"][0]["hours"][4]["win"] + " " + data["data"][0]["hours"][4]["win_speed"],
      //       // data["data"][0]["hours"][5]["win"] + " " + data["data"][0]["hours"][5]["win_speed"],
      //       // data["data"][0]["hours"][6]["win"] + " " + data["data"][0]["hours"][6]["win_speed"],
      //       // data["data"][0]["hours"][7]["win"] + " " + data["data"][0]["hours"][7]["win_speed"]],
      //
      //     ["日期：" + data["data"][1]["date"],
      //       "天气：" + data["data"][1]["wea"],
      //       "温度：" + data["data"][1]["tem2"] + "~" + data["data"][1]["tem1"] + "°C",
      //       "风向：" + data["data"][1]["win"]],
      //     [data["data"][1]["hours"][0]["day"] + ":  " + data["data"][1]["hours"][0]["wea"] + " " + data["data"][1]["hours"][0]["tem"],
      //       data["data"][1]["hours"][1]["day"] + ":  " + data["data"][1]["hours"][1]["wea"] + " " + data["data"][1]["hours"][1]["tem"],
      //       data["data"][1]["hours"][2]["day"] + ":  " + data["data"][1]["hours"][2]["wea"] + " " + data["data"][1]["hours"][2]["tem"],
      //       data["data"][1]["hours"][3]["day"] + ":  " + data["data"][1]["hours"][3]["wea"] + " " + data["data"][1]["hours"][3]["tem"],
      //       data["data"][1]["hours"][4]["day"] + ":  " + data["data"][1]["hours"][4]["wea"] + " " + data["data"][1]["hours"][4]["tem"],
      //       data["data"][1]["hours"][5]["day"] + ":  " + data["data"][1]["hours"][5]["wea"] + " " + data["data"][1]["hours"][5]["tem"],
      //       data["data"][1]["hours"][6]["day"] + ":  " + data["data"][1]["hours"][6]["wea"] + " " + data["data"][1]["hours"][6]["tem"],
      //       data["data"][1]["hours"][7]["day"] + ":  " + data["data"][1]["hours"][7]["wea"] + " " + data["data"][1]["hours"][7]["tem"]],
      //     [data["data"][1]["hours"][0]["win"] + " " + data["data"][1]["hours"][0]["win_speed"],
      //       data["data"][1]["hours"][1]["win"] + " " + data["data"][1]["hours"][1]["win_speed"],
      //       data["data"][1]["hours"][2]["win"] + " " + data["data"][1]["hours"][2]["win_speed"],
      //       data["data"][1]["hours"][3]["win"] + " " + data["data"][1]["hours"][3]["win_speed"],
      //       data["data"][1]["hours"][4]["win"] + " " + data["data"][1]["hours"][4]["win_speed"],
      //       data["data"][1]["hours"][5]["win"] + " " + data["data"][1]["hours"][5]["win_speed"],
      //       data["data"][1]["hours"][6]["win"] + " " + data["data"][1]["hours"][6]["win_speed"],
      //       data["data"][1]["hours"][7]["win"] + " " + data["data"][1]["hours"][7]["win_speed"]],
      //
      //     ["日期：" + data["data"][2]["date"],
      //       "天气：" + data["data"][2]["wea"],
      //       "温度：" + data["data"][2]["tem2"] + "~" + data["data"][2]["tem1"] + "°C",
      //       "风向：" + data["data"][2]["win"]],
      //     [data["data"][2]["hours"][0]["day"] + ":  " + data["data"][2]["hours"][0]["wea"] + " " + data["data"][2]["hours"][0]["tem"],
      //       data["data"][2]["hours"][1]["day"] + ":  " + data["data"][2]["hours"][1]["wea"] + " " + data["data"][2]["hours"][1]["tem"],
      //       data["data"][2]["hours"][2]["day"] + ":  " + data["data"][2]["hours"][2]["wea"] + " " + data["data"][2]["hours"][2]["tem"],
      //       data["data"][2]["hours"][3]["day"] + ":  " + data["data"][2]["hours"][3]["wea"] + " " + data["data"][2]["hours"][3]["tem"],
      //       data["data"][2]["hours"][4]["day"] + ":  " + data["data"][2]["hours"][4]["wea"] + " " + data["data"][2]["hours"][4]["tem"],
      //       data["data"][2]["hours"][5]["day"] + ":  " + data["data"][2]["hours"][5]["wea"] + " " + data["data"][2]["hours"][5]["tem"],
      //       data["data"][2]["hours"][6]["day"] + ":  " + data["data"][2]["hours"][6]["wea"] + " " + data["data"][2]["hours"][6]["tem"],
      //       data["data"][2]["hours"][7]["day"] + ":  " + data["data"][2]["hours"][7]["wea"] + " " + data["data"][2]["hours"][7]["tem"]],
      //     [data["data"][2]["hours"][0]["win"] + " " + data["data"][2]["hours"][0]["win_speed"],
      //       data["data"][2]["hours"][1]["win"] + " " + data["data"][2]["hours"][1]["win_speed"],
      //       data["data"][2]["hours"][2]["win"] + " " + data["data"][2]["hours"][2]["win_speed"],
      //       data["data"][2]["hours"][3]["win"] + " " + data["data"][2]["hours"][3]["win_speed"],
      //       data["data"][2]["hours"][4]["win"] + " " + data["data"][2]["hours"][4]["win_speed"],
      //       data["data"][2]["hours"][5]["win"] + " " + data["data"][2]["hours"][5]["win_speed"],
      //       data["data"][2]["hours"][6]["win"] + " " + data["data"][2]["hours"][6]["win_speed"],
      //       data["data"][2]["hours"][7]["win"] + " " + data["data"][2]["hours"][7]["win_speed"]],
      //
      //     ["日期：" + data["data"][3]["date"],
      //       "天气：" + data["data"][3]["wea"],
      //       "温度：" + data["data"][3]["tem2"] + "~" + data["data"][3]["tem1"] + "°C",
      //       "风向：" + data["data"][3]["win"]],
      //     [data["data"][3]["hours"][0]["day"] + ":  " + data["data"][3]["hours"][0]["wea"] + " " + data["data"][3]["hours"][0]["tem"],
      //       data["data"][3]["hours"][1]["day"] + ":  " + data["data"][3]["hours"][1]["wea"] + " " + data["data"][3]["hours"][1]["tem"],
      //       data["data"][3]["hours"][2]["day"] + ":  " + data["data"][3]["hours"][2]["wea"] + " " + data["data"][3]["hours"][2]["tem"],
      //       data["data"][3]["hours"][3]["day"] + ":  " + data["data"][3]["hours"][3]["wea"] + " " + data["data"][3]["hours"][3]["tem"]],
      //     [data["data"][3]["hours"][0]["win"] + " " + data["data"][3]["hours"][0]["win_speed"],
      //       data["data"][3]["hours"][1]["win"] + " " + data["data"][3]["hours"][1]["win_speed"],
      //       data["data"][3]["hours"][2]["win"] + " " + data["data"][3]["hours"][2]["win_speed"],
      //       data["data"][3]["hours"][3]["win"] + " " + data["data"][3]["hours"][3]["win_speed"]],
      //
      //     ["日期：" + data["data"][4]["date"],
      //       "天气：" + data["data"][4]["wea"],
      //       "温度：" + data["data"][4]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
      //       "风向：" + data["data"][4]["win"]],
      //     [data["data"][4]["hours"][0]["day"] + ":  " + data["data"][4]["hours"][0]["wea"] + " " + data["data"][4]["hours"][0]["tem"],
      //       data["data"][4]["hours"][1]["day"] + ":  " + data["data"][4]["hours"][1]["wea"] + " " + data["data"][4]["hours"][1]["tem"],
      //       data["data"][4]["hours"][2]["day"] + ":  " + data["data"][4]["hours"][2]["wea"] + " " + data["data"][4]["hours"][2]["tem"],
      //       data["data"][4]["hours"][3]["day"] + ":  " + data["data"][4]["hours"][3]["wea"] + " " + data["data"][4]["hours"][3]["tem"]],
      //     [data["data"][4]["hours"][0]["win"] + " " + data["data"][4]["hours"][0]["win_speed"],
      //       data["data"][4]["hours"][1]["win"] + " " + data["data"][4]["hours"][1]["win_speed"],
      //       data["data"][4]["hours"][2]["win"] + " " + data["data"][4]["hours"][2]["win_speed"],
      //       data["data"][4]["hours"][3]["win"] + " " + data["data"][4]["hours"][3]["win_speed"]],
      //
      //     ["日期：" + data["data"][5]["date"],
      //       "天气：" + data["data"][5]["wea"],
      //       "温度：" + data["data"][5]["tem2"] + "~" + data["data"][5]["tem1"] + "°C",
      //       "风向：" + data["data"][5]["win"]],
      //     [data["data"][5]["hours"][0]["day"] + ":  " + data["data"][5]["hours"][0]["wea"] + " " + data["data"][5]["hours"][0]["tem"],
      //       data["data"][5]["hours"][1]["day"] + ":  " + data["data"][5]["hours"][1]["wea"] + " " + data["data"][5]["hours"][1]["tem"],
      //       data["data"][5]["hours"][2]["day"] + ":  " + data["data"][5]["hours"][2]["wea"] + " " + data["data"][5]["hours"][2]["tem"],
      //       data["data"][5]["hours"][3]["day"] + ":  " + data["data"][5]["hours"][3]["wea"] + " " + data["data"][5]["hours"][3]["tem"]],
      //     [data["data"][5]["hours"][0]["win"] + " " + data["data"][5]["hours"][0]["win_speed"],
      //       data["data"][5]["hours"][1]["win"] + " " + data["data"][5]["hours"][1]["win_speed"],
      //       data["data"][5]["hours"][2]["win"] + " " + data["data"][5]["hours"][2]["win_speed"],
      //       data["data"][5]["hours"][3]["win"] + " " + data["data"][5]["hours"][3]["win_speed"]],
      //
      //     ["日期：" + data["data"][6]["date"],
      //       "天气：" + data["data"][6]["wea"],
      //       "温度：" + data["data"][6]["tem2"] + "~" + data["data"][6]["tem1"] + "°C",
      //       "风向：" + data["data"][6]["win"]],
      //     [data["data"][6]["hours"][0]["day"] + ":  " + data["data"][6]["hours"][0]["wea"] + " " + data["data"][6]["hours"][0]["tem"],
      //       data["data"][6]["hours"][1]["day"] + ":  " + data["data"][6]["hours"][1]["wea"] + " " + data["data"][6]["hours"][1]["tem"],
      //       data["data"][6]["hours"][2]["day"] + ":  " + data["data"][6]["hours"][2]["wea"] + " " + data["data"][6]["hours"][2]["tem"],
      //       data["data"][6]["hours"][3]["day"] + ":  " + data["data"][6]["hours"][3]["wea"] + " " + data["data"][6]["hours"][3]["tem"]],
      //     [data["data"][6]["hours"][0]["win"] + " " + data["data"][6]["hours"][0]["win_speed"],
      //       data["data"][6]["hours"][1]["win"] + " " + data["data"][6]["hours"][1]["win_speed"],
      //       data["data"][6]["hours"][2]["win"] + " " + data["data"][6]["hours"][2]["win_speed"],
      //       data["data"][6]["hours"][3]["win"] + " " + data["data"][6]["hours"][3]["win_speed"]],
      //   ]
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
.hxp-weather {
  margin: 1rem auto;
  color: #394568;
  background: linear-gradient(to bottom, #4a86d1 40%, #28de7f 100%);
  border-radius: 5px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
  width: 98%;
  height: auto;
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
