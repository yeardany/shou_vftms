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
    <van-skeleton :loading="loading">
      <div class="wrap">
        <div class="sky-top">
          <van-icon name="location-o" size="20"/>
          {{ cityName }}
        </div>
        <div class="sky-condition">
          <div class="condition-item">
            <span class="temp">{{ cityTemp }}</span>
            <span class="status">{{ cityCondition }}</span>
          </div>
          <div class="condition-item">
            <span class="spec"><i class="iconfont icon-feng-"></i> {{ cityWind }}</span>
            <span class="spec"><i class="iconfont icon-IOTtubiao_huabanfuben"></i> {{ cityHumidity }}%</span>
            <span class="spec"><i class="iconfont icon-qiya"></i> {{ cityPressure }}hPa</span>
          </div>
          <div class="condition-item">
            <span class="spec">温馨提示: {{ tips }}</span>
          </div>
        </div>
        <div class="sky-prediction">
          <div class="prediction-item" v-for="(item, index) in forecastList.slice(1, 3)" :key="index">
            <div class="prediction-box">
              <div class="prediction-left">
                <p>{{ index === 0 ? '今天' : '明天' }}</p>
                <p>{{ item.wea }}</p>
              </div>
              <div class="prediction-right">
                <p>{{ item.tem1 }}/{{ item.tem2 }}</p>
                <p>
                  <svg-icon :icon-class="item.wea | handleIcon"/>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="sky-chart">
          <div class="label">未来一周预报</div>
          <div class="chart-wrap">
            <div class="chart-item" v-for="(forecastValue, index) in forecastList" :key="index">
              <p>{{ forecastValue.date | handleWeek(index) }}</p>
              <p>{{ forecastValue.date | handleDay }}</p>
              <p>{{ forecastValue.wea }}</p>
              <div>
                <svg-icon :icon-class="forecastValue.wea | handleIcon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sky-hours">
        <div class="label">24小时预报</div>
        <v-chart :style="{width: containerWidth + 'px',height: 260 + 'px' }" :options="option"/>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import SvgIcon from '../../layout/SvgIcon.vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import axios from 'axios'
import {Skeleton} from 'vant';

export default {
  name: 'weatherDetail',
  data() {
    return {
      loading: true,
      cityName: null,
      cityTemp: null, // 气温
      cityCondition: null, // 状态
      cityWind: null, // 风力
      cityHumidity: null, // 湿度
      cityPressure: null, // 气压
      tips: null,
      forecastList: [],
      xAxis: [],
      yAxis: [],
      containerWidth: window.screen.width
    }
  },
  components: {
    SvgIcon,
    NavBar,
    'v-chart': ECharts
  },
  mounted() {

    this.$notify({type: 'primary', message: '加载中...', duration: 0});

    setTimeout(() => {
      axios.get("https://www.tianqiapi.com/api?version=v1&appid=52924758&appsecret=dtZx2xcn&cityid=101121301",
      ).then((d) => {
        let resData = d.data,
          weatherData = resData.data,
          today = weatherData[0],
          xAxis = [],
          yAxis = [];

        this.forecastList = weatherData
        this.cityName = resData.city
        this.cityTemp = today.tem
        this.cityCondition = today.wea
        this.cityWind = today.win_speed
        this.cityHumidity = today.humidity
        this.cityPressure = '1026'
        this.tips = today.air_tips

        today.hours.map(({day, tem, wea, win, win_speed}) => {
          xAxis.push(day)
          yAxis.push(
            {
              'value': parseInt(tem.replace(/℃/, '')),
              'day': day,
              'des': wea + '</br>温度:' + tem,
              'win': win + '' + win_speed
            }
          )
        })

        this.xAxis = xAxis
        this.yAxis = yAxis
        this.loading = false

        setTimeout(() => {
          this.$notify.clear()
        }, 500);

      }).catch((e) => {
        this.$notify.clear()
        this.$notify({type: 'warning', message: e.message, duration: 1500});
      })

    }, 500)

  },
  computed: {
    option() {
      return {
        backgroundColor: '#72ade0',
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let html = ''
            params.forEach((x) => {
              html += `${x.data.day}</br><div style="color: #fff">${x.data.des}</br>${x.data.win}</div>`
            })
            return html
          }
        },
        xAxis: {
          type: 'category',
          data: this.xAxis,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          color: '#fff',
          label: true,
          show: false,
          axisLine: {
            lineStyle: {
              color: '#fff',
            }
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          data: this.yAxis,
          type: 'line',
          color: '#fff',
          smooth: true,
          itemStyle: {normal: {label: {show: true}}}
        }]
      };
    }
  },
  filters: {
    handleWeek(date, index) {
      const dayArr = ['今天', '明天', '后天']
      const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let myDate = date.replace(/-/g, '/')
      let getDay = new Date(myDate).getDay()
      return index < 2 ? dayArr[index] : weekArr[getDay]
    },
    handleDay(date) {
      return date.replace(/-/g, '/').substr(5)
    },
    handleIcon(value) {
      let weatherStr = '晴多云雨雪阴'
      let weatherIconArr = ['tianqi-qing', 'duoyun', 'tianqi-dayu', 'tianqi-daxue', 'tianqi-yintian']
      let weatherIndex = weatherStr.indexOf(value)
      switch (weatherIndex) {
        case 0:
          return weatherIconArr[0]
        case 1:
          return weatherIconArr[1]
        case 3:
          return weatherIconArr[2]
        case 4:
          return weatherIconArr[3]
        case 5:
          return weatherIconArr[4]
        default:
          return weatherIconArr[4]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.wrap {
  height: 100%
}

text-ellipsis() {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sky-top {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #FFF;
  font-size: 16px;
  color: #323233;
  font-weight 500;
}

.label {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.sky-condition {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  // background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
  background: #2980B9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #fff, #72ADE0 85%); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #fff, #72ADE0 85%); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #fff;

  .condition-item {
    justify-content: flex-start;
    padding: 0 16px;
    margin: 5px 0;
    color: #fff;
    font-weight 500

    .temp {
      font-size: 80px;
      font-weight: 100;
      margin-right: 20px;
    }

    .status {
      font-size: 25px;
    }

    .spec {
      font-size: 15px;
    }
  }

  .condition-item:first-child {
    color: #323233
  }
}

.sky-prediction {
  display: flex;
  background-color: #72ADE0;

  .prediction-item {
    flex: 1;
    width: 50%;
    font-size: 16px;
    font-weight: 500;
    color: #fff;

    .prediction-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 16px;

      .prediction-left, .prediction-right {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        color: #fff;

        p {
          width: 100%;
          text-ellipsis();
        }
      }

      .prediction-left {
        justify-content: flex-start;

        p:nth-child(2) {
          margin-top: 0
        }
      }

      .prediction-right {
        justify-content: flex-end;

        p {
          margin-top: 0
        }
      }
    }
  }
}

.sky-chart {
  padding: 16px;
  background-color: #72ADE0;
  color: #fff;

  .chart-wrap {
    display: flex;
    margin: 0 -10px;

    .chart-item {
      flex: 1;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
      text-ellipsis()

      p:nth-child(3) {
        font-size: 12px;
      }
    }
  }
}

.sky-hours {
  background-color: #72ADE0;
  color: #fff;

  .label {
    padding: 10px 16px;
  }
}
</style>
