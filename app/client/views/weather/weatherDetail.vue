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

    <van-grid :column-num="4">
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
          "日期：" + data["data"][0]["date"],
          "天气：" + data["data"][0]["wea"],
          "温度：" + data["data"][0]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
          "风向：" + data["data"][0]["win"],
          data["data"][0]["hours"][0]["day"] + ":" + data["data"][0]["hours"][0]["wea"] + " " + data["data"][0]["hours"][0]["tem"] + " " + data["data"][0]["hours"][0]["win"] + " " + data["data"][0]["hours"][0]["win_speed"],
          data["data"][0]["hours"][1]["day"] + ":" + data["data"][0]["hours"][1]["wea"] + " " + data["data"][0]["hours"][1]["tem"] + " " + data["data"][0]["hours"][1]["win"] + " " + data["data"][0]["hours"][1]["win_speed"],
          data["data"][0]["hours"][2]["day"] + ":" + data["data"][0]["hours"][2]["wea"] + " " + data["data"][0]["hours"][2]["tem"] + " " + data["data"][0]["hours"][2]["win"] + " " + data["data"][0]["hours"][2]["win_speed"],
          data["data"][0]["hours"][3]["day"] + ":" + data["data"][0]["hours"][3]["wea"] + " " + data["data"][0]["hours"][3]["tem"] + " " + data["data"][0]["hours"][3]["win"] + " " + data["data"][0]["hours"][3]["win_speed"],
          data["data"][0]["hours"][4]["day"] + ":" + data["data"][0]["hours"][4]["wea"] + " " + data["data"][0]["hours"][4]["tem"] + " " + data["data"][0]["hours"][4]["win"] + " " + data["data"][0]["hours"][4]["win_speed"],
          data["data"][0]["hours"][5]["day"] + ":" + data["data"][0]["hours"][5]["wea"] + " " + data["data"][0]["hours"][5]["tem"] + " " + data["data"][0]["hours"][5]["win"] + " " + data["data"][0]["hours"][5]["win_speed"],
          data["data"][0]["hours"][6]["day"] + ":" + data["data"][0]["hours"][6]["wea"] + " " + data["data"][0]["hours"][6]["tem"] + " " + data["data"][0]["hours"][6]["win"] + " " + data["data"][0]["hours"][6]["win_speed"],
          data["data"][0]["hours"][7]["day"] + ":" + data["data"][0]["hours"][7]["wea"] + " " + data["data"][0]["hours"][7]["tem"] + " " + data["data"][0]["hours"][7]["win"] + " " + data["data"][0]["hours"][7]["win_speed"],

          "日期：" + data["data"][1]["date"],
          "天气：" + data["data"][1]["wea"],
          "温度：" + data["data"][1]["tem2"] + "~" + data["data"][1]["tem1"] + "°C",
          "风向：" + data["data"][1]["win"],
          data["data"][1]["hours"][0]["day"] + ":" + data["data"][1]["hours"][0]["wea"] + " " + data["data"][1]["hours"][0]["tem"] + " " + data["data"][1]["hours"][0]["win"] + " " + data["data"][1]["hours"][0]["win_speed"],
          data["data"][1]["hours"][1]["day"] + ":" + data["data"][1]["hours"][1]["wea"] + " " + data["data"][1]["hours"][1]["tem"] + " " + data["data"][1]["hours"][1]["win"] + " " + data["data"][1]["hours"][1]["win_speed"],
          data["data"][1]["hours"][2]["day"] + ":" + data["data"][1]["hours"][2]["wea"] + " " + data["data"][1]["hours"][2]["tem"] + " " + data["data"][1]["hours"][2]["win"] + " " + data["data"][1]["hours"][2]["win_speed"],
          data["data"][1]["hours"][3]["day"] + ":" + data["data"][1]["hours"][3]["wea"] + " " + data["data"][1]["hours"][3]["tem"] + " " + data["data"][1]["hours"][3]["win"] + " " + data["data"][1]["hours"][3]["win_speed"],
          data["data"][1]["hours"][4]["day"] + ":" + data["data"][1]["hours"][4]["wea"] + " " + data["data"][1]["hours"][4]["tem"] + " " + data["data"][1]["hours"][4]["win"] + " " + data["data"][1]["hours"][4]["win_speed"],
          data["data"][1]["hours"][5]["day"] + ":" + data["data"][1]["hours"][5]["wea"] + " " + data["data"][1]["hours"][5]["tem"] + " " + data["data"][1]["hours"][5]["win"] + " " + data["data"][1]["hours"][5]["win_speed"],
          data["data"][1]["hours"][6]["day"] + ":" + data["data"][1]["hours"][6]["wea"] + " " + data["data"][1]["hours"][6]["tem"] + " " + data["data"][1]["hours"][6]["win"] + " " + data["data"][1]["hours"][6]["win_speed"],
          data["data"][1]["hours"][7]["day"] + ":" + data["data"][1]["hours"][7]["wea"] + " " + data["data"][1]["hours"][7]["tem"] + " " + data["data"][1]["hours"][7]["win"] + " " + data["data"][1]["hours"][7]["win_speed"],

          "日期：" + data["data"][2]["date"],
          "天气：" + data["data"][2]["wea"],
          "温度：" + data["data"][2]["tem2"] + "~" + data["data"][2]["tem1"] + "°C",
          "风向：" + data["data"][2]["win"],
          data["data"][2]["hours"][0]["day"] + ":" + data["data"][2]["hours"][0]["wea"] + " " + data["data"][2]["hours"][0]["tem"] + " " + data["data"][2]["hours"][0]["win"] + " " + data["data"][2]["hours"][0]["win_speed"],
          data["data"][2]["hours"][1]["day"] + ":" + data["data"][2]["hours"][1]["wea"] + " " + data["data"][2]["hours"][1]["tem"] + " " + data["data"][2]["hours"][1]["win"] + " " + data["data"][2]["hours"][1]["win_speed"],
          data["data"][2]["hours"][2]["day"] + ":" + data["data"][2]["hours"][2]["wea"] + " " + data["data"][2]["hours"][2]["tem"] + " " + data["data"][2]["hours"][2]["win"] + " " + data["data"][2]["hours"][2]["win_speed"],
          data["data"][2]["hours"][3]["day"] + ":" + data["data"][2]["hours"][3]["wea"] + " " + data["data"][2]["hours"][3]["tem"] + " " + data["data"][2]["hours"][3]["win"] + " " + data["data"][2]["hours"][3]["win_speed"],
          data["data"][2]["hours"][4]["day"] + ":" + data["data"][2]["hours"][4]["wea"] + " " + data["data"][2]["hours"][4]["tem"] + " " + data["data"][2]["hours"][4]["win"] + " " + data["data"][2]["hours"][4]["win_speed"],
          data["data"][2]["hours"][5]["day"] + ":" + data["data"][2]["hours"][5]["wea"] + " " + data["data"][2]["hours"][5]["tem"] + " " + data["data"][2]["hours"][5]["win"] + " " + data["data"][2]["hours"][5]["win_speed"],
          data["data"][2]["hours"][6]["day"] + ":" + data["data"][2]["hours"][6]["wea"] + " " + data["data"][2]["hours"][6]["tem"] + " " + data["data"][2]["hours"][6]["win"] + " " + data["data"][2]["hours"][6]["win_speed"],
          data["data"][2]["hours"][7]["day"] + ":" + data["data"][2]["hours"][7]["wea"] + " " + data["data"][2]["hours"][7]["tem"] + " " + data["data"][2]["hours"][7]["win"] + " " + data["data"][2]["hours"][7]["win_speed"],

          "日期：" + data["data"][3]["date"],
          "天气：" + data["data"][3]["wea"],
          "温度：" + data["data"][3]["tem2"] + "~" + data["data"][3]["tem1"] + "°C",
          "风向：" + data["data"][3]["win"],
          data["data"][3]["hours"][0]["day"] + ":" + data["data"][3]["hours"][0]["wea"] + " " + data["data"][3]["hours"][0]["tem"] + " " + data["data"][3]["hours"][0]["win"] + " " + data["data"][3]["hours"][0]["win_speed"],
          data["data"][3]["hours"][1]["day"] + ":" + data["data"][3]["hours"][1]["wea"] + " " + data["data"][3]["hours"][1]["tem"] + " " + data["data"][3]["hours"][1]["win"] + " " + data["data"][3]["hours"][1]["win_speed"],
          data["data"][3]["hours"][2]["day"] + ":" + data["data"][3]["hours"][2]["wea"] + " " + data["data"][3]["hours"][2]["tem"] + " " + data["data"][3]["hours"][2]["win"] + " " + data["data"][3]["hours"][2]["win_speed"],
          data["data"][3]["hours"][3]["day"] + ":" + data["data"][3]["hours"][3]["wea"] + " " + data["data"][3]["hours"][3]["tem"] + " " + data["data"][3]["hours"][3]["win"] + " " + data["data"][3]["hours"][3]["win_speed"],
          // data["data"][3]["hours"][4]["day"] + ":" + data["data"][3]["hours"][4]["wea"] + " " + data["data"][3]["hours"][4]["tem"] + " " + data["data"][3]["hours"][4]["win"] + " " + data["data"][3]["hours"][4]["win_speed"],
          // data["data"][3]["hours"][5]["day"] + ":" + data["data"][3]["hours"][5]["wea"] + " " + data["data"][3]["hours"][5]["tem"] + " " + data["data"][3]["hours"][5]["win"] + " " + data["data"][3]["hours"][5]["win_speed"],
          // data["data"][3]["hours"][6]["day"] + ":" + data["data"][3]["hours"][6]["wea"] + " " + data["data"][3]["hours"][6]["tem"] + " " + data["data"][3]["hours"][6]["win"] + " " + data["data"][3]["hours"][6]["win_speed"],
          // data["data"][3]["hours"][7]["day"] + ":" + data["data"][3]["hours"][7]["wea"] + " " + data["data"][3]["hours"][7]["tem"] + " " + data["data"][3]["hours"][7]["win"] + " " + data["data"][3]["hours"][7]["win_speed"],

          "日期：" + data["data"][4]["date"],
          "天气：" + data["data"][4]["wea"],
          "温度：" + data["data"][4]["tem2"] + "~" + data["data"][0]["tem1"] + "°C",
          "风向：" + data["data"][4]["win"],
          data["data"][4]["hours"][0]["day"] + ":" + data["data"][4]["hours"][0]["wea"] + " " + data["data"][4]["hours"][0]["tem"] + " " + data["data"][4]["hours"][0]["win"] + " " + data["data"][4]["hours"][0]["win_speed"],
          data["data"][4]["hours"][1]["day"] + ":" + data["data"][4]["hours"][1]["wea"] + " " + data["data"][4]["hours"][1]["tem"] + " " + data["data"][4]["hours"][1]["win"] + " " + data["data"][4]["hours"][1]["win_speed"],
          data["data"][4]["hours"][2]["day"] + ":" + data["data"][4]["hours"][2]["wea"] + " " + data["data"][4]["hours"][2]["tem"] + " " + data["data"][4]["hours"][2]["win"] + " " + data["data"][4]["hours"][2]["win_speed"],
          data["data"][4]["hours"][3]["day"] + ":" + data["data"][4]["hours"][3]["wea"] + " " + data["data"][4]["hours"][3]["tem"] + " " + data["data"][4]["hours"][3]["win"] + " " + data["data"][4]["hours"][3]["win_speed"],
          // data["data"][4]["hours"][4]["day"] + ":" + data["data"][4]["hours"][4]["wea"] + " " + data["data"][4]["hours"][4]["tem"] + " " + data["data"][4]["hours"][4]["win"] + " " + data["data"][4]["hours"][4]["win_speed"],
          // data["data"][4]["hours"][5]["day"] + ":" + data["data"][4]["hours"][5]["wea"] + " " + data["data"][4]["hours"][5]["tem"] + " " + data["data"][4]["hours"][5]["win"] + " " + data["data"][4]["hours"][5]["win_speed"],
          // data["data"][4]["hours"][6]["day"] + ":" + data["data"][4]["hours"][6]["wea"] + " " + data["data"][4]["hours"][6]["tem"] + " " + data["data"][4]["hours"][6]["win"] + " " + data["data"][4]["hours"][6]["win_speed"],
          // data["data"][4]["hours"][7]["day"] + ":" + data["data"][4]["hours"][7]["wea"] + " " + data["data"][4]["hours"][7]["tem"] + " " + data["data"][4]["hours"][7]["win"] + " " + data["data"][4]["hours"][7]["win_speed"],

          "日期：" + data["data"][5]["date"],
          "天气：" + data["data"][5]["wea"],
          "温度：" + data["data"][5]["tem2"] + "~" + data["data"][5]["tem1"] + "°C",
          "风向：" + data["data"][5]["win"],
          data["data"][5]["hours"][0]["day"] + ":" + data["data"][5]["hours"][0]["wea"] + " " + data["data"][5]["hours"][0]["tem"] + " " + data["data"][5]["hours"][0]["win"] + " " + data["data"][5]["hours"][0]["win_speed"],
          data["data"][5]["hours"][1]["day"] + ":" + data["data"][5]["hours"][1]["wea"] + " " + data["data"][5]["hours"][1]["tem"] + " " + data["data"][5]["hours"][1]["win"] + " " + data["data"][5]["hours"][1]["win_speed"],
          data["data"][5]["hours"][2]["day"] + ":" + data["data"][5]["hours"][2]["wea"] + " " + data["data"][5]["hours"][2]["tem"] + " " + data["data"][5]["hours"][2]["win"] + " " + data["data"][5]["hours"][2]["win_speed"],
          data["data"][5]["hours"][3]["day"] + ":" + data["data"][5]["hours"][3]["wea"] + " " + data["data"][5]["hours"][3]["tem"] + " " + data["data"][5]["hours"][3]["win"] + " " + data["data"][5]["hours"][3]["win_speed"],
          // data["data"][5]["hours"][4]["day"] + ":" + data["data"][5]["hours"][4]["wea"] + " " + data["data"][5]["hours"][4]["tem"] + " " + data["data"][5]["hours"][4]["win"] + " " + data["data"][5]["hours"][4]["win_speed"],
          // data["data"][5]["hours"][5]["day"] + ":" + data["data"][5]["hours"][5]["wea"] + " " + data["data"][5]["hours"][5]["tem"] + " " + data["data"][5]["hours"][5]["win"] + " " + data["data"][5]["hours"][5]["win_speed"],
          // data["data"][5]["hours"][6]["day"] + ":" + data["data"][5]["hours"][6]["wea"] + " " + data["data"][5]["hours"][6]["tem"] + " " + data["data"][5]["hours"][6]["win"] + " " + data["data"][5]["hours"][6]["win_speed"],
          // data["data"][5]["hours"][7]["day"] + ":" + data["data"][5]["hours"][7]["wea"] + " " + data["data"][5]["hours"][7]["tem"] + " " + data["data"][5]["hours"][7]["win"] + " " + data["data"][5]["hours"][7]["win_speed"],

          "日期：" + data["data"][6]["date"],
          "天气：" + data["data"][6]["wea"],
          "温度：" + data["data"][6]["tem2"] + "~" + data["data"][6]["tem1"] + "°C",
          "风向：" + data["data"][6]["win"],
          data["data"][6]["hours"][0]["day"] + ":" + data["data"][6]["hours"][0]["wea"] + " " + data["data"][6]["hours"][0]["tem"] + " " + data["data"][6]["hours"][0]["win"] + " " + data["data"][6]["hours"][0]["win_speed"],
          data["data"][6]["hours"][1]["day"] + ":" + data["data"][6]["hours"][1]["wea"] + " " + data["data"][6]["hours"][1]["tem"] + " " + data["data"][6]["hours"][1]["win"] + " " + data["data"][6]["hours"][1]["win_speed"],
          data["data"][6]["hours"][2]["day"] + ":" + data["data"][6]["hours"][2]["wea"] + " " + data["data"][6]["hours"][2]["tem"] + " " + data["data"][6]["hours"][2]["win"] + " " + data["data"][6]["hours"][2]["win_speed"],
          data["data"][6]["hours"][3]["day"] + ":" + data["data"][6]["hours"][3]["wea"] + " " + data["data"][6]["hours"][3]["tem"] + " " + data["data"][6]["hours"][3]["win"] + " " + data["data"][6]["hours"][3]["win_speed"],
          // data["data"][6]["hours"][4]["day"] + ":" + data["data"][6]["hours"][4]["wea"] + " " + data["data"][6]["hours"][4]["tem"] + " " + data["data"][6]["hours"][4]["win"] + " " + data["data"][6]["hours"][4]["win_speed"],
          // data["data"][6]["hours"][5]["day"] + ":" + data["data"][6]["hours"][5]["wea"] + " " + data["data"][6]["hours"][5]["tem"] + " " + data["data"][6]["hours"][5]["win"] + " " + data["data"][6]["hours"][5]["win_speed"],
          // data["data"][6]["hours"][6]["day"] + ":" + data["data"][6]["hours"][6]["wea"] + " " + data["data"][6]["hours"][6]["tem"] + " " + data["data"][6]["hours"][6]["win"] + " " + data["data"][6]["hours"][6]["win_speed"],
          // data["data"][6]["hours"][7]["day"] + ":" + data["data"][6]["hours"][7]["wea"] + " " + data["data"][6]["hours"][7]["tem"] + " " + data["data"][6]["hours"][7]["win"] + " " + data["data"][6]["hours"][7]["win_speed"],
        ]
    })
  }
}
</script>


<style scoped>
</style>
