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
  name: "environmentPH",
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PH', 'PH上警戒线', 'PH下警戒线']
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
            name: 'PH',
            type: 'line',
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: 'PH上警戒线',
            type: 'line',
            data: [5.2, 6.3, 7, 4.5, 7, 7.3]
          },
          {
            name: 'PH下警戒线',
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
