<template>
  <van-row>
    <van-col span="24">
      <v-chart :options="polar"/>
    </van-col>
  </van-row>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
  name: "environmentTemperature",
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['温度', '温度上警戒线', '温度下警戒线']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['18:31', '18:15', '17:59', '17:38', '17:22', '17:06']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '温度',
            type: 'line',
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '温度上警戒线',
            type: 'line',
            data: [7, 7, 7, 7, 7, 7]
          },
          {
            name: '温度下警戒线',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  components: {
    'v-chart': ECharts
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
}
</style>
